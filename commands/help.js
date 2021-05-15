const { MessageEmbed } = require("discord.js");

exports.run = async (client, message) => {
  const commands = `connect\`\` - senin olduğun kanala gelirim
   disconnect\`\` - senin olduğun kanaldan giderim
   play <Şarkı adı yada url>\`\` - youtubedan şarkı açar
   pause\`\` - anlık çalınan şarkıyı durdurur
   resume\`\` - durdurulmuş şarkıyı devam ettirir
   queue\`\` - şarkı sırasını gösterir
   skip\`\` - bi sonraki şarkıya geçer
   skipto <hedef şarkının numarası>\`\` - verilen sıradaki şarkıya geçer
   stop\`\` - şarkıyı durdurup sırayı temizler
   volume <istenilen sayı veya boş>\`\` - ses seviyesini görme ve düzenleme işine yarar
   np\`\` - şuan da çalınan şarkıyı gösterir
   lyrics\`\` - şuanki şarkının sözlerini bulur (gelişme aşamasında)
   shuffle\`\` - sıradaki şarkıları karıştırır 
   loop\`\` - çalınan şarkı için döngüyü aktive / deaktive eder
   remove <hedef şarkının numarası>\`\` - istenilen şarkıyı sıradan kaldırır
   help\`\` - bu sayfayı gösterir`;

  const revised = commands
    .split("\n")
    .map((x) => "• " + "``" + client.config.prefix + x.trim())
    .join("\n");

  message.channel.send(
    new MessageEmbed()
      .setAuthor(
        "MusicBot Commands Help",
        "https://img.icons8.com/color/2x/services--v2.gif"
      )
      .setColor("FFFBFB")
      .setTimestamp()
      .setDescription(revised)
  );
};
