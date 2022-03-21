const port = 3000

const express = require ('express')
const app = express()
const path = require('path')

app.set('view engine', 'ejs') // you could also put in the pugg thing you see on codepen a lot
app.set('views', path.join(__dirname, '/public/views'))

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
  response.render('index')
  // console.log('here')
  // response.status(500).send('hi')
  // response.download('server.js')
  // response.json({ message: 'error' }) 
})


app.listen(port)
