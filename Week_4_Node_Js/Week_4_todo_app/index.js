const express = require('express');

const app = express()

// define route handler
app.get('/', (req, res) => {
  // res.send('Hello World')
  res.send('<h1>Hi there</h1>')
  // res.send('<h1>Hi there</h1>') {Cannot set headers after they are sent to the client}
})

app.get('/asd', (req, res) => {
  res.send('Hello from the asd endpoint')
})

app.post('/', (req, res) => {
  res.send('Hello World from post endpoint')
})


app.listen(3000) // which port you want to listen on
