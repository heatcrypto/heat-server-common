import { LoggerService } from "./types/logger.interface";

export class PrefixLogger implements LoggerService {
  constructor(private logger: LoggerService, private prefix: string) {}

  log(message: any, context?: string) {
    this.logger.log(`[${this.prefix}] ${message}`, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.logger.error(`[${this.prefix}] ${message}`, trace, context);
  }

  warn(message: any, context?: string) {
    this.logger.warn(`[${this.prefix}] ${message}`, context);
  }

  debug?(message: any, context?: string) {
    this.logger.debug!(`[${this.prefix}] ${message}`, context);
  }

  verbose?(message: any, context?: string) {
    this.logger.verbose!(`[${this.prefix}] ${message}`, context);
  }
}
