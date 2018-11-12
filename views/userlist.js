function userToItem(userObject) {

    return `
    <li class="user-list-item">
        <a href="/users/${userObject.id}/todos">
            ${userObject.name}</a>
            <a href="/users/${userObject.id}/edit">(edit)</a>
    </li>
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
    console.log(userItems);
    /* 
    ['<li>nameOne</li>']
        
     */
    return `
        <ul>${userItems}</ul>
    `;
}

module.exports = userList;