const ytdl = require("discord-ytdl-core");
const youtubeScraper = require("yt-search");
const yt = require("ytdl-core");
const { MessageEmbed, Util } = require("discord.js");
const forHumans = require("../utils/forhumans.js");

exports.run = async (client, message, args) => {
  const channel = message.member.voice.channel;

  const error = (err) => message.channel.send(err);
  const send = (content) => message.channel.send(content);
  const setqueue = (id, obj) => message.client.queue.set(id, obj);
  const deletequeue = (id) => message.client.queue.delete(id);
  var song;

  if (!channel) return error("Bu komutu kullanmak için sesli kanala katılman lazım!");

  if (!channel.permissionsFor(message.client.user).has("CONNECT"))
    return error("Bu kanala katılmaya iznim yok");

  if (!channel.permissionsFor(message.client.user).has("SPEAK"))
    return error("Konuşamadıktan sonra kanala katılsam ne yazar");

  const query = args.join(" ");

  if (!query) return error("Çalmam için şarkı ismi söylersen belki yardımcı olabilirim!");

  if (query.includes("www.youtube.com")) {
    try {
      const ytdata = await await yt.getBasicInfo(query);
      if (!ytdata) return error("Yazdığın linke gittim, bomboş");
      song = {
        name: Util.escapeMarkdown(ytdata.videoDetails.title),
        thumbnail:
          ytdata.player_response.videoDetails.thumbnail.thumbnails[0].url,
        requested: message.author,
        videoId: ytdata.videoDetails.videoId,
        duration: forHumans(ytdata.videoDetails.lengthSeconds),
        url: ytdata.videoDetails.video_url,
        views: ytdata.videoDetails.viewCount,
      };
    } catch (e) {
      console.log(e);
      return error("Bir şeyler ters gitti, konsola bi bak bakim");
    }
  } else {
    try {
      const fetched = await (await youtubeScraper(query)).videos;
      if (fetched.length === 0 || !fetched)
        return error("Dediğin şarkıyı arattım, bomboş!'");
      const data = fetched[0];
      song = {
        name: Util.escapeMarkdown(data.title),
        thumbnail: data.image,
        requested: message.author,
        videoId: data.videoId,
        duration: data.duration.toString(),
        url: data.url,
        views: data.views,
      };
    } catch (err) {
      console.log(err);
      return error("Bir şeyler ters gitti, konsolu kontrol etmeyi dene");
    }
  }

  var list = message.client.queue.get(message.guild.id);

  if (list) {
    list.queue.push(song);
    return send(
      new MessageEmbed()
        .setAuthor(
          "Şarkı sıraya eklendi",
          "https://img.icons8.com/color/2x/cd--v3.gif"
        )
        .setColor("F93CCA")
        .setThumbnail(song.thumbnail)
        .addField("Şarkı ismi", song.name, false)
        .addField("İzlenme", song.views, false)
        .addField("Süre", song.duration, false)
        .addField("Taradından istendi", song.requested.tag, false)
        .setFooter("Listede " + list.queue.length + ". sırada")
    );
  }

  const structure = {
    channel: message.channel,
    vc: channel,
    volume: 85,
    playing: true,
    queue: [],
    connection: null,
  };

  setqueue(message.guild.id, structure);
  structure.queue.push(song);

  try {
    const join = await channel.join();
    structure.connection = join;
    play(structure.queue[0]);
  } catch (e) {
    console.log(e);
    deletequeue(message.guild.id);
    return error("Ses kanalına katılamadım, Lütfen konsolu kontrol et (LÜTFEN!)");
  }

  async function play(track) {
    try {
      const data = message.client.queue.get(message.guild.id);
      if (!track) {
        data.channel.send("Sırada şarkı yok, Ben kaçıyom");
        message.guild.me.voice.channel.leave();
        return deletequeue(message.guild.id);
      }
      data.connection.on("disconnect", () => deletequeue(message.guild.id));
      const source = await ytdl(track.url, {
        filter: "audioonly",
        quality: "highestaudio",
        highWaterMark: 1 << 25,
        opusEncoded: true,
      });
      const player = data.connection
        .play(source, { type: "opus" })
        .on("finish", () => {
          var removed = data.queue.shift();
          if(data.loop == true){
            data.queue.push(removed)
          }
          play(data.queue[0]);
        });
      player.setVolumeLogarithmic(data.volume / 100);
      data.channel.send(
        new MessageEmbed()
          .setAuthor(
            "Şimdi çalınıyor",
            "https://img.icons8.com/color/2x/cd--v3.gif"
          )
          .setColor("9D5CFF")
          .setThumbnail(track.thumbnail)
          .addField("Şarkı ismi", track.name, false)
          .addField("İzlenme sayısı", track.views, false)
          .addField("Süre", track.duration, false)
          .addField("İsteyen kişi", track.requested, false)
          .setFooter("Youtube Music Player")
      );
    } catch (e) {
      console.error(e);
    }
  }
};
