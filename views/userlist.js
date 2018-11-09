function userToItem(UserObject) {

    return `
    <li>${userObject.name}</li>
    `;
}

function userList(arrayOfUsers) {

    /*
       [
           {name: 'nameOne'} 
           {name: 'nameOne'}
           {name: 'nameOne'} 
           {name: 'nameOne'} 
       ]
       */
    const userItems = arrayOfUsers.map(userToItem).join('');
    /* 
    ['<li>nameOne</li>']
        
     */
    return `
        <ul>${userItems}</ul>
    `;
}

module.exports = userList;