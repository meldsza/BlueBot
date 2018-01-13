const Discord = require('discord.js');
const config = require('./config');

if (!config.clientOptions)
    config.clientOptions = {};

if (!config.clientOptions.disabledEvents)
    config.clientOptions.disabledEvents = ["TYPING_START", "VOICE_SERVER_UPDATE", "VOICE_STATE_UPDATE"];
config.clientOptions.disableEveryone = true;

const client = new Discord.Client(config.clientOptions);

var dt = config.token || process.env.DISCORD_TOKEN || process.argv[2];

if (!dt) {
    console.log('required DISCORD_TOKEN env variable or argument');
}

client.login(dt);

module.exports = client;

/**
 * Just some anti crash code below
 */

client.on('error', e => {
    console.error(e);
});
client.on('unhandledRejection', (err) => {
    console.log("unhandledRejection in bot : " + err.stack)
    if (err.toString().includes("hangup"))
        process.exit(1);
});
process.on('unhandledRejection', (err) => {
    console.log("unhandledRejection in process : " + err.stack)
    if (err.toString().includes("hangup"))
        process.exit(1);
});
client.on('uncaughtException', (err) => {
    console.log("uncaughtException in bot : " + err.stack)
});
process.on('uncaughtException', (err) => console.log("UNHANDLED EXCEPTION : " + err.stack));


