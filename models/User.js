const db = require('./db');




//CREATE (class method)
//declare a class namesd 'user'
class User {
    //what properties should a user strt off with?
    constructor(id, name) {
        //constructor is a method that is automatially called when you create a user. define properties that are also the names of the database columns.
        this.name = name;
        this.id = id;
    }


    static add(name) {
        return db.one(`
        insert into users (name) values ($1) returning id`, [name])
            .then(data => {
                const u = new User(data.id, name);
                return u;
            });
    }
    //a method is a function that "belongs" to an object
    // greet(otherUser) {
    //     console.log(`Hello ${otherUser.name}, I am ${this.name}`);
    // }
    //RETRIEVE (class method)

    static getById(id) {
        return db.one('select * from users where id = $1', [id])
            .then(result => {
                const u = new User(result.id, result.name);
                return u;
            })
    }

    static getAll() {
        return db.any(`
        select * from users
        `).then(userArray => {
                //transform array of objects into array of User instances
                let instanceArray = userArray.map(userObj => {
                    let u = new User(userObj.id, userObj.name);
                    return u;
                });
                return instanceArray;
            })
    }

    getTodos() {
        return db.any('select * from todos where user_id = $1', [this.id]);
    }

    static searchByName(name) {
        return db.any(`select * from users
            where name ilike '%$1:raw%'`, [name]);
    }
    //UPDATE (class method)
    static updateName(id, name) {
        return db.result(`update users set name = $2 where id=$1`, [id, name])
    }
    updateMyName(name) {
        this.name = name;
        return db.result(`update users set name = $2 where id=$1`, [this.id, name])
    }

    addTodo(id, task) {
        return db.result(`update todos `)
    }
    //DELETE (class method)
    static deleteByID(id) {
        return db.result(`delete from users where id = $1`, [id]);
    }

    delete() {
        return db.result(`delete from users where id = $1`, [this.id]);
    }
}
//CREATE
function add(name) {
    return db.one(`insert into users (name) 
    values
        ($1)
        returning id
        `, [name]);
}

//RETREIVE
function getAll() {
    return db.any(`select * from users`);
}

function getById(id) {
    return db.one(`select * from users where id = $1`, [id]);
}

//UPDATE
function updateName(id, name) {
    return db.result(`update users set name = $2 where id=$1`, [id, name])
}

//DELETE
function deleteByID(id) {
    return db.result(`delete from users where id = $1`, [id]);
}

// module.exports = {
//     add,
//     deleteByID,
//     getAll,
//     getById,
//     updateName,
// }

module.exports = User;