const compression = require('compression')
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const fs = require('fs')

app.use(cors())
app.use(compression())

app.get('/file/:name', (req, res) => {
  res.setHeader('content-type', 'application/octet-stream')
  fs.createReadStream(`./data/${req.params.name}.pbf`)
    .on('error', (err) => {
      res.setHeader('content-type', 'text/plain')
      res.status(500).send('file does not exist')
    })
    .pipe(res)
})

app.listen(port)
