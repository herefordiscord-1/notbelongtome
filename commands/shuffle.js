const { MessageEmbed } = require("discord.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;
  if (!channel)
    return message.channel.send(
      "Bu komutu kullanmak için sesli kanala katılman lazım!"
    );
  const queue = message.client.queue.get(message.guild.id);
  if (!queue)
    return message.channel.send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller Error",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :x: Karıştırılacak şarkı yok be abi**")
        .setColor("RED")
    );
  let songs = queue.queue;
    for (let i = songs.length - 1; i > 1; i--) {
      let j = 1 + Math.floor(Math.random() * i);
      [songs[i], songs[j]] = [songs[j], songs[i]];
  }
  queue.queue = songs;
  message.client.queue.set(message.guild.id, queue);
  message.channel
    .send(
      new MessageEmbed()
        .setAuthor(
          "Master Shuffle Controller",
          "https://img.icons8.com/color/2x/activity.gif"
        )
        .setDescription("** :white_check_mark: Sıradakileri karıştırdım**")
        .setColor("BLUE")
    )
    .catch(console.error);
};
