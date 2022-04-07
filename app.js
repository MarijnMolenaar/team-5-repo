const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const arrayify = require('array-back');
const multer = require('multer');
const {MongoClient} = require('mongodb');
const {ObjectId} = require('mongodb');
const nodemailer = require('nodemailer');

<<<<<<< Updated upstream
// const {
//     check,
//     validationResult
// } = require('express-validator');
=======
////////////////////////////////////
// Mongoose verbinden met MongoDB //
////////////////////////////////////

const dbURI = process.env.DB_URI

mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result) => console.log('We have a connection to Mongoose'))
    .catch((err) => console.log(err));

// mongoose.connect("mongodb://localhost/matchingapp", () => {
//         console.log("connected")
//     },
//     //for error 
//     e => console.error(e)

//)




const {validateUserSignUp } = require('./middleware/validation/user'); 
const {
    check,
    validationResult
} = require('express-validator');
>>>>>>> Stashed changes


// const router = express.Router();
//const {validateUserSignUp, validationResult} = require('./middleware/validation/user'); 


//////////////////////
// Define Variables //
//////////////////////
const port = process.env.PORT || 4000;
let db = null;
const interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];

//////////////////
// Static Files //
//////////////////
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

///////////////////////////
// Set Templating Engine //
///////////////////////////
app.set('view engine', 'ejs');

///////////////////////
// Set Up Nodemailer //
///////////////////////
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSW
  }
});

////////////////////////
// Define Main Routes //
////////////////////////

// De eerste route is de pagina waar de gebruiker op komt wanneer hij/zij als eerste de app opent
app.get('/', (req, res) => {
    // De database wordt leeggemaakt, de gebruiker moet voor het eerst zijn/haar profiel aanmaken dus de database mag nog geen profiel bevatten
    db.collection('myprofile').deleteMany({});

    const title = "Match-A-Pet";
    res.render('index', {title});
})

// De pagina voor het aanmaken van het profiel
app.get('/makeprofile', (req, res) => {
    const title = "Make Profile";
   // const err = null; 
   
    res.render('makeprofile', {title, interests});
    //res.render('makeprofile', {title, interests, err: err});
    
})

