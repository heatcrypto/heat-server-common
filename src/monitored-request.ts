import { isUndefined, isFunction, assign } from "lodash";
import { PrefixLogger } from "./prefix-logger";
import { stringify, prettyPrint } from "./json";
import { get, post } from "request";
import { promisify } from "util";
import { CoreOptions } from "request";
import { LoggerService } from "./types/logger.interface";
import { createLogger } from "./logger-adapter";
import { MonitoredRequestMonitor } from "./monitored-request-monitor";
const getAsync = promisify(get);
const postAsync = promisify(post);

const DEBUG = false;
const COMPRESS = true;

export class MonitoredRequestException extends Error {
  constructor(reason: string) {
    super(reason);
  }
}

export class MonitoredRequest {
  private logger: LoggerService;
  private static requestId: number = 0;

  public static defaultGetOptions: CoreOptions = {};
  public static defaultPostOptions: CoreOptions = {};

  constructor(
    logger?: LoggerService,
    prefix?: string,
    private monitor?: MonitoredRequestMonitor
  ) {
    if (isUndefined(logger)) {
      if (DEBUG) {
        this.logger = createLogger(MonitoredRequest.name);
      }
    } else if (isUndefined(prefix)) {
      this.logger = logger;
    } else {
      this.logger = new PrefixLogger(logger, prefix);
    }
  }

  log(message: string) {
    if (DEBUG && COMPRESS) this.logger.log(message.substr(0, 450));
    else if (DEBUG) this.logger.log(message);
  }

  /**
   * Performs an HTTP GET request.
   * @param uri
   * @param options
   * @param allowedStatusCodes
   * @param requestObserver
   */

  async get(
    uri: string,
    options: CoreOptions = {},
    allowedStatusCodes: Array<number> = [200],
    requestObserver?: (data: string) => void
  ): Promise<string> {
    const id = Date.now();
    this.log(`[${id}] GET ${uri}`);
    const requestId = MonitoredRequest.requestId++;
    const getOptions = assign({}, MonitoredRequest.defaultGetOptions, options);
    this.monitor?.requestStart(uri, { get: getOptions }, requestId);
    const response = await getAsync(uri, getOptions);
    this.monitor?.requestEnd(uri, response.statusCode, requestId);
    if (allowedStatusCodes.indexOf(response.statusCode) == -1) {
      this.log(`[${id}] Invalid status ${response.statusCode}`);
      throw new MonitoredRequestException(
        `Invalid status ${response.statusCode}`
      );
    } else {
      this.log(`[${id}] OK ${response.body}`);
      if (isFunction(requestObserver)) requestObserver(stringify(response));
      return response.body;
    }
  }

  /**
   * Performs an HTTP post
   * To send application/x-www-form-urlencoded data pass a map of form data to the
   * options.form hash.
   * @param uri
   * @param options
   * @param allowedStatusCodes
   * @param requestObserver
   */
  async post(
    uri: string,
    options: CoreOptions = {},
    allowedStatusCodes: Array<number> = [200, 201, 202],
    requestObserver?: (data: string) => void
  ): Promise<string> {
    const id = Date.now();
    this.log(`[${id}] POST ${uri} options=${prettyPrint(options)}`);
    const requestId = MonitoredRequest.requestId++;
    const postOptions = assign(
      {},
      MonitoredRequest.defaultPostOptions,
      options
    );
    this.monitor?.requestStart(uri, { post: postOptions }, requestId);
    const response = await postAsync(uri, postOptions);
    this.monitor?.requestEnd(uri, response.statusCode, requestId);
    if (allowedStatusCodes.indexOf(response.statusCode) == -1) {
      this.log(`[${id}] Invalid status ${response.statusCode}`);
      throw new MonitoredRequestException(
        `Invalid status ${response.statusCode}`
      );
    } else {
      this.log(`[${id}] OK ${prettyPrint(response.body)}`);
      if (isFunction(requestObserver))
        requestObserver(JSON.stringify(response));
      return response.body;
    }
  }
}
