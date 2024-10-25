const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios')
const moviesModule = require('./modules/movies')
const tvSeriesModule = require('./modules/tvSeries')

const typeDefs = gql`
  type Query
  type Mutation
`;

const server = new ApolloServer({ 
    modules: [
      moviesModule,
      tvSeriesModule
    ]
});
  

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});

  
