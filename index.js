require('dotenv').config();
const express = require('express');
const app = express();

const bodyParser = require('body-parser');
// configure body=parser to read data sent by html form tags
app.use(bodyParser.urlencoded({ extended: false }));
//configure body-parser to read JSON bodies
app.use(bodyParser.json());

const Todo = require('./models/Todo');
const User = require('./models/User');

//EXPRESS
app.listen(3000, () => {
    console.log('express app ready');
})

//listen for a get request
app.get('/users', (req, res) => {
    // res.send('Hjnajfkdsnvsldkfjnesld');
    User.getAll()
        .then(allUsers => {
            // .then(allUsers => {
            //     console.log(allUsers);
            res.send(allUsers);
            // res.status(200).json(allUsers);
        })
});

// app.get('/users/:id(\\d+)', (req, res) => {
//     console.log(req.params.id);
//     User.getById(req.params.id)
//         .then(theUser => { 
//             res.send(theUser);
//         })
//         .catch(err => {
//             res.send({
//                 message: `no soup for you`
//             });
//         })
//     // res.send('ok');
// });

// app.get('/todos', (req, res) => {
//     // res.send('redjnskfrjgnrf');
//     Todo.getAll()
//         .then(allTodos => {
//             res.send(allTodos);
//             // res.status(200).json(allTodos);
//         })
// })

// app.get('/todos/:id(\\d+)', (req, res) => {
//     // console.log(req.params.id);
//     Todo.getbyId(req.params.id)
//         .then(todo => {
//             res.send(todo.name);
//         })
// })

//example of sending whole page
//     res.send(allUsers) })
// app.get('/users', (req, res) => {
//     // res.send('Hjnajfkdsnvsldkfjnesld');
//     User.getAll()
//         .then(allUsers => {
//             let usersList = ``;
//             allUsers.forEach(user => {
//                 usersList += `<li>${user.name}</li>`
//             });
//             let thePage = `
//                         <!doctype>
//                         <html>
//                         <head>
//                         </head>
//                         <body>
//                             <h1>heyya</h1>
//                             <ul>
//                             ${usersList}
//                             </ul>
//                             </body>
//                         </html>`;
//             res.send(thePage);
//         });
// })

//listen for POST requests
app.post('/users', (req, res) => {
    console.log(req.body);
    // res.send('ok');
    const newUsername = req.body.name;
    console.log(newUsername);
    User.add(newUsername)
        .then(theUser => {
            res.send(theUser);
        })
});

app.post('/users/:id(\\d+', (req, res) => {
    const id = req.params.id;
    const newName = req.body.name;
    console.log(id);
    console.log(newName);
    // res.send('ok');

    //Get the user by their id
    User.getById(id)
        .then(theUser => {
            //call that user's updateName method
            theUser.updateName(newName)
                .then(result => {
                    res.send('geriufjknsdmcx');
                })
        })

});

//RETREIVE MANY OR ONE
// User.getTodosForUser(3)
//     .then(result => { console.log(result); })

//example of grabbing one row

// Todo.getbyId(2)
//     .then(results => {
//         console.log(results)
//     })

// getbyId(20)
//     .then(results => {
//         console.log(results)
//     })

//CREATE
// Todo.add('homework', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })

//DELETE
// deleteByID(4)
//     .then(result => {
//         console.log(result);
//     })

//UPDATE
// Todo.markPending(6)
//     .then(result => {
//         console.log(result);
//     })s
// let newUsers = [
//     'buffy',
//     'willow',
//     'xander',
//     'giles',
// ]


// newUsers.forEach(u => {
//     User.add(u)
//         .then(aNewUser => {
//             aNewUser.addTodo('dothething');
//         })
// })

// User.add('clare')
//     .then(what => {
//         console.log(what);
//     })

// User.getById(17)
//     .then(userFromDB => {
//         return userFromDB.getTodos()
//     })
//     .then(todos => {
//         console.log(todos);
//     });

// User.getAll()
//     .then(allUsers => {
//         allUsers.forEach(user => {
//             console.log(user.name, user.id);
//         })
//     })

// User.searchByName('ylin')
//     .then(users => {
//         console.log(users);
//     });

// User.updateName(14, 'steven');

// const task = new Todo(17, 'do something');
// walk.assignToUser(1, 17);
// task.assignToUser(22)


// Todo.add('walk dog', false)
//     .then(task => {
//         task.assignToUser(22);
//     })

// Todo.getbyId(6)
    // .then(task => {
        //     //     console.log(task.name)
        //     // })
        //     // .then(name => name.updateName('eat supper'));
        // task.assignToUser(15);
        // task.updateCompleted()
        // task.markCompleted()
        // task.markPending()
        // task.deleteByID()

    // });

//     .then(task => {
//         // console.log(task);
//         task.getTodosForUser(3);
// })
//     .then(newTask => console.log(newTask))

// Todo.getTodosForUser(22)
//     .then(t => console.log(t));


// Todo.deleteByID(8);

// Todo.getAll()