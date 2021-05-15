const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );
  if (!args[0])
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: Şarkı numarası girmedin")
        .setColor("RED")
    );
  if (isNaN(args[0]))
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Abi numara yazıcan [Mesela: -remove 2]**")
        .setColor("RED")
    );
  let queue = message.client.queue.get(message.guild.id);
  if (args[0] == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Şuanda çalınan şarkıyı kaldıramam ki, skip komutunu kullan**"
        )
        .setColor("RED")
    );
  if (queue.queue.length == 1)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(
          ":x: **Sırada sadece bir şarkı var kalkmıyo, stop komutunu kullan**"
        )
        .setColor("RED")
    );
  if (args[0] > queue.queue.length)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Sırada o kadar şarkı yok ki**")
        .setColor("RED")
    );
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setDescription(":x: **Bu sunucuda çalınan şarkı yok**")
        .setColor("RED")
    );
  var name = queue.queue[args[0] - 1].name;
  queue.queue.splice(args[0] - 1);
  return message.channel.send(
    new MessageEmbed()
      .setDescription(
        "**" + "" + name + "'yı sıradan kaldırdık " + ":white_check_mark: **"
      )
      .setTimestamp()
      .setColor("BLUE")
  );
};
