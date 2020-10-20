const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');

console.log(path.join(__dirname, './templates/partials'));
const app = express();
const port = process.env.PORT || 2020
const publicDirectory = path.join(__dirname, '../public');
const templateDirectory = path.join(__dirname, './templates/views');
const partialsDirectory = path.join(__dirname, './templates/partials');

app.set('view engine', 'hbs');
app.set('views', templateDirectory);
hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectory));

app.get('/weather', (request, response) => {
    // response.render('index', {
    //     title: 'weather',
    //     name: 'h'
    // })

    if (!request.query.address) {
        return response.send({
            error: ' you must provide an address !!!'
        })
    }
    geocode(request.query.address, (error, data) => {
        console.log('fff', error);
        if (error) {
            return response.send(error)
        }

        response.send({
            forecast: data.list[0].weather[0].description,
            location: request.query.address
        })

    })
    // response.send({
    //     forecast: 'its foggy',
    //     location:request.query.address
    // })
});

app.get('/', (request, response) => {
    response.render('index', {
        title: 'weather ',
        name: 'hosein'
    })

});

app.get('/about', (request, response) => {

    response.render('about', {
        title: 'weather / about',
        name: 'hosein'
    })
});

app.get('/help', (request, response) => {
    response.render('help', {
        title: 'weather / help',
        name: 'hosein'
    })
    // response.send('help')
});

app.get('*', (request, response) => {
    response.render('errorPage', {
        title: '404 not found',
        name: ' this page is not found'
    })
    // response.send('404   NOT FOUND')
});

app.listen(port, () => {
    console.log('server is running ! port :' + port)

});
