import * as express from 'express'

const app = express()

app.get('/', (req, res) => {
  res.send('Hello there world')
})

app.listen(5000, () => {
  console.log('Server is running on port 5000')
})
