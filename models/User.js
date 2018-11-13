const db = require('./db');
const bcrypt = require('bcrypt');
const saltRounds = 10;

//CREATE (class method)
//declare a class named 'user'
class User {
    //what properties should a user strt off with?
    constructor(id, name, username, pwhash) {
        //constructor is a method that is automatially called when you create a user. define properties that are also the names of the database columns.
        this.id = id;
        this.name = name;
        this.username = username;
        this.pwhash = pwhash;
    }

    static add(name, username, password) {
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        return db.one(`
        insert into users 
            (name, username, pwhash) 
        values 
            ($1, $2, $3) 
        returning id, name`, [name, username, hash])
            .then(data => {
                const u = new User(data.id, name, username);
                return u;
            });
    }
    //a method is a function that "belongs" to an object
    // greet(otherUser) {
    //     console.log(`Hello ${otherUser.name}, I am ${this.name}`);
    // }
    //RETRIEVE (class method)

    static getById(id) {
        return db.one(`select * from users where id = $1`, [id])
            .then(result => {
                const u = new User(result.id, result.name, result.username);
                return u;
            })
        // .catch(err => {
        //     return err;
        // })
    }

    static getAll() {
        return db.any(`
        select * from users order by id
        `).then(userArray => {
                //transform array of objects into array of User instances
                let instanceArray = userArray.map(userObj => {
                    let u = new User(userObj.id, userObj.name);
                    return u;
                });
                return instanceArray;
            })
    }

    static getByUsername(username) {
        return db.one(`
        select * from users where username ilike '%$1:raw%'
        `, [username]).then(result => {
                return new User(result.id, result.name, result.username, result.pwhash);
            })
    }

    passwordDoesMatch(loginPassword) {
        const didMatch = bcrypt.compareSync(loginPassword, this.pwhash);
        return didMatch;
    }


    getTodos() {
        return db.any(`select * from todos where user_id = $1`, [this.id]);
    }

    static searchByName(name) {
        return db.any(`select * from users
            where name ilike '%$1:raw%'`, [name]);
    }
    //UPDATE (class method)
    // static updateName(id, name) {
    //     return db.result(`update users set name = $2 where id=$1`, [id, name])
    // }
    updateName(name) {
        this.name = name;
        return db.result(`update users set name = $2 where id=$1`, [this.id, name])
            .then(result => {
                return result.rowCount === 1;
            })
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
module.exports = User;
// //CREATE
// function add(name) {
//     return db.one(`insert into users (name) 
//     values
//         ($1)
//         returning id
//         `, [name]);
// }

// //RETREIVE
// function getAll() {
//     return db.any(`select * from users`);
// }

// function getById(id) {
//     return db.one(`select * from users where id = $1`, [id]);
// }

// //UPDATE
// function updateName(id, name) {
//     return db.result(`update users set name = $2 where id=$1`, [id, name])
// }

// //DELETE
// function deleteByID(id) {
//     return db.result(`delete from users where id = $1`, [id]);
// }

// module.exports = {
//     add,
//     deleteByID,
//     getAll,
//     getById,
//     updateName,
// }
