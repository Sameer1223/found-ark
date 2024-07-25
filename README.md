# Found Ark
## Project URL

https://foundark.me/

## Project Description

A PvP guide for the popular MMORPG game Lost Ark. Users can sign up and design their own build guides with an interface specially designed to mimic the in-game ability selection UI. Users can input a title, description, the set of abilities they like on their specific class and upload their guide to the site. Users can also view other guides to see others' selected abilities/stats and tips/tricks for specific classes. Viewers are able to like their favourite guides for the variety of classes. 

## Development

**React**: The front-end library for the application used to develop all the UI and dynamic interactions on the site.

**Apollo**: Frontend tool for interacting with graphql

**NodeJS**: The runtime environment and package manager for the project.

**Express**: Used for routing and handling api requests, as well as any middleware to support the backend.

**MongoDB**: Used as the noSQL database for the project to store information about guides, users, abilities

**GraphQL**: The data exchange system for the project used to query and update specific data required by the frontend

The application has an express server running with middleware to allow us to run the backend. There is an express route to graphql which is built using graphqlHTTP from the express-graphql library. The graphql module uses schema and resolvers that we have developed for querying and updating data. The frontend uses Apollo to build a client that sends requests to the express route. The Apollo library also handles all the written queries and also performs the queries and mutations. React is used to dynamically update this information on the frontend, as well as being the tool to serve our HTML, CSS, and JS. The website is built using our custom built react components. MongoDB is used as the database that stores any changes when a graphql mutation is performed or used for querying data.

## Deployment

The project is deployed using a Digital Ocean droplet. The VM runs both the frontend and the backend.
A custom domain was added to the Digital Ocean droplet and name servers were updated accordingly.
Node and Nginx were installed onto the VM.
SSL was added with the use of LetsEncrypt and Certbot.
Nginx config file is updated with a proxy leading to the frontend port and a route to the graphql api running on a seperate port.
After nginx configuration, a proxy is added to the frontend and after a production build is complete, the folder is copied onto the VM with rsync
The frontend and backend run on a process manager named pm2 for a deployed application.

