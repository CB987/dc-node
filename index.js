require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

//serves files from 'public' folder as though it was the root
app.use(express.static('public'));
// configure body=parser to read data sent by html form tags
app.use(bodyParser.urlencoded({ extended: false }));
//configure body-parser to read JSON bodies
app.use(bodyParser.json());

const User = require('./models/User');
const page = require('./views/page');
const userList = require('./views/userList');
const todoList = require('./views/todoList');
const userForm = require('./views/userForm');
const registrationForm = require('./views/registrationForm');
const loginForm = require('./views/loginForm');
//EXPRESS

// User.add('jimi h', 'jimi', 'guitar');

app.get('/', (req, res) => {
    const thePage = page('helloooooo')
    res.send(thePage);
})

//listen for a get request (retrieve)
app.get('/users', (req, res) => {
    User.getAll()
        .then(allUsers => {
            // res.send(allUsers);
            const usersUL = userList(allUsers);
            const thePage = page(usersUL);
            // console.log(thePage);
            res.send(thePage);
            // res.send(page(userList(allUsers)));
        })
});

//listen for POST requests (create)
app.post('/users', (req, res) => {
    console.log(req);
    // console.log(req.body);
    // res.send('ok');
    const newUsername = req.body.name;
    console.log(newUsername);
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});

//USER REGISTRATION
app.get('/register', (req, res) => {
    //send them the signup form
    const theForm = registrationForm();
    const thePage = page(theForm);
    res.send(thePage);
    // res.send(page(registrationForm()));
});
app.post('/register', (req, res) => {
    //process the signup form
    //grab values out of req.body
    const newName = req.body.name;
    const newUsername = req.body.username;
    const newPassword = req.body.password;

    // console.log(newName);
    // console.log(newUsername);
    // console.log(newPassword);
    // call user. add 
    User.add(newName, newUsername, newPassword)
        .then(newUser => {
            // if that works, redirect to welcome page
            res.redirect('/welcome');

        });
});
app.get('/welcome', (req, res) => {
    //send them the welcome page
    res.send(page('<h1>congrats, you\'re in!</h1>'));
});

//USER LOGIN
app.get('/login', (req, res) => {
    const theForm = loginForm();
    const thePage = page(theForm);
    res.send(thePage);
});
app.post('/login', (req, res) => {
    debugger;

    //process login form
    //grab values from form
    const loginUsername = req.body.username;
    const loginPassword = req.body.password;
    console.log(loginUsername);
    User.getByUsername(loginUsername)

        .then(user => {
            console.log(user);
            return user;
        })
        .catch(err => {
            console.log(err);
            res.redirect('/login');
        })
        .then(theUser => {
            const didMatch = bcrypt.compareSync(loginPassword, theUser.pwhash);
            if (didMatch) {
                res.redirect('/welcome');
            } else {
                res.redirect('/login');
            }
        })
    //find a user whose name matches loginUsername//
    //if find a matching user, check to see if password matches

    //     res.redirect(`./id/:$1/todos`, [this.id])
    // })
});










app.get('/users/:id([0-9]+)', (req, res) => {
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                mesage: 'no soup for you'
            });
        })
        .then(theUser => {
            res.send(theUser);

        })
});

//technically an update, not a create, but using POST bc html cannot send PUT or DELETE, only GET and POST. could also use ajax.
//GET the form for editing one user's info
app.get('/users/:id([0-9]+)/edit', (req, res) => {
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            });
        })
        .then(theUser => {
            res.send(page(userForm(theUser)));
        })
});

app.post('/users/:id([0-9]+)/edit', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;

    //Get the user by their id
    User.getById(id)
        .then(theUser => {
            //call that user's updateName method
            theUser.updateName(newName)
                .then(didUpdate => {
                    if (didUpdate) {
                        res.redirect(`/users/`)
                    } else {
                        res.send('boo');
                    }
                    // }
                });
        });
});











app.get('/users/:id([0-9]+)', (req, res) => {
    // console.log(req.params.id);
    User.getById(req.params.id)
        .catch(err => {
            res.send({
                message: `no soup for you`
            })
                .then(theUser => {
                    res.send(page(userForm(theUser)));
                })
        })
    // res.send('ok');
});


app.get(`/users/:id(\\d+)/todos`, (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTodos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUL);
                    res.send(thePage);
                })
        })
});

app.get('/users/register', (req, res) => {
    User.getById(req.params.id)
        .then(user => {
            user.updateName(req.params.newName)
                .then(() => {
                    res.send('you just renamed them!');
                })
        })
});

app.listen(3000, () => {
    console.log('express is ready');
});