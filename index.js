require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(express.static('public')); //serves files from 'public' folder as though it was the root

// configure body=parser to read data sent by html form tags
app.use(bodyParser.urlencoded({ extended: false }));
//configure body-parser to read JSON bodies
app.use(bodyParser.json());

const User = require('./models/User');
const page = require('./views/page');
const userList = require('./views/userList');
const todoList = require('./views/todoList');
const userForm = require('./views/userForm');
//EXPRESS

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
            console.log(thePage);
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

//technically an update, not a create, but using POST bc html cannot send PUT or DELETE, only GET and POST. could also use ajax.
app.post('/users/:id([0-9]+)/edit', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    //Get the user by their id
    User.getById(id)
        .then(theUser => {
            //call that user's updateName method
            theUser.updateMyName(newName)
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

app.get(`/users/:id(\\d+)/todos`, (req, res) => {
    User.getById(req.params.id)
        .then(theUser => {
            theUser.getTodos()
                .then(allTOdos => {
                    const todosUL = todoList(allTodos);
                    const thePage = page(todosUS);
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