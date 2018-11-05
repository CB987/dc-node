const Todo = require('./models/Todo');
const User = require('./models/User');

//RETREIVE MANY OR ONE
User.getAll()
    .then(results => {
        console.log(results);
        console.log('ufbfksjnkx,dex')
    })
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