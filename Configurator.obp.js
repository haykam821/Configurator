var fs = require('fs');
var yaml = require('js-yaml');

exports.onMessageReceived = (function Version(bot, doc, user, userID, channelID, message, event) {
  require('./../exports.js').registerCmd(['setprefix <new>'], 'Changes the prefix to the given set of characters..');

  if (message === undefined) {
    return;
  }
  if (message.startsWith(doc.prefix + "setprefix ")) {
    var tried = message.replace(doc.prefix + "setprefix ", "");
    if (tried === doc.prefix) {
      bot.sendMessage({
        to: doc.logchannel,
        message: "<@" + userID + "> tried to change the prefix to `" + tried + "`, but it was already using the prefix they were trying to set it to."
      });
      bot.sendMessage({
        to: channelID,
        message: "`" + tried + "` is already the prefix!"
      });
    } else {
      bot.sendMessage({
        to: doc.logchannel,
        message: "<@" + userID + "> changed the prefix to `" + tried + "`."
      });
      bot.sendMessage({
        to: channelID,
        message: "Changed the prefix from `" + doc.prefix + "` to `" + tried + "`."
      });
      doc.prefix = tried;

      fs.writeFile(__dirname + '/../config.yaml', yaml.safeDump(doc));
    }
  }
})
