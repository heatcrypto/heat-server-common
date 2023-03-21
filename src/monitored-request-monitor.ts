export interface MonitoredRequestMonitor {
  requestStart(url: string, options: {get?:any, post?: any}, id: number): void;
  requestEnd(url: string, httpStatus: number, id: number): void;
}