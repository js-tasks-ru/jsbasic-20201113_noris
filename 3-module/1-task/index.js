/**
 * @param   {{ name: string, age: number }[]} users
 * @returns {string[]}  объект
 */
function namify(users) {
  // ваш код...
  let usersName = users.map( user => user.name)

  return usersName;
}
