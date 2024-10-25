const { MongoClient, ObjectID } = require('mongodb')

let database = null

async function connect () {
    try {
        const uri = 'mongodb://localhost:27017'
        const client = new MongoClient(uri, { useUnifiedTopology: true })
    
        await client.connect()
        const db = await client.db('tv_series')
        // console.log(db, "<<<<DB")
        database = db
        return db
    }
    catch(err) {
        console.log(err, "err catch")
    }
}

const getPrimaryKey = (_id) => {
    return ObjectID(_id)
}

function getDatabase() {
    return database
}

module.exports = {
    connect,
    getPrimaryKey,
    getDatabase    
}