// Met deze post route wordt het formulier dat door de gebruiker is ingevuld verstuurd naar de database
app.post('/makeprofile', async (req, res) => {
    // Alle onderdelen van het formulier worden opgehaald door middel van de BodyParser van express en samengevoegd in een variabele
    let profile = {
        url: req.body.avatar,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        bio: req.body.bio,
        interests: arrayify(req.body.interests),
        url_a: req.body.avatar_a,
        name_a: req.body.name_a,
        age_a: req.body.age_a,
        type_a: req.body.type_a,
        breed_a: req.body.breed_a,
        bio_a: req.body.bio_a
    };

    // Nu zorgen we ervoor dat er een bevestigingsmail van de registratie gestuurd wordt naar de nieuwe gebruiker
    const mailOptions = {
        from: 'match-a-pet@gmail.com',
        to: req.body.mail,
        subject: 'Registratie Match-A-Pet',
        text: 'Uw registratie bij Match-A-Pet is voltooid, veel succes met het vinden van uw perfecte match!'
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    
    // Vervolgens wordt door middel van het inserten van deze variabele het profiel opgeslagen in de database
<<<<<<< Updated upstream
    await db.collection('myprofile').insertOne(profile);
=======
    await db.collection('myprofile').insertOne(profile); // what if this doesn't work? shouldn't mongodb be able to send an error message about that then?
    // and: something to think about: what if there is an existing user with the same email in the database already? 
    // IF you will be using sesisons: you can maybe redirect to a login page instead and have the user sign in with their newly created account (easiest solution as it seperates your functionalities best.. not a good IRL option though!)


    const dbProfile = await db.collection('myprofile').findOne({
        email: req.body.mail // find the user with the same email as the one that just registered
    }, (err, user) => {
        // is there a profile found? how to check this? (hint: check the mongodb docs)
        // what if there is no profile found?
        // how to check if this matches the person that just registered? password?

        let dbProfileData = // TODO: what data should be passed on to the profile page template?
        // if everything's alright, then redirect to the profile page and send the user data with it
        res.redirect('/profile', dbProfileData); // also an option: send only the email and the password, and fetch the user data from the database again (this will be a lot of work for the server and db though..)
    }); 
// OlD STUFF
    // const title = "Succesfully Made Profile Page!";
    // res.render('home', {title, profiles});
    
})

// De route voor de profielpagina
app.get('/profile', async (req, res) => {
    console.log(dbProfileData) // TODO: check if this is the data you want
    if (!dbProfileData) { // what if the user doesn't come on this page after the POST from makeprofile? thus, dbProfileData isn't passed?
        
    } else { // if there is profile data from the current user available, then what do we want? what should we do?

    }

        

// BELOW: former stuff, not needed anymore, but might be useful for look back on as process (do remove later though)
    // what if someone navigates to matchapet.nl/profile, but isn't logged in
    // Het eerder ingevulde profiel wordt nu uit de database gehaald zodat deze kan worden laten zien aan de gebruiker
    
    // and if someone _is_ logged in, then what?
    // const profiles = await db.collection('myprofile').findOne(); // then you can show the profile of the logged in user, and how do we look up the current user's data from the database?
>>>>>>> Stashed changes

    const profiles = await db.collection('myprofile').findOne();

    const title = "Succesfully Made Profile Page!";
    res.render('home', {title, profiles});
})

// De route voor de homepagina
app.get('/home', (req, res) => {
    const title = "Home";
    res.render('home', {title});
})

// De route voor de discover pagina
app.get('/discover', async (req, res) => {
    // De potentiële matches worden uit de database gehaald zodat deze kunnen worden laten zien aan de gebruiker
    const matches = await db.collection('matches').findOne({"liked": ""});

    const title = "Discover";
    res.render('discover', {title, matches});
})

// De route voor het liken van een profiel
app.post('/like', async (req, res) => {
    const query1 = {_id: ObjectId(req.body.matchid)};
    await db.collection('matches').updateOne(query1, {$set: {liked: "yes"}});

    const query2 = {
        "liked": "yes"
    };
    const likes = await db.collection('matches').find(query2).toArray();

    const title = "Likes";
    res.render('likes', {title, likes});
})

// De route voor het disliken van een profiel
app.post('/dislike', async (req, res) => {
    const query1 = {_id: ObjectId(req.body.matchid)};
    await db.collection('matches').updateOne(query1, {$set: {liked: "no"}});

    const matches = await db.collection('matches').findOne({"liked": ""});

    const title = "Discover";
    res.render('discover', {title, matches});
})

// De route voor de filterpagina
app.get('/filter', async (req, res) => {
    const title = "Filtering";
    res.render('filter', {title});
})

app.post('/filter', async (req, res) => {
    const query = {"country": req.body.country_filter, "type_a": req.body.type_a_filter, "liked": ""};
    const filter = await db.collection('matches').findOne(query);

    const title = "Discover";
    res.render('discover', {title, matches: filter});
})

// De route voor de likespagina
app.get('/likes', async (req, res) => {
    const query = {
        "liked": "yes"
    };
    const likes = await db.collection('matches').find(query).toArray();

    const title = "Likes";
    res.render('likes', {title, likes});
})

app.get('/likes/:_id', async (req, res) => {
    const query = {_id: ObjectId(req.params._id)};
    const matches = await db.collection('matches').findOne(query);

    const title = "Liked Profile";
    res.render('likedprofile', {title, matches});
})

// De route voor de profielpagina
app.get('/profile', async (req, res) => {
    // Het eerder ingevulde profiel wordt nu uit de database gehaald zodat deze kan worden laten zien aan de gebruiker
    const profiles = await db.collection('myprofile').findOne();

    const title = "Profile Page";
    res.render('profile', {title, profiles});
})

// De route voor de editpagina
app.get('/edit', async (req, res) => {
    // Het profiel wordt uit de database gehaald zodat deze ingevuld kan worden in de invoervelden, zodat de gebruiker deze niet allemaal opnieuw hoeft in te vullen
    const profiles = await db.collection('myprofile').findOne();

    const title = "Profile Editor";
    res.render('edit', {title, profiles, interests});
})

// Met deze post route wordt het bewerkte profiel verstuurd naar de database
app.post('/edit', async (req, res) => {
    // Alle onderdelen van het formulier (met bewerkingen) worden opnieuw opgehaald door middel van de BodyParser van express en samengevoegd in een variabele
    let profile = {
        url: req.body.avatar || req.body.original_image,
        name: req.body.name,
        age: req.body.age,
        country: req.body.country,
        bio: req.body.bio,
        interests: arrayify(req.body.interests),
        url_a: req.body.avatar_a || req.body.original_image_a,
        name_a: req.body.name_a,
        age_a: req.body.age_a,
        type_a: req.body.type_a,
        breed_a: req.body.breed_a,
        bio_a: req.body.bio_a
    };

    // Het aangepaste profiel moet het oude profiel vervangen, dit wordt gedaan met de replaceOne functie    
    const query = {};
    await db.collection('myprofile').replaceOne(query, profile);

    // Het aangepaste proifel wordt gezocht in de database zodat deze weer op de profielpagina laten zien kan worden
    const profiles = await db.collection('myprofile').findOne();

    const title = "Succesfully Edited Profile Page!";
    res.render('profile', {title, profiles});
})


////////////////
// Error Page //
////////////////

// De route voor de error status 404 wordt aangemaakt, wanneer er een verkeerde route in de url wordt ingevuld wordt deze pagina laten zien
app.use((req, res, next) => {
    console.log("Error 404");
    const title = "Error 404";
    res.status(404).render('404', {title});
})

/////////////////////////
// Connect to database //
/////////////////////////

// Er wordt een connectie gemaakt met de database van MongoDB, de variabelen zoals DB_URI & NAME worden uit de .env file gehaald
// Bron: https://github.com/cmda-bt/be-course-21-22/blob/main/examples/mongo_example/server.js
async function connectDB() {
    const uri = process.env.DB_URI;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    try {
        await client.connect();
        db = client.db(process.env.DB_NAME);
    } catch (error) {
        throw error;
    }
}

//////////////////
// Start Server //
//////////////////

// De server wordt opgestart, hierbij wordt de port waarop deze wordt gehost gelogt in de console, en wordt er gecheckt of de database is geconnect, waarna de gebruiker ook hierover wordt ingelicht via de console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

    connectDB().then(() => console.log('We have a connection to Mongo!'));
})



// Ik wilde ook graag een foto upload-functie erin verwerken, maar ben hier uiteindelijk helaas niet uitgekomen... Het was me toch iets te moeilijk, ik heb nu dus gewoon een dummyfoto gebruikt bij de profielfoto,
// en bij het fotoupload knopje heb ik het wel voor elkaar gekregen dat je deze geuploade foto kan zien. Deze wordt dan uiteraard niet op de server opgeslagen en is daardoor ook niet zichtbaar op het uiteindelijke profiel
// Ik hoop dat desalniettemin mijn functie goed genoeg is!