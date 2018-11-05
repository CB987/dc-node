const pgp = require('pg-promise')();
const db = pgp({
    host: 'localhost',
    port: 5432,
    database: 'node-todo-app-db'
});

//CREATE
function add(name, completed) {
    return db.one(`insert into todos (name, completed) 
    values
        ($1, $2)
        returning id
        `, [name, completed]);
}

//RETREIVE MANY OR ONE
function getALL() {
    return db.any('select * from todos');
}

function getbyId(id) {
    return db.one(`select * from todos where id = $1`, [id])
        .catch(err => {
            return {
                name: 'no todo found'
            };
        })
}

//UPDATE
function updateName(id, name) {
    return db.result(`update todos 
    set name = $2
    where id = $1;`, [id, name]);
}

updateName(2, 'zumba')
    .then(result => {
        console.log(result);
    })

function updateCompleted(id, didComplete) {
    return db.result(`update todos 
    set completed =$2
    where id=$1`, [id, didComplete]);
}

function markCompleted(id) {
    // return updateCompleted(id, true);
    return db.result(`update todos set completed = $2 where id = $1`, [id, true]);
}

function markPending(id) {
    // return updateCompleted(id, false);
    return db.result(`update todos set completed = $2 where id=$1`, [id, false]);
}

//DELETE
function deleteByID(id) {
    return db.result(`delete from todos where id = $1`, [id]);
}

module.exports = {
    add,
    getALL,
    getbyId,
    updateName,
    markCompleted,
    markPending,
    deleteByID,
}