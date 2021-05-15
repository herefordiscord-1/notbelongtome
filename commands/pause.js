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
        .setDescription(":x: Bu sunucuda çalınan bir şarkı yok")
        .setColor("RED")
    );
  if (queue.playing == false)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Şarkı zaten durdurulmuş")
        .setColor("RED")
    );
  queue.connection.dispatcher.pause();
  message.react("⏸");
  queue.playing = false;
  return message.channel.send(
    new MessageEmbed()
    .setDescription("**Şarkıyı durdurdum :white_check_mark: **")
    .setColor("BLUE")
  );
};
