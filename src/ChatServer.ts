import * as express from 'express'

export class ChatServer {
  public static readonly PORT: number = 5000
  private app: express.Application
  private port: string | number

  constructor() {
    this.createApp()
    this.config()
    this.listen()
  }

  private createApp(): void {
    this.app = express()
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT
  }

  private listen(): void {
    this.app.listen(this.port)
  }

  public getApp(): express.Application {
    return this.app
  }
}
