const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const router = require('./routes')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(router)


app.listen(PORT, () =>
    console.log(`app listening on PORT: ${PORT}`)
)
    

