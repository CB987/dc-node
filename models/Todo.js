const db = require('./db');

class Todo {
    constructor(id, name, completed) {
        this.id = id;
        this.name = name;
        this.completed = completed;
    }
    //CREATE class method
    static add(name, completed) {
        return db.one(`insert into todos (name, completed) values ($1, $2) returning id`, [name, completed])
            .then(data => {
                const u = new Todo(data.id, name, completed);
                return u;
            });
    }

    //ReTRIEVE class method
    static getALL() {
        return db.any('select * from todos');
    }

    static getbyId(id) {
        return db.one(`select * from todos where id = $1`, [id])
            .then(result => {
                const t = new Todo(result.id, result.name, result.completed);
                return t;
            })
            .catch(err => {
                return {
                    name: 'no todo found'
                };
            })
    }

    getTodosForUser(id) {
        return db.any(`
        select * from todos w
        where user_id - $1`, [this.id]);
    }

    //UPDATE class method
    assignToUser(userId) {
        return db.result(`update todos
    set user_id = $2
    where id = $1`, [this.id, userId]);
    }

    updateName(name) {
        this.name = name;
        return db.result(`
        update todos 
        set name=$2
        where id=$1`, [this.id, name]);
    }

    updateCompleted(id, didComplete) {
        return db.result(`update todos 
        set completed =$2
        where id=$1`, [id, didComplete]);
    }

    markCompleted(id) {
        // return updateCompleted(id, true);
        return db.result(`update todos set completed = $2 where id = $1`, [id, true]);
    }

    markPending(id) {
        // return updateCompleted(id, false);
        return db.result(`update todos set completed = $2 where id=$1`, [id, false]);
    }

    //DELETE class method
    static deleteByID(id) {
        return db.result(`delete from todos where id = $1`, [id]);
    }
}




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

function getTodosForUser(id) {
    return db.any(`
    select * from todos w
    where user_id - $1`, [id]);
}

//UPDATE
function assignToUser(todoId, userId) {
    return db.result(`update todos
    set user_id = $1
    where id = $2`, [todoId, userId]);
}

function updateName(id, name) {
    return db.result(`update todos 
    set name=$2
    where id=$1`, [id, name]);
}

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

module.exports = Todo;

    //     add,
    //     getALL,
    //     getbyId,
    //     updateName,
    //     markCompleted,
    //     markPending,
    //     deleteByID,
    //     assignToUser,
    //     getTodosForUser,
