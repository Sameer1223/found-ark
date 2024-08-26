/*jshint esversion: 6 */
import { gql } from "@apollo/client";

export var api = (function(){

    var module = {};

    module.getUsers = function(){
        let GET_USERS = gql`
            {
                users {
                    username
                }
            }
        `;
        return GET_USERS;
    };
  
    module.signup = function(username, password){
        let SIGNUP = gql`
        mutation {
            signup(user: {username: "${username}", pass: "${password}"})
        }
        `;
        return SIGNUP;
    }

    module.getClasses = function(){
        let GET_CLASS = gql`
            {
                classes {
                    className
                    abilities
                }
            }
        `;
        return GET_CLASS;
    };

    module.signin = function(username, password){
        let SIGNIN = gql`
        mutation {
            signin(user:{username:"${username}", pass:"${password}"}){
            jwt
          }
        }
        `;
        return SIGNIN;
    }
  
    module.getGuidePreviews = function(laClass){
        let GET_GUIDES_PREVIEW = gql`
        {
            guides(laClass: "${laClass}") {
                _id
                title
                username
                laClass
                gamemode
                upvotes
            }
        }
        `;
        return GET_GUIDES_PREVIEW;
    };

    module.getGuides = function(){
        let GET_GUIDES = gql`
            {
                guides {
                    title
                    username
                    laClass
                    gamemode
                    abilities {
                        abilityName
                        skillPoints
                        tripodRowOne
                        tripodRowTwo
                        tripodRowThree
                    }
                    description
                    upvotes
                }
            }
        `;
        return GET_GUIDES;
    };

    module.getGuide = function(_id){
        let GET_GUIDE = gql`
            {
                guide(_id: "${_id}") {
                    title
                    username
                    laClass
                    gamemode
                    abilities {
                        abilityName
                        skillLevels
                        tripodRowOne
                        tripodRowTwo
                        tripodRowThree
                    }
                    description
                    upvotes
                    crit
                    specialization
                    domination
                    swiftness
                    endurance
                    expertise
                }
            }
        `;
        return GET_GUIDE;
    };

    module.postGuide = function(title, username, laClass, gamemode, abilitiesList, description, crit, specialization, domination, swiftness, endurance, expertise){
        let POST_GUIDE = gql`
            mutation {
                createGuide(guide: {
                    title: "${title}",
                    username: "${username}",
                    laClass: "${laClass.value}",
                    gamemode: "${gamemode.value}",
                    abilities: [${abilitiesList.map((ability) => {
                        return "{abilityName: \"" + ability.abilityName
                            + "\", skillLevels: \"" + ability.skillLevels
                            + "\", tripodRowOne: \"" + ability.tripodRowOne
                            + "\", tripodRowTwo: \"" + ability.tripodRowTwo
                            + "\", tripodRowThree: \"" + ability.tripodRowThree + "\"}";
                    })}],
                    description: "${description}",
                    crit: "${crit}", 
                    specialization: "${specialization}", 
                    domination: "${domination}", 
                    swiftness: "${swiftness}", 
                    endurance: "${endurance}", 
                    expertise: "${expertise}" 
                }) {
                    title   
                    username
                    laClass
                    description
                    upvotes
                }
            }
        `;
        return POST_GUIDE;
    };

    module.likeGuide = function(_id){
        let LIKE_GUIDE = gql`
        mutation {
            likeGuide(_id:"${_id}"){
              _id
              title
              upvotes
            }
          }
        `;
        return LIKE_GUIDE;
    }
    
    return module;
})();

/*
const POST_GUIDE = gql`
    mutation {
        createGuide(guide:
        {
        title: "Deathblade Guide",
        username: "Samsam",
        laClass:"Deathblade",
        gamemode: "TDM",
        abilities: [
            {
            abilityName: "Upper Slash",
            skillPoints: "10",
            tripodRowOne: "Bigger",
            tripodRowTwo: "Stronger",
            tripodRowThree: "Faster"
            },
            {
            abilityName: "Blitz Rush",
            skillPoints: "10",
            tripodRowOne: "Cooler",
            tripodRowTwo: "Easier",
            tripodRowThree: "Spicier"
            }
        ],
        synergies: ["Paladin", "Sorceress"],
        counters: ["Artillerist", "Gunlancer", "Bard"],
        description: "This is what you wanna do. Don't be bad and it is pretty easy to climb",
        }) {
        title
        username
        laClass
        synergies
        counters
        description
        upvotes
        downvotes
        }
    }
`;
*/