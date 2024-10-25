const { gql, RenameRootFields } = require('apollo-server');
const axios = require('axios')
const Redis = require("ioredis");
const redis = new Redis();

module.exports = {
    typeDefs: gql`
  
    type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: String
    tags: [String]
    }

    type Message {
        message: String
    }

  extend type Query {
    getMovies: [Movie] 
    getMovieById(_id: ID): Movie
    message: Message
  }

  extend type Mutation {
    createMovie(
        title: String,
        overview: String,
        poster_path: String,
        popularity: String,
        tags: [String]
    ): Movie

    updateMovie(
        _id: ID
        title: String,
        overview: String,
        poster_path: String,
        popularity: String,
        tags: [String]
    ): Message

    deleteMovie(
        _id: ID
    ): Message
  }
`
,
    resolvers: {
        Query: {
            getMovies: async () => {

              try {
                const movieRedis = await redis.get('movies')

                if (movieRedis) return JSON.parse(movieRedis)

                const { data } = await axios({
                  url: 'http://localhost:4001/movies/',
                  method: 'GET'
                })

                await redis.set('movies', JSON.stringify(data))
                return data
                
              }
              catch(err) {
                console.log(err)
              }
            },
            getMovieById: async (_, args) => {
              try {

                const { data } = await axios({
                  url: 'http://localhost:4001/movies/' + args._id,
                  method: 'GET'
                })
                console.log(data, "getById")

                return data
                
              }
              catch(err) {
                console.log(err)
              }
            }
        },  

        Mutation: {
          createMovie: async (_, args) => {
            try {
              let newMovie = {
                  title: args.title,
                  overview: args.overview,
                  poster_path: args.poster_path,
                  popularity: args.popularity,
                  tags: args.tags
              }

              const { data } = await axios({
                url: 'http://localhost:4001/movies/',
                method: 'POST',
                data: newMovie
              })

              // console.log(data.ops[0], "dari server")
              await redis.del('movies')
              return data.ops[0]

            }
            catch(err) {
                console.log(err)
            }
          },
          updateMovie: async (_, args) => {
            try {
              let editedMovie = {
                  title: args.title,
                  overview: args.overview,
                  poster_path: args.poster_path,
                  popularity: args.popularity,
                  tags: args.tags
              }

              const { data } = await axios({
                method: 'PUT',
                url: 'http://localhost:4001/movies/' + args._id,
                data: editedMovie
              })

              await redis.del('movies')
              return data

            }
            catch(err) {
                console.log(err)
            } 
          },
          deleteMovie: async (_, args) => {

            try {

              const { data } = await axios({
                method: 'DELETE',
                url: 'http://localhost:4001/movies/' + args._id
              })

              await redis.del('movies')
              return data

            }
            catch(err) {
              console.log(err)
            } 
          }
      }
    }
}



