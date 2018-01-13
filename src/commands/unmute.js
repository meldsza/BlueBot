const config = require('./../config'); //loads the stored config
const log = require('./../lib/log'); //loads the action log utility
module.exports = {
    description: "Unmutes a person",
    syntax: `${config.identifier}unmute <user mention> <reason>`,
    execute: (params, message) => {
        let role = message.guild.roles.find(r => r.name.toLowerCase().includes("muted"));
        let member = message.mentions.members.first();
        params.shift();
        if (member.roles.get(role.id)) {
            member.removeRole(role)
            message.reply(`Unmuted ${member.user} because ${params.join(" ")}`)
            log(member.user, message.author, "Unmuted", params.join(" "), message.guild)
        }
        else
            message.reply(`${member.user} was not muted or is already unmuted`)
    },
    min_params: 2,
    permission: "KICK_MEMBERS"
}