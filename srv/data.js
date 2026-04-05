const clone = require('clone');
const { v4:uuidv4 } = require('uuid');
const kv30 = require('kv30');

let users = [];

async function init () {
  await kv30.init();
  users = await kv30.get('users'); // array
}



//////////////////////////////////////////////////////////////////////////////
//
// USER
//
//////////////////////////////////////////////////////////////////////////////

function getUsers() {
  return clone(users);
}

function getUsers_changeable() {
  return users;
}




module.exports = {
    init, //async

    getUsers,
    getUsers_changeable,
}