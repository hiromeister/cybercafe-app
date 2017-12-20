
var homeController = require('../app/controllers/homeController');
var userController = require('../app/controllers/userController');
var computerController = require('../app/controllers/computerController');

//you can include all your controllers

module.exports = function (app, passport) {

    /*app.get('/login', home.login);
    app.get('/signup', home.signup); */

   /* app.get('/', home.loggedIn, home.home);//home
    app.get('/home', home.loggedIn, home.home);//home */
    
    app.get('/', homeController.home);
    app.get('/liste-adherants', userController.list);
    app.get('/liste-ordinateurs', computerController.list);
    app.get('/show-attribution/:id', computerController.showAttribution)

    app.post('/adduser', userController.add);
    app.post('/addcomputer', computerController.add);
    app.post('/attribution/:id', computerController.attribution )

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


}
