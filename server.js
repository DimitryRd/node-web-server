const express = require('express');
const hbs = require('hbs');
const loremIpsum = require('lorem-ipsum'), output = loremIpsum();
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();


hbs.registerPartials(__dirname + "/views/partials");
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) =>{
   var now = new Date().toString();
   var log = `${now}: ${req.method} ${req.url}`
   console.log(log);
   fs.appendFile('server.log', log + '\n', (err) =>{
       if(err){
           console.log('Unable to append to server.log')
       }
   });
    next();
});

// app.use((req, res, next) => {
//    res.render('maintenance.hbs', {
//        pageTitle: output
//    });
//    next();
// });

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomePhrase: "Welcome to new comers",
        name: "Dimitry",
        likes: [
            'Biking',
            'Cities'
        ],
        year: new Date().getFullYear(),
        text: output

    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear(),
        text: output
    })
});

app.get('/maintenance', (req, res) => {
    res.render('maintenance.hbs', {
        pageTitle: 'Maintenance',
        currentYear: new Date().getFullYear(),
        text: output
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    })
});

app.listen(port, () =>{
    console.log(`Server is up on port ${port}`);
});