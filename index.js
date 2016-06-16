'use strict';

const express = require('express'),
    app = express(),
    manila = require('manila')();

app
    .use('/assets', express.static('assets'))
    
    .engine('mnla', manila)
    .set('view engine', 'mnla')
    
    .get('/', require('./controllers/index'))
    .get('/shop', require('./controllers/shop'))
    
    .listen(1337, () => {
        console.log('Listening on localhost:1337');
    });