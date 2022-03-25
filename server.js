require('dotenv').config()
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args))
// const fetchArt = require('./fetchArt')

const express = require('express')
const app = express()

// ejs becomes the template engine
app.set('view engine', 'ejs')
app.set('views', './views')

// creating a static map 
app.use(express.static('public'))

// route for index
app.get('/', (request, response) => {
  response.render('index')
})

app.get('/DiscoverArt', (request, response) => {
  response.render('index')
})

// route for artworks hokusai
app.get('/KatsushikaHokusai', async (req, res) => {
  const urlHokusai = `https://www.rijksmuseum.nl/api/nl/collection?key=9c1DbBQC&involvedMaker=Katsushika+Hokusai&ps=30`
  const options = {
    method: 'GET'
  }

  const response = await fetch(urlHokusai, options)
    .then(res => res.json())
    .catch(e => {
      console.error({
        'message': 'oh no',
        error: e,
      })
    })
  console.log(response)
  res.render('artHokusai', {
    data: response.artObjects
  })
})

// route for artworks kuniyoshi
app.get('/UtagawaKuniyoshi', async (req, res) => {
  const urlKuniyoshi = `https://www.rijksmuseum.nl/api/nl/collection?key=9c1DbBQC&involvedMaker=Utagawa+Kuniyoshi&ps=30`
  const options = {
    method: 'GET'
  }

  const response = await fetch(urlKuniyoshi, options)
    .then(res => res.json())
    .catch(e => {
      console.error({
        'message': 'oh no',
        error: e,
      })
    })
  console.log(response)
  res.render('artKuniyoshi', {
    data: response.artObjects
  })
})

// setup for localhost port
app.set('port', process.env.PORT || 1989)


app.listen(app.get('port'), function () {
  console.log(`Application started on port: ${app.get('port')}`)
})

/**
 * Wraps the fetch api and returns the response body parsed through json
 * @param {*} url the api endpoint to address
 * @returns the json response from the api endpoint
 */
const urlHokusai = 'https://www.rijksmuseum.nl/api/nl/collection?key=9c1DbBQC&involvedMaker=Katsushika+Hokusai&ps=30'

