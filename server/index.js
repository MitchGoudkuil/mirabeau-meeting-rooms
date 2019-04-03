const express = require('express')
const exphbs = require('express-handlebars')

const api = require('./helpers/api.js')
const filter = require('./helpers/filter.js')

const app = express()

const port = 1234

app.use(express.static(__dirname + '/public'))

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    partialsDir: __dirname + '/views/partials/'
  })
)

app.set('view engine', 'hbs')
app.set('views', __dirname + '/views')

app.get('/', async (req, res) => {
  let data = await api.get('/api/v1/rooms')
  let filteredData = filter.filterData(data)
  console.log(filteredData)

  res.render('index', {
    data,
    filteredData
  })
})

app.get('/room/:name', async (req, res) => {
  console.log(req.params.name)

  let data = await api.get(`/api/v1/room/${req.params.name}`)

  res.render('detail', {
    data
  })
})

app.listen(port)
