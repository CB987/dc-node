const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});

//RETREIVE MANY OR ONE
function getALL() {
    return db.any('select * from todos')
}

// getALL()
//     .then(results => {
//         console.log(results);
//         // console.log('ufbfksjnkx,dex')
//     })
//example of grabbing one row
function getbyId(id) {
    return db.one(`select * from todos where id = $1`, [id])
        .catch(err => {
            return {
                name: 'no todo found'
            };
        })
}

// getbyId(2)
//     .then(results => {
//         console.log(results)
//     })

// getbyId(20)
//     .then(results => {
//         console.log(results)
//     })

//CREATE
function add(name, completed) {
    return db.one(`insert into todos (name, completed) 
    values
        ($1, $2)
        returning id
        `, [name, completed])
}

// add('homework', false)
//     .catch(err => {
//         console.log(err);
//     })
//     .then(result => {
//         console.log(result);
//     })

//DELETE
function deleteByID(id) {
    return db.result(`delete from todos where id = $1`, [id]);
}

// deleteByID(4)
//     .then(result => {
//         console.log(result);
//     })

//UPDATE
function updateCompleted(id, didComplete) {
    return db.result(`update todos 
    set completed =$2
    where id=$1`, [id, didComplete])
}

function markCompleted(id) {
    return updateCompleted(id, true);
    // return db.result(`update todos set completed = $2 where id = $1`, [id, true]);
}

function markPending(id) {
    return updateCompleted(id, false);
    // return db.result(`update todos set completed = $2 where id=$1`, [id, false]);
}

function updateName(id, name) {
    return db.result(`update todos set name = 'walk all the dogs' where id = $1;`, [id]);
}

markPending(1)
    .then(result => {
        console.log(result);
    })