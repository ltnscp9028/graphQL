const { GraphQLServer } = require('graphql-yoga');
const { prisma } = require('./generated/prisma-client');
let links = [];

let idCount = links.length;

const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (root, args, context, info) => {
            return context.prisma.links()
        },
    },
    Mutation: {
        post: (root, args, context) => {
            return context.prisma.createLink({
                url: args.url,
                description: args.description,
            })
        },
    },
}
const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: { prisma }
})
server.start(() => console.log('http://localhost:4000 server'));