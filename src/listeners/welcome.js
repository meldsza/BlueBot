/**
 * Welcomes users to the guild
 * Event: guildMemberAdd
 */

const config = require('./../config'); //loads the stored config

module.exports = function (member) {
    if (config.welcome && config.welcome.includes(member.guild.id)) {
        user.send(`
            Welcome to The Blue Entertainment. Please visit us at https://www.thebluecommunity.com
            `);
    }
}