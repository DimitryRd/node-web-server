const express = require('express');
const hbs = require('hbs')

var app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomePhrase: "Welcome to new comers",
        name: "Dimitry",
        likes: [
            'Biking',
            'Cities'
        ],
        year: new Date().getFullYear()
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    })
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Bad request'
    })
});

app.listen(3000, () =>{
    console.log('Server is up on port 3000');
});