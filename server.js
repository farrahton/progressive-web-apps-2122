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



// route for home discover page with searchbar
app.get('/DiscoverArt', async (req, res) => {
  const APIlink = 'https://www.rijksmuseum.nl/api/en/collection?key=9c1DbBQC&ps=20';

  const dataSearchRijks = 'https://www.rijksmuseum.nl/api/nl/collection?key=xvdOJegg&ps&q='

  function mySearch() {
    let fullCollection;

    // Function fetching broad data base to search in
    fetch(APIlink)
      .then(function (response) {
        return response.json()
      })

      // Function logging the response of requested data 
      .then(function (data) {
        fullCollection = data;
        console.log(data);
      })
  }

  function searchDataRijks(searchValue) {

    const resultsData = dataSearchRijks + searchValue;

    fetch(resultsData)
      .then(function (response) {
        return response.json();
      })
      .catch((error) => {
        console.log(error);
      })
  }


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

