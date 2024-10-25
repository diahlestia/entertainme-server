const { ObjectID } = require('mongodb')
const { getDatabase, getPrimaryKey } = require('../config/mongodb')

class Movies {
    static find() {
        return getDatabase().collection('movies').find().toArray()
    }
    static findById(id) {
        return getDatabase().collection('movies').findOne({_id: ObjectID(id)})
    }
    static create(newMovie) {
        return getDatabase().collection('movies').insertOne(newMovie)
    }
    static update(id, updatedMovie) { 
        return getDatabase().collection('movies').updateOne(
            {_id: ObjectID(id)},
            {$set: updatedMovie},
            {returnOriginal: false}
        )
    }
    static destroy(id) {
        return getDatabase().collection('movies').findOneAndDelete(
            {_id: getPrimaryKey(id)}    
        )
    }

}

module.exports = Movies