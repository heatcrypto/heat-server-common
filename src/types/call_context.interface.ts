import { ExplorerMiddleware } from './explorer.interface'
import { MonitoredRequest } from '../monitored-request'
import { LoggerService } from './logger.interface'
import { CreateCoreOptions } from '../explorer-base';
import { JsonRpc } from '../json-rpc';

export interface CallContext {
  /**
   * Network protocol (http or https)
   */
  protocol: string;

  /**
   * Host (plus optional port) of api server
   */
  host: string;

  /**
   * Main logger, should be created as prefixlogger with prefix identifying this
   */
  logger: LoggerService;

  /**
   * Middleware that deals with address conversions and possible other future topics
   */
  middleWare?: ExplorerMiddleware;

  /**
   * A configured instance of MonitoredRequest is provided to perform requests
   */
  req: MonitoredRequest;

  /**
   * Optional function to create [CoreOptions] (headers and stuff for HTTP requests)
   */
  createCoreOptions?: CreateCoreOptions;

  /**
   * A lazy constructed JsonRPc client which uses the MonitoredRequest for transport
   */
  jsonRpc?: JsonRpc;
}