// const express = require('express');
// const app = express();
// const dotenv = require('dotenv').config();
// const arrayify = require('array-back');
// const multer = require('multer');
// const session = require('express-session');
// const methodOverride = require("method-override");
// const passport = require("passport") // to authenticate through passport 
// const flash = require('express-flash'); //als de gebruiker successvol ingelogd is geeft flash aan die aan.
// const{
//     checkAuthenticated,
//     checkNotAuthenticated,
// } = require("./middleware/authentification");

// const localStrategy = require('passport-local').Strategy // zorgt ervoor dat je alles kunnen gebruiken voor het inloggen met username, name of email
// const {
//     MongoClient
// } = require('mongodb');
// const {
//     ObjectId
// } = require('mongodb');
// const nodemailer = require('nodemailer');
// const mongoose = require("mongoose");
// const User = require('./model/users');
// const Match = require("./model/matches")

// ////////////////////////////////////
// // Mongoose verbinden met MongoDB //
// ////////////////////////////////////

// const dbURI = process.env.DB_URI

// mongoose.connect(dbURI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then((result) => console.log('We have a connection to Mongoose'))
//     .catch((err) => console.log(err));

// // mongoose.connect("mongodb://localhost/matchingapp", () => {
// //         console.log("connected")
// //     },
// //     //for error 
// //     e => console.error(e)

// //)


// //passport initialiseren

// const initializePassport = require("./middleware/passport.js")
// const bcrypt = require('bcryptjs')//wachtwoord hashen (om het hacken van wachtwoorden in de database te voorkomen)

// const {
//     validateUserSignUp
// } = require('./middleware/validation/user');
// const {
//     check,
//     validationResult
// } = require('express-validator');
// const read = require('body-parser/lib/read');

// //////////////////////
// // Define Variables //
// //////////////////////
// const port = process.env.PORT || 4000;
// let db = null;
// const interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];
// let errorMessage = '';

// //////////////////
// // Static Files //
// //////////////////
// app.use(express.static('public'));
// app.use(express.json());
// app.use(express.urlencoded({
//     extended: true
// }));

// // als de gebruiker sucesvol ingelogd is geeft deze module dit aan.
// app.use(flash());

// //Express sessions
// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: true,
    
// }));
// app.use(methodOverride("_method"))

// //Passport
// app.use(passport.initialize());// bij passport moet je altjd initialiseren 
// app.use(passport.session()); 
// initializePassport(
//     passport, 
//     async(email) => {
//         const userFound = await User.findOne({email})
//         return userFound
//     },
//     async (id) => {
//         const userFound = await User.findOne({_id:id });
//         return userFound;
//     }
// );


// ///////////////////////////
// // Set Templating Engine //
// ///////////////////////////
// app.set('view engine', 'ejs');

// ///////////////////////
// // Set Up Nodemailer //
// ///////////////////////
// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: process.env.GMAIL_EMAIL,
//         pass: process.env.GMAIL_PASSW
//     }
// });

// ////////////////////////
// // Define Main Routes //
// ////////////////////////

// // De eerste route is de pagina waar de gebruiker op komt wanneer hij/zij als eerste de app opent
// app.get('/', (req, res) => {
    
//     const title = "Match-A-Pet";
//     res.render('index', {
//         title
//     });
// })

// //De route voor de inlogpagina
// app.get('/inlog', checkNotAuthenticated, (req, res) => {
//     // TODO: what if the user is logged in etc;
    
//     const loggedInUser = req.session.user ? req.session.user:null;
//     if(loggedInUser) {
//         res.redirect("/profile");
//     }else{
//         res.render("inlog" ,{
//             user : loggedInUser,
//             title: "inlog"
//         });
//     }
// });

// app.get('/logout', (req, res) => {
//     req.logout();
//     res.redirect('/inlog');
// })

// //route voor het aanmelden
// app.post(
// 	'/inlog',
// 	passport.authenticate('local', {
// 		successRedirect: '/profile',
// 		failureRedirect: '/inlog',
// 		failureFlash: true,
// 	})
// );



// // De route voor de homepagina
// app.get('/home', (req, res) => {
//     // TODO: what if the user is logged in etc
//     const title = "Home";
//     res.render('home', {
//         title
//     });
// })

// // De pagina voor het aanmaken van het profiel
// app.get('/makeprofile', (req, res) => {
//     const loggedInUser = req.session.user ? req.session.user : null;
//     const err = null;
//     const title = "Make Profile";


//     res.render('makeprofile', {
// 		user: loggedInUser,
// 		err: err,
//         errors:undefined,
// 		title: 'Makeprofile',
//         interests,
//         errorMessage
// 	});
// });


