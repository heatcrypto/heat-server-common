import { ExplorerMiddleware } from './explorer.interface'
import { MonitoredRequest } from '../monitored-request'
import { LoggerService } from './logger.interface'

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
}