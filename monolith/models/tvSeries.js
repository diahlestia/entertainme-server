const { ObjectID } = require('mongodb')
const { getDatabase, getPrimaryKey } = require('../config/mongodb')

class TvSeries {
    static find() {
        return getDatabase().collection('tv_series').find().toArray()
    }
    static findById(id) {
        return getDatabase().collection('tv_series').findOne({_id: ObjectID(id)})
    }
    static create(newSeries) {
        return getDatabase().collection('tv_series').insertOne(newSeries)
    }
    static update(id, updatedSeries) { 
        return getDatabase().collection('tv_series').findOneAndUpdate(
            {_id: ObjectID(id)}, 
            {$set: updatedSeries},
            {returnOriginal: false}        
        )
    }
    static destroy(id) {
        return getDatabase().collection('tv_series').findOneAndDelete(
            {_id: getPrimaryKey(id)}    
        )
    }
}

module.exports = TvSeries