const { buildSchema } = require("graphql")

module.exports = buildSchema(`

  type User {
    _id: ID!
    username: String!
    password: String!
  }

  type Token {
    jwt: String!
  }

  type Guide {
    _id: ID!
    title: String!
    username: String!
    laClass: String!
    gamemode: String!
    abilities: [Ability!]
    description: String!
    upvotes: Int!
    crit: String!
    specialization: String!
    domination: String!
    swiftness: String!
    endurance: String!
    expertise: String!
  }

  type Ability {
    _id: ID!
    abilityName: String!
    skillLevels: String!
    tripodRowOne: String
    tripodRowTwo: String
    tripodRowThree: String
  }

  type Class {
    _id: ID!
    className: String!
    abilities: [String!]
  }

  input ClassInput {
    className: String!
    abilities: [String!]
  }

  input AbilityInput {
    abilityName: String!
    skillLevels: String
    tripodRowOne: String
    tripodRowTwo: String
    tripodRowThree: String
  }

  input UserInput {
    username: String!
    pass: String!
  }

  input GuideInput {
    title: String!
    username: String!
    laClass: String!
    gamemode: String!
    abilities: [AbilityInput!]
    description: String!
    crit: String!
    specialization: String!
    domination: String!
    swiftness: String!
    endurance: String!
    expertise: String!
  }

  type Query {
    getUsers:[User!]
    guide(_id:String): Guide
    guides(laClass:String):[Guide!]
    classes:[Class!]
    getUser(id: ID!): User
  }

  type Mutation {
    signup(user: UserInput): String!
    signin(user: UserInput): Token
    createGuide(guide: GuideInput): Guide
    deleteGuide(_id: String): Boolean
    likeGuide(_id: String): Guide
    createClass(class: ClassInput): Class
    deleteClass(_id: String): Boolean
  }

  schema {
    query: Query
    mutation: Mutation
  }
`)

//Add deleteGuide()