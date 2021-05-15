const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );
  let queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Bu sunucuda çalınan şarkı yok")
        .setColor("RED")
    );
  queue.connection.dispatcher.end();
  queue.queue = [];
  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Müziği durdurdum :white_check_mark: **")
      .setColor("BLUE")
  );
};
