const config = require('./../config'); //loads the stored config
module.exports = {
    description: "Says hello",
    syntax: `${config.identifier}hello`,
    execute: (params, message) => {
        message.reply("Hello")
    }
}