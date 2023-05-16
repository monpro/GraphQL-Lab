const gql = require('graphql-tag')
const {ApolloServer} = require('apollo-server')

const usersList = [{id: '1', username: 'Alice', email: 'alice@example.com', createdAt: '2021-01-01'},
  {id: '2', username: 'Bob', email: 'bob@example.com', createdAt: '2021-01-02'},
  {id: '3', username: 'Charlie', email: 'charlie@example.com', createdAt: '2021-01-03'}];

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    createdAt: Int!
  }
  
  
  type Settings {
      user: User!
      theme: String!
  }
  
  type Query {
      me: User!,
      user(id:ID!): User
      settings(user: ID!): Settings!
      users: [User!]
  }
  
  input NewSettingsInput {
      user: ID!
      theme: String!
  }
  
  type Mutation {
      settings(input: NewSettingsInput!): Settings!
  }
`

const resolvers = {
  Query: {
    me() {
      return {
        id: 1,
        username: 'test',
        createAt: 11111
      }
    },
    settings(_, {user}) {
      return {
        user,
        theme: 'Light'
      }
    },
    user: (_, {id}) => {
      return usersList[id - 1] || null
    },
    users() {
      return [
        ...usersList,
      ]
    }
  },

  Mutation: {
    settings(_,  {input}) {
      return input
    }
  },

  Settings: {
    user() {
      return {
        id: 1,
        username: 'test',
        createAt: 11111
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({url}) => console.log(`server on ${url}`))