// // Met deze post route wordt het formulier dat door de gebruiker is ingevuld verstuurd naar de database
// app.post('/makeprofile', checkNotAuthenticated, validateUserSignUp, async (req, res) => {
//     const errors = validationResult(req);
//     const loggedInUser = req.session.user ? req.session.user : null;

//     // my guess on what happens here: errorafhandeling; wanneer de validatie errors geeft, wordt de errorMessage aangepast en wordt de gebruiker terug gestuurd naar de makeprofile pagina
//     if (!errors.isEmpty()) { // 
//         const title = "error";
//         console.log(errors);
//         let errorMessage = Error;
//         return res.status(400).render('makeprofile', {
//             errors: errors.array(),
//             title,
//             user:loggedInUser,
//             errorMessage,
//             interests
//         });
//     }

//     // Alle onderdelen van het formulier worden opgehaald door middel van de BodyParser van express en samengevoegd in een variabele
//     let profile = {
//         url: req.body.avatar,
//         name: req.body.name,
//         age: req.body.age,
//         country: req.body.country,
//         bio: req.body.bio,
//         interests: arrayify(req.body.interests),
//         mail: req.body.mail,
//         password: req.body.password,
//         url_a: req.body.avatar_a,
//         name_a: req.body.name_a,
//         age_a: req.body.age_a,
//         type_a: req.body.type_a,
//         breed_a: req.body.breed_a,
//          bio_a: req.body.bio_a
//     };

//     const salt = bcrypt.genSaltSync(10);
//     profile.password = bcrypt.hashSync(profile.password, salt);

//     // Nu zorgen we ervoor dat er een bevestigingsmail van de registratie gestuurd wordt naar de nieuwe gebruiker
//     const mailOptions = {
//         from: 'match-a-pet@gmail.com',
//         to: req.body.mail,
//         subject: 'Registratie Match-A-Pet',
//         text: 'Uw registratie bij Match-A-Pet is voltooid, veel succes met het vinden van uw perfecte match!'
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });

//     // Vervolgens wordt door middel van het inserten van deze variabele het profiel opgeslagen in de database
//     await db.collection('users').insertOne(profile); // what if this doesn't work? shouldn't mongodb be able to send an error message about that then?
//     // and: something to think about: what if there is an existing user with the same email in the database already? 
   
//     const dbProfile = await db.collection('users').findOne({ email: req.body.email });
//     res.render('inlog', {profiles: dbProfile});

//     // OlD STUFF
//     // const title = "Succesfully Made Profile Page!";
//     // res.render('home', {title, profiles});

// })

// // De route voor de profielpagina
// app.get('/profile', checkAuthenticated, async (req, res) => {
//     // console.log(dbProfileData) // TODO: check if this is the data you want
//     // if (!dbProfileData) { // what if the user doesn't come on this page after the POST from makeprofile? thus, dbProfileData isn't passed?

//     // } else { // if there is profile data from the current user available, then what do we want? what should we do?

//     // }



//     const profiles = await db.collection('users').findOne(); // then you can show the profile of the logged in user, and how do we look up the current user's data from the database?

//     const title = "Profile Page";

//     res.render('profile', {
//         title,
//         profiles
//     });

// })


// // THE FUNCTIONALITIES BELOW, WE'LL TALK ABOUT AFTER ABOVE TO-DO's ARE DONE
// // De route voor de editpagina
// app.get('/edit', async (req, res) => {
//     // Het profiel wordt uit de database gehaald zodat deze ingevuld kan worden in de invoervelden, zodat de gebruiker deze niet allemaal opnieuw hoeft in te vullen
//     const profiles = await db.collection('users').findOne();

//     const title = "Profile Editor";
//     res.render('edit', {
//         title,
//         profiles,
//         interests
//     });
// })

// // Met deze post route wordt het bewerkte profiel verstuurd naar de database
// app.post('/edit', async (req, res) => {
//     // Alle onderdelen van het formulier (met bewerkingen) worden opnieuw opgehaald door middel van de BodyParser van express en samengevoegd in een variabele
//     let profile = {
//         url: req.body.avatar || req.body.original_image,
//         name: req.body.name,
//         age: req.body.age,
//         country: req.body.country,
//         bio: req.body.bio,
//         interests: arrayify(req.body.interests),
//         url_a: req.body.avatar_a || req.body.original_image_a,
//         name_a: req.body.name_a,
//         age_a: req.body.age_a,
//         type_a: req.body.type_a,
//         breed_a: req.body.breed_a,
//         bio_a: req.body.bio_a
//     };

//     // Het aangepaste profiel moet het oude profiel vervangen, dit wordt gedaan met de replaceOne functie    
//     const query = {};
//     await db.collection('users').replaceOne(query, profile);

