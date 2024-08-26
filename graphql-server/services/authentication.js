const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

dotenv.config();

// Authentication methods {generateJwt, getJwtPayload} from https://medium.com/geekculture/graphql-node-js-mongodb-set-up-a-basic-server-with-user-model-and-auth-d05ed4d5a864
class Authentication {
    constructor() {}

    static generateJwt({ userId, username }) {
        return jwt.sign(
            { userId, username },
            process.env.TOKEN_SECRET,
            { expiresIn: '30 days' }
        );
    }
    
    static getJwtPayload(token) {
        return jwt.verify(token, process.env.TOKEN_SECRET);
    }

    static async getUser(token)  {
        const { userId } = jwt.verify(token, process.env.TOKEN_SECRET);
        return await User.findOne({_id:userId})
    }

    static getUserId(req) {
        let user;
        let userId;
        let isAuthenticated = false;

        const authorization = req.get("Authorization")

        if (authorization) {
            const token = authorization.replace("Bearer ", "");
            if (!token) return null;
            user = this.getJwtPayload(token);
            if (user) {
                isAuthenticated = true;
                userId = user.userId;
            }
        }
        return { isAuthenticated, userId };
    };

    static authenticate(resolver){
        return function(root, args, context, info) {
            //console.log("Context", args);
            if (args.isAuthenticated) {
              return resolver(root, args, context, info);
            }
            throw new Error(`Access Denied!`);
          };
    }
}

module.exports = Authentication