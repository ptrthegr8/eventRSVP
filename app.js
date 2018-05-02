var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
//mongoose.connect('mongodb://localhost/rsvp');
const db = mongoose.connection;

var Schema = mongoose.Schema;

// Defines the scehma we want our RSVP documents to take
var rsvpSchema = new Schema({
    name: String,
    email: String,
    attending: Boolean,
    guests: Number
})

// Sets up the document model
var Response = mongoose.model('response', rsvpSchema);
//
const dbName = "rsvp";
const dbUser = "admin";
const dbPwd = "admin";
const dbURI = "ds211440.mlab.com:11440";
const PORT = process.env.PORT || 3000;

//
var app = express();
app.use(express.static("./public"));
app.use(bodyParser.urlencoded({
    extended: false
}));

app.set('view engine', 'pug')

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/guests', (req, res) => {
    Response.find((err, responses) => {
        if (err) return console.error(err);
        res.render('guests', {
            responses: responses
        });
    })
});

app.post('/reply', (req, res) => {
    var rsvp = new Response({
        name: req.body.name,
        email: req.body.mail,
        attending: req.body.attending,
        guests: Number(req.body.guests)
    })
    rsvp.save((err, rsvp) => {
        if (err) return console.error(err);
        // client.close()
    })

    res.render('thanks');
});

app.listen(PORT, () => {
    //mongoose.connect('mongodb://localhost/rsvp');
    mongoose.connect(`mongodb://${dbUser}:${dbPwd}@${dbURI}/${dbName}`);
    console.log(`listening on http://localhost:${PORT}`)
});