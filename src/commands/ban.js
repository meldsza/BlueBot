const config = require('./../config'); //loads the stored config
const log = require('./../lib/log'); //loads the action log utility
module.exports = {
    description: "Bans a person",
    syntax: `${config.identifier}ban <user mention> <reason>`,
    execute: (params, message) => {
        let member = message.mentions.members.first();
        params.shift();
        member.ban({ reason: params.join(" ") })
        message.reply(`Unmuted ${member.user} because ${params.join(" ")}`)
        log(member.user, message.author, "Unmuted", params.join(" "), message.guild)
    },
    min_params: 2,
    permission: "BAN_MEMBERS"
}