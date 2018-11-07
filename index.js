require('dotenv').config();

const Todo = require('./models/Todo');
const User = require('./models/User');

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
let newUsers = [
    'buffy',
    'willow',
    'xander',
    'giles',
]


// newUsers.forEach(u => {
//     User.add(u)
//         .then(aNewUser => {
//             aNewUser.addTodo('dothething');
//         })
// })

// User.add('clare')
//     .then(id => {
//         console.log(id);
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

// clare.getTodos()
//     .then(result => { console.log(result); })

// Todo.add('walk dog', false)
//     .then(task => {
//         task.assignToUser(22);
//     })
Todo.getbyId(4)
    .then(task => {
        task.updateName('sleep some');
    })
    .then(newTask => console.log(newTask))


// Todo.deleteByID(7);