import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  logger: Logger = new Logger()
  use(req: Request, res: Response, next: NextFunction) {
    // Getting the request log
    this.logger.log(
      `Incoming -> Method [${req.method}] - Url: [${req.originalUrl}] - Host: [${req.hostname}] - IP: [${req.socket.remoteAddress}]`,
    )

    if (next) {
      next()
    }
  }
}
