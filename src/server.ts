import { ChatServer } from './ChatServer'

const app = new ChatServer().getApp()

app.get('/', (req, res) => {
  res.send('Hello old friend')
})

export { app }
