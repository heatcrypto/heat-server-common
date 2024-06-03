import { MonitoredRequest } from "../monitored-request";
import { MonitoredRequestMonitor } from "../monitored-request-monitor";
import { LoggerService } from "./logger.interface";
export interface MonitoredRequestFactory {
    createMonitoredRequest(logger?: LoggerService, prefix?: string, monitor?: MonitoredRequestMonitor): MonitoredRequest;
}
