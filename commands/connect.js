const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Bu kanala katılmaya izinim yok");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Konuşamadıktan sonra kanala katılsam ne yazar");

  await channel.join();

  return message.channel.send(
    new MessageEmbed()
      .setDescription("**Sesli kanala katıldım :white_check_mark: **")
      .setColor("BLUE")
  );
};
