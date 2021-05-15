const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );

  await channel.leave();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Kanaldan ayrıldım :white_check_mark: **")
      .setColor("BLUE")
  );
};
