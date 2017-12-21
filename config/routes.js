var homeController = require('../app/controllers/homeController');
var userController = require('../app/controllers/userController');
var computerController = require('../app/controllers/computerController');

module.exports = function (app, passport) {

    app.get('/login', homeController.login);
    app.get('/signup', homeController.signup); 
    
    app.get('/', homeController.loggedIn, homeController.home);
    app.get('/liste-adherants', homeController.loggedIn, userController.list);
    app.get('/liste-ordinateurs', homeController.loggedIn, computerController.list);
    app.get('/edit/ordinateur/:id', homeController.loggedIn, computerController.showEdit)
    app.get('/edit/utilisateur/:id', homeController.loggedIn, userController.showEdit);

    app.post('/adduser',homeController.loggedIn,  userController.add);
    app.post('/postedit/:id', homeController.loggedIn,computerController.edit);
    app.post('/addcomputer', homeController.loggedIn, computerController.add);
    app.post('/delete/computer/:id', homeController.loggedIn, computerController.delete);
    app.post('/postedit/utilisateur/:id', homeController.loggedIn, userController.edit);
    app.post('/delete/utilisateur/:id',homeController.loggedIn,  userController.delete);
    app.post('/inactive/:id', homeController.loggedIn, computerController.inactive);

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '//liste-ordinateurs', 
        failureRedirect: '/signup', 
        failureFlash: true
    }));
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/liste-ordinateurs', 
        failureRedirect: '/login', 
        failureFlash: true 
    }));
}
