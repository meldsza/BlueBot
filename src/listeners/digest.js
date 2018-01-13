/**
 * Digests the message and executes commands
 * Event: message
 */

const config = require('./../config'); //loads the stored config
const commands = require('./../commands/commands'); //loads the commands

module.exports = message => {

    if (
        message.author.bot //Dont listen to Bot messages
        && !config.bots.includes(message.author.id) // unless the bot that ran this command is in the list of allowed bots
    )
        return;

    //Check if bot is locked (The bot is only acessible to the people listed as admins)
    if (config.lock && !config.admins.includes(message.author.id))
        return;

    //Parse command
    let params = false;
    let cmd = false;
    if (message.content.startsWith(config.identifier)) {
        /**Extracting params */
        params = message.content.substring(config.identifier.length).trim();
        params = params.split(' ');

        cmd = params.shift().trim(); //get command name
    }
    else if (message.mentions.users.has(message.client.user)) {
        /**Remove mention and extract params */
        params = message.content.split(' ');
        params = params.filter(p => !p.includes(message.client.user.id))
        cmd = params.shift().trim(); //get command name
    }

    //execute command if it exists
    if (commands[cmd]) {
        if (commands[cmd].min_params && commands[cmd].min_params > params.length)
            message.reply(`Too less arguments provided. The syntax is:\n${commands[cmd].syntax}`);
        else if (!commands[cmd].permission)
            commands[cmd].execute(params, message)
        else if (message.member.permissions.has(commands[cmd].permission))
            commands[cmd].execute(params, message)
        else
            message.reply("You do not have permission to execute this command")
    }
}
