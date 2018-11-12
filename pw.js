const bcrypt = require('bcrypt');
const saltRounds = 10;
var salt = bcrypt.genSaltSync(saltRounds);
var hash = bcrypt.hashSync('poopface', salt);
console.log(hash);

const didMatch = bcrypt.compareSync('poopface', '$2b$10$PuaY9PEGMkGddMOomFlc9uGEDAJztc8V4Cc/Mw5blnXt702VYZNvW');

// if (didMatch = )