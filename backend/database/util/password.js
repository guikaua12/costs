const bcrypt = require('bcrypt');

async function hash(password) {
    const salt = await bcrypt.genSalt(13);
    return await bcrypt.hash(password, salt);
}

async function match(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = {
    hash,
    match
}