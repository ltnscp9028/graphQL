const {GraphQLServer} = require('graphql-yoga');

let links =[];

let idCount  =links.length;

const resolvers = {
    Query: {
        info: () => `Hello APi!!`,
        feed: () =>links,
        link: (_,args) => {
            for(let i=0;i<links.length;i++)
                if(args.id == links[i].id)return links[i]
        }
    },  

    Mutation: {
        post:(parent,args) => {
            const link = {
                id: `link-${idCount++}`,
                description:args.description,
                url:args.url,
            }
            links.push(link);
            return link;
        },
        
        updateLink:(parent,args) => {
            for(let i=0;i<links.length;i++)
                if(args.id==links[i].id){
                    links[i].url = args.url;
                    links[i].description = args.description;
                    return links[i];
                }
        },
        deleteLink: (parent,args) => {
            let arr = [];
            let delLink;
            for(i=0;i<links.length;i++){
                if(links[i].id==args.id)delLink=links[i];
                else arr.push(links[i]);
            }
            links = arr;
            return delLink;
        }
    },
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
})
server.start(()=>console.log('http://localhost:4000 server'));