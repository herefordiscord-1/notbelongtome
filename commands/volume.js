const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );

  let queue = message.client.queue.get(message.guild.id);

  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Volume Controller",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("BLUE")
        .setDescription("**Şuanki ses düzeyi " + queue.volume + " **")
    );

  if (args[0] > 100)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Volume Error",
          "https://img.icons8.com/color/2x/high-volume--v2.gif"
        )
        .setColor("RED")
        .setDescription("**Abartma abi en fazla 100 :x: **")
    );

  queue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100);
  queue.volume = args[0];
  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "Master Volume Controller",
        "https://img.icons8.com/color/2x/high-volume--v2.gif"
      )
      .setColor("BLUE")
      .setDescription("**Ses düzeyi " + args[0] + " olarak ayarlandı :white_check_mark: **")
  );
};
