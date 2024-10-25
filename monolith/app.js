const express = require('express')
const app = express()
const PORT = process.env.port || 3000
const { connect } = require('./config/mongodb')
const router = require('./routes/index')

// app.get('/', (req, res) => {
//     res.json({
//         message: "Hello"
//     })
// })
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(router)

connect()
    .then(async (db) => {
        // database = db
        // console.log(db, "<<<db app")
        app.listen(PORT, () =>
        console.log(`app listening on PORT: ${PORT}`)
        )
    })