//     // Het aangepaste proifel wordt gezocht in de database zodat deze weer op de profielpagina laten zien kan worden
//     const profiles = await db.collection('users').findOne();

//     const title = "Succesfully Edited Profile Page!";
//     res.render('profile', {
//         title,
//         profiles
//     });
// })

// // De route voor de discover pagina
// app.get('/discover', async (req, res) => {
//     // De potentiële matches worden uit de database gehaald zodat deze kunnen worden laten zien aan de gebruiker
//     const matches = await db.collection('matches').findOne({
//         "liked": ""
//     });

//     const title = "Discover";
//     res.render('discover', {
//         title,
//         matches
//     });
// })

// // De route voor het liken van een profiel
// app.post('/like', async (req, res) => {
//     const query1 = {
//         _id: ObjectId(req.body.matchid)
//     };
//     await db.collection('matches').updateOne(query1, {
//         $set: {
//             liked: "yes"
//         }
//     });

//     const query2 = {
//         "liked": "yes"
//     };
//     const likes = await db.collection('matches').find(query2).toArray();

//     const mongooseLikes = await Match.find({ liked: "yes" }).exec();

//     const title = "Likes";
//     res.render('likes', {
//         title,
//         likes
//     });
// })

// // De route voor het disliken van een profiel
// app.post('/dislike', async (req, res) => {
//     const query1 = {
//         _id: ObjectId(req.body.matchid)
//     };
//     await db.collection('matches').updateOne(query1, {
//         $set: {
//             liked: "no"
//         }
//     });

//     const matches = await db.collection('matches').findOne({
//         "liked": ""
//     });

//     const title = "Discover";
//     res.render('discover', {
//         title,
//         matches
//     });
// })

// // De route voor de filterpagina
// app.get('/filter', async (req, res) => {
//     const title = "Filtering";
//     res.render('filter', {
//         title
//     });
// })

// app.post('/filter', async (req, res) => {
//     const query = {
//         "country": req.body.country_filter,
//         "type_a": req.body.type_a_filter,
//         "liked": ""
//     };
//     const filter = await db.collection('matches').findOne(query);

//     const title = "Discover";
//     res.render('discover', {
//         title,
//         matches: filter
//     });
// })

// // De route voor de likespagina
// app.get('/likes', async (req, res) => {
//     const query = {
//         "liked": "yes"
//     };
//     const likes = await db.collection('matches').find(query).toArray();

//     const title = "Likes";
//     res.render('likes', {
//         title,
//         likes
//     });
// })

// app.get('/likes/:_id', async (req, res) => {
//     const query = {
//         _id: ObjectId(req.params._id)
//     };
//     const matches = await db.collection('matches').findOne(query);

//     const title = "Liked Profile";
//     res.render('likedprofile', {
//         title,
//         matches
//     });
// })

// ////////////////
// // Error Page //
// ////////////////

// // De route voor de error status 404 wordt aangemaakt, wanneer er een verkeerde route in de url wordt ingevuld wordt deze pagina laten zien
// app.use((req, res, next) => {
//     console.log("Error 404");
//     const title = "Error 404";
//     res.status(404).render('404', {
//         title
//     });
// })

// /////////////////////////
// // Connect to database //
// /////////////////////////

// // Er wordt een connectie gemaakt met de database van MongoDB, de variabelen zoals DB_URI & NAME worden uit de .env file gehaald
// // Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/mongo_example/server.js
// async function connectDB() {
//     const uri = process.env.DB_URI;
//     const client = new MongoClient(uri, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//     });
//     try {
//         await client.connect();
//         db = client.db(process.env.DB_NAME);
//     } catch (error) {
//         throw error;
//     }
// }

// //////////////////
// // Start Server //
// //////////////////

// // De server wordt opgestart, hierbij wordt de port waarop deze wordt gehost gelogt in de console, en wordt er gecheckt of de database is geconnect, waarna de gebruiker ook hierover wordt ingelicht via de console
// app.listen(port, () => {
//     console.log(`Example app listening on port ${port}`);

//     connectDB().then(() => console.log('We have a connection to Mongo!'));
// })



// // Ik wilde ook graag een foto upload-functie erin verwerken, maar ben hier uiteindelijk helaas niet uitgekomen... Het was me toch iets te moeilijk, ik heb nu dus gewoon een dummyfoto gebruikt bij de profielfoto,
// // en bij het fotoupload knopje heb ik het wel voor elkaar gekregen dat je deze geuploade foto kan zien. Deze wordt dan uiteraard niet op de server opgeslagen en is daardoor ook niet zichtbaar op het uiteindelijke profiel
// // Ik hoop dat desalniettemin mijn functie goed genoeg is!