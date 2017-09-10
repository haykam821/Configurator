var fs = require('fs');
var yaml = require('js-yaml');

exports.onMessageReceived = (function Version(bot, doc, user, userID, channelID, message, event) {
  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "prefix ")) {
    if (message.split(" ")[1] === doc.prefix) {
      bot.sendMessage({
        to: doc.logchannel,
        message: "<@" + userID + "> tried to change the prefix to `" + message.split(" ")[1] + "`, but it was already using the prefix they were trying to set it to."
      });
      bot.sendMessage({
        to: channelID,
        message: "`" + message.split(" ")[1] + "` is already the prefix!"
      });
    } else {
      bot.sendMessage({
        to: doc.logchannel,
        message: "<@" + userID + "> changed the prefix to `" + message.split(" ")[1] + "`."
      });
      bot.sendMessage({
        to: channelID,
        message: "Changed the prefix from `" + doc.prefix + "` to `" + message.split(" ")[1] + "`."
      });
      doc.prefix = message.split(" ")[1]

      fs.writeFile(__dirname + '/../config.yaml', yaml.safeDump(doc));
    }
  }
})
