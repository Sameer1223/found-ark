const User = require("../../models/user");
const Guide = require("../../models/guide");
const Class = require("../../models/class");
const Authentication = require("../../services/authentication");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  getUsers: async () => {
    try {
      const usersFetched = await User.find()
      return usersFetched.map(user => {
        return {
          ...user._doc,
          _id: user.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  getUser: async ({ id }, context) => {

    console.log(id)
    if (!context.userId) throw new Error("Not authenticated");
    if (context.userId !== id) throw Error("Access denied");
    return User.findById(id);
  },

  signup: async args => {
    try {
      const { username, pass } = args.user;
      const saltRounds = 10;
      const password = await bcrypt.hash(pass, saltRounds);
      const user = new User({
        username,
        password,
      });
      const newUser = await user.save();
      return "Welcome, " + newUser.username + "!";
    } catch (error) {
      throw error;
    }
  },

  // Signin method taken from https://medium.com/geekculture/graphql-node-js-mongodb-set-up-a-basic-server-with-user-model-and-auth-d05ed4d5a864
  signin: async args => { 
    try {
      const { username, pass } = args.user;
      const user = await User.findOne({username});
      if (!user) throw new Error("User not found");
      const isValid = await bcrypt.compare(pass, user.password);
      if (!isValid) throw new Error("Incorrect password");
      return {jwt: Authentication.generateJwt({
        userId: user.id, 
        username: user.username
      })};
    } catch (error) {
      throw error;
    }
  },

  guides: async args => {
    try {
      const guidesFetched = await Guide.find({ laClass:args.laClass })
      return guidesFetched.map(guide => {
        return { 
          ...guide._doc,
          _id: guide.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  classes: async () => {
    try {
      const classesFetched = await Class.find()
      return classesFetched.map(oneClass => {
        return { 
          ...oneClass._doc,
          _id: oneClass.id,
        }
      })
    } catch (error) {
      throw error
    }
  },

  guide: async args => {
    try {
      const guideFetched = await Guide.find({ _id:args._id })
      return guideFetched[0];
    } catch (error) {
      throw error
    }
  },
  
  /*
  createUser: async args => {
    try {
      const { username, password } = args.user
      const user = new User({
        username,
        password,
      })
      const newUser = await user.save()
      return { ...newUser._doc, _id: newUser.id }
    } catch (error) {
      throw error
    }
  },
  */

  createClass: async args => {
    try {
      const { className, abilities } = args.class
      const newClass = new Class({
        className,
        abilities,
      })
      const returnClass = await newClass.save()
      return { ...returnClass._doc, _id: returnClass.id }
    } catch (error) {
      throw error
    }
  },

  createGuide: async args => {
    try {
      const { 
        title, 
        username, 
        laClass, 
        gamemode, 
        abilities, 
        description, 
        crit, 
        specialization, 
        domination, 
        swiftness, 
        endurance, 
        expertise 
      } = args.guide;
      const guide = new Guide({
        title, 
        username, 
        laClass,
        gamemode, 
        abilities, 
        description,
        upvotes: 0,
        crit, 
        specialization, 
        domination, 
        swiftness, 
        endurance, 
        expertise
      })
      const newGuide = await guide.save()
      return { ...newGuide._doc, _id: newGuide.id }
    } catch (error) {
      throw error
    }
  },

  likeGuide: Authentication.authenticate(async args => {
    try {
      const fetchedGuide = await Guide.findOne({ _id:args._id });
      if (!fetchedGuide) {
        throw new Error("Unable to find guide with id " + args._id);
      }
      fetchedGuide.upvotes += 1;
      await Guide.updateOne({_id: args._id}, {$set: {upvotes: fetchedGuide.upvotes}});
      return fetchedGuide;
    } catch (error) {
      throw error;
    }
  }),

  deleteGuide: async args => {
    try {
      const fetchedGuide = await Guide.deleteOne({ _id:args._id })
      return fetchedGuide.acknowledged
    } catch (error) {
      throw error
    }
  },

  deleteClass: async args => {
    try {
      const fetchedClass = await Class.deleteOne({ _id:args._id })
      return fetchedClass.acknowledged
    } catch (error) {
      throw error
    }
  }
}
