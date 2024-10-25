const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')

const typeDefs = gql`
  
    type Movie {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
    }

    type TvSeries {
    _id: ID
    title: String
    overview: String
    poster_path: String
    popularity: Int
    tags: [String]
    }

 
  type Query {
    getMovies: [Movie] 
    getTvSeries: [TvSeries]
    getMovieById(_id: ID): Movie
    getTvSeriesById(_id: ID): TvSeries
  }

  type Mutation {
    createMovie: (_, args) => {
      const movieInput = {
        title: args.title
        overview: args.overview
        poster_path: args.poster_path
        popularity: args.popularity
        tags: args.tags
      }
    }
  }

`;


const resolvers = {
    Query: {
        getMovies: () => {
            return axios({
              url: 'http://localhost:4001/movies',
              method: 'GET'
          })
          .then(({data}) => {
              return data
          })
          .catch(err => {
              console.log(err)
          })
        },
        getTvSeries: () => {
            return axios({
              url: 'http://localhost:4002/series',
              method: 'GET'
          })
          .then(({data}) => {
              return data
          })
          .catch(err => {
              console.log(err)
          })
        },
        getMovieById: (_, args) => {
            return axios({
              url: 'http://localhost:4001/movies/' + args._id,
              method: 'GET'
          })
          .then(({data}) => {
              return data
          })
          .catch(err => {
              console.log(err)
          })
        },
        getTvSeriesById: (_, args) => {
            return axios({
              url: 'http://localhost:4002/series/' + args._id,
              method: 'GET'
          })
          .then(({data}) => {
              return data
          })
          .catch(err => {
              console.log(err)
          })
        },
    },
    
    
  };


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

  
