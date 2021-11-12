const Discord = require("discord.js")
const config = require("./config.json")
const bot = new Discord.Client();
const fs = require("fs");
bot.commands = new Discord.Collection();



//Delete this line don't affect to any other code.
if(config.token === "Paste here") 
console.log ("Couldn't find TOKEN. Please add your discord token in config.js before running");
console.log ("Couldn't find TOKEN. Please add your discord token in config.js before running");
console.log ("Couldn't find TOKEN. Please add your discord token in config.js before running");
console.log ("Couldn't find TOKEN. Please add your discord token in config.js before running");
////**////



//Command Auto loader. Don't touch
fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let Comd = files.filter(f => f.split(".").pop() === "js");
  if(Comd.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

Comd.forEach((f, i) =>{
  let props = require(`./commands/${f}`);
  console.log(`${f} loaded!`);
  bot.commands.set(props.help.name, props);
});

});
////////////end command loader////////////




//Bot Status 
bot.on("ready", () => {
  console.log(bot.user.username + " is online.")
});
////////////end bot status////////////



bot.on("message", async message => {
  //a little bit of data parsing/general checks
  if(message.author.bot) return;
  if(message.channel.type === 'dm') return;
  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;
  
  //checks if message contains a command and runs it
  let commandfile = bot.commands.get(command.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);
})



bot.login(config.token)
