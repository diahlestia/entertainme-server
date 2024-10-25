const { gql } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

module.exports = {
    typeDefs: gql`
  
    type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: String
    tags: [String]
    }

    type MessageSeries {
        message: String
    }

  extend type Query {
    getTvSeries: [TvSeries] 
    getTvSeriesById(_id: ID): TvSeries
    messageSeries: MessageSeries
  }

  extend type Mutation {
    createTvSeries(
        title: String,
        overview: String,
        poster_path: String,
        popularity: String,
        tags: [String]
    ): TvSeries

    updateTvSeries(
        _id: ID
        title: String,
        overview: String,
        poster_path: String,
        popularity: String,
        tags: [String]
    ): MessageSeries

    deleteTvSeries(
        _id: ID
    ): MessageSeries
  }
`
,
    resolvers: {
        Query: {
            getTvSeries: async () => {

            try {

                const seriesRedis = await redis.get('series')

                if (seriesRedis) return JSON.parse(seriesRedis)

                const { data } = await axios({
                    url: 'http://localhost:4002/series/',
                    method: 'GET'
                  })
  
                  await redis.set('series', JSON.stringify(data))
                  return data
                  
                }
                catch(err) {
                  console.log(err)
                }
            },
            getTvSeriesById: async (_, args) => {

                try {

                const { data } = await axios({
                  url: 'http://localhost:4002/series/' + args._id,
                  method: 'GET'
                })
                return data
              }
              catch(err) {
                console.log(err)
              }
            }
        },  

        Mutation: {
          createTvSeries: async (_, args) => {

            try {
                let newTvSeries = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }

                const { data } = await axios({
                    url: 'http://localhost:4002/series/',
                    method: 'POST',
                    data: newTvSeries
                  })
    
                  // console.log(data.ops[0], "dari server")
                  await redis.del('series')
                  return data.ops[0]
    
                }
                catch(err) {
                    console.log(err)
                }
        
          },
          updateTvSeries: async (_, args) => {

            try {
                let editedTvSeries = {
                    title: args.title,
                    overview: args.overview,
                    poster_path: args.poster_path,
                    popularity: args.popularity,
                    tags: args.tags
                }
            
                const { data } = await axios({
                    method: 'PUT',
                    url: 'http://localhost:4002/series/' + args._id,
                    data: editedTvSeries
                  })
    
                  await redis.del('series')
                  return data
                }
                catch(err) {
                    console.log(err)
                } 
            
          },
          deleteTvSeries: async (_, args) => {

            try {
                const { data } = await axios({
                    method: 'DELETE',
                    url: 'http://localhost:4002/series/' + args._id
                  })
    
                  await redis.del('series')
                  return data
    
                }
                catch(err) {
                  console.log(err)
                } 
            }
        }
    }
}



