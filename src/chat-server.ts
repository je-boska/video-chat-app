import * as express from 'express'
import { createServer, Server } from 'http'
import * as socketIo from 'socket.io'
import * as path from 'path'

export class ChatServer {
  public static readonly PORT: number = 5000
  private app: express.Application
  private port: string | number
  private server: Server
  private io: socketIo.Server
  private socketsArray = []

  constructor() {
    this.createApp()
    this.config()
    this.createServer()
    this.sockets()
    this.listen()
  }

  private sockets(): void {
    this.io = socketIo(this.server)
  }

  private createApp(): void {
    this.app = express()
    this.app.use('/', express.static(path.join(__dirname, 'public')))
  }

  private config(): void {
    this.port = process.env.PORT || ChatServer.PORT
  }

  private listen(): void {
    this.server.listen(this.port, () => {
      console.log('Running server on port %s', this.port)
    })

    this.io.on('connection', socket => {
      socket.broadcast.emit('add-users', {
        users: [socket.id],
      })

      socket.on('disconnect', () => {
        this.socketsArray.splice(this.socketsArray.indexOf(socket.id), 1)
        this.io.emit('remove-user', socket.id)
      })

      socket.on('make-offer', function (data) {
        socket.to(data.to).emit('offer-made', {
          offer: data.offer,
          socket: socket.id,
        })
      })

      socket.on('make-answer', function (data) {
        socket.to(data.to).emit('answer-made', {
          socket: socket.id,
          answer: data.answer,
        })
      })
    })
  }

  private createServer(): void {
    this.server = createServer(this.app)
  }

  public getApp(): express.Application {
    return this.app
  }
}
