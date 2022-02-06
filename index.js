const aoijs = require("aoi.js")
const bot = new aoijs.Bot({
token: "OTM5ODMyNjE4NTE2NjExMDkz.Yf-lVQ.y65Mhgh4qrYaCQpqnXoapgk_zaw",
prefix: "$getServerVar[prefix]"
})

bot.loadCommands(`./commands/`)

bot.onMessage()
bot.onJoined()
bot.onLeave()

bot.status({
  text: "$getServerVar[prefix]help",
  type: "WATCHING",
  time: 5
})

bot.status({
  text: "!$serverCount Guild's | $allMembersCount Users",
  type: "WATCHING",
  time: 5
})

bot.command({
name: "ping",
code: `Pong! $pingms`
})

bot.variables({
  welchn: "",
  leachn: "",
  prefix: "!",
  modlogs: "0",
  warn: "0",
  musicch: "",
  musicmsg: "",
  musicmsgq: "",
  antilink: "false",
  reason: "0",
  userinf: "0",
  no: ""
})

bot.readyCommand({
  channel: "884041686022520875",
  code: `
  $log[Ready!]
  $wait[3s]
  $author[$userTag[$clientID];$userAvatar[$clientID]]
  $description[Bot Is Online
  $addField[Watching:; $serverCount Servers!]
  $addField[Watching:; $allMembersCount Members!]
  $addField[Watching:; $commandsCount cmds!]
  $addField[Waiting:; to set bot Status!]
  $color[ff000]
  $footer[Made by $userTag[489532695928504324]]
  $addTimestamp`
  });

//welcome start

bot.command({
  name: "set-welcome-channel",
  code: `$setServerVar[welchn;$mentionedChannels[1]]
  $color[BLACK]
  $description[<#$mentionedChannels[1]> successfully set welcome channel]
  $onlyPerms[managechannels;{description:You don't have permissions **MANAGECHANNELS**}{color:red}]
  $onlyBotPerms[managechannels;{descripyion:I don't have permissions **MANAGECHANNELS**}{color:RED}]
  `
})

bot.command({
  name: "set-leave-channel",
  code: `$setServerVar[leachn;$mentionedChannels[1]]
  $color[BLACK]
  $description[<#$mentionedChannels[1]> successfully set leave channel]
  $onlyPerms[managechannels;{description:You don't have permissions **MANAGECHANNELS**}{color:red}]
  $onlyBotPerms[managechannels;{descripyion:I don't have permissions **MANAGECHANNELS**}{color:RED}]`
})


bot.joinCommand({
  channel: "$getServerVar[welchn]",
  code: `$title[WELCOME]
  $color[BLACK]
  $description[$addField[Server Name:;$serverName]
  $addField[Members:;$membersCount]
  $addField[User ID:;$finduser]
  $addField[User Tag:;$userTag]
  $addField[Name:;$username]
  $thumbnail[$authorAvatar]
  $image[https://cdn.discordapp.com/attachments/883114768548892683/883482943706775612/icegif-87.gif]
  `
})

bot.leaveCommand({
  channel: "$getServerVar[leachn]",
  code: `$author[$username;$authorAvatar]
  $thumbnail[$authorAvatar]
  $color[RED]
  $description[$userTag Left]
  $footer[$serverName $addTimestamp]
  `
  })

//welcome end


//help start

bot.command({
  name: "help",
  code: `$title[Help Menu]
$color[BLACK]
$thumbnail[$authorAvatar]
$description[Here is the list of command!
$addField[💫 Everyone;
status / userinfo / avatar / akinator]

$addField[⚙️ Settings;
 lock / unlock / setprefix / set-welcome-channel / set-leave-channel.]

$addField[Moderation:; ban / unban / kick / warn / clear / warnings / unwarn / giverole / removerole]
$addTimestamp
`
})

//help coomand end






//ban unban start

bot.command({
 name:"ban",
 code: `
$color[BLACK] 
$author[Banned successfully]
$addField[About:;
Reason:
> $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]]
Date:
> $day $month $year
]
$addField[User information;
$userTag[$findUser[$message[1]]] - $findUser[$message[1]]]
$addField[Moderator;
$userTag - $authorID]
$thumbnail[$userAvatar[$findUser[$message[1]]]]
$ban[$findUser[$message[1]];$userTag: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]];7]
$if[$memberExists[$findUser[$message[1]]]==true]
$onlyIf[$rolePosition[$highestRole[$findUser[$message[1]]]]>$rolePosition[$highestRole];{description:To use this you need to have a higher rank than the mentioned user.}{color:RED}]
$onlyIf[$findUser[$message[1]]!=$authorID;{description:You can't ban yourself (Or else, I couldn't find that user)} {color:RED}]
$onlyIf[$findUser[$message[1]]!=$clientID;{description:I can't ban myself, that's illegal}{color:RED}]
$onlyIf[$findUser[$message[1]]!=$ownerID;{description:I can't ban the owner of the server}{color:RED}]
$elseIf[$memberExists[$findUser[$message[1]]]==false]
$onlyIf[$findUser[$message[1]]!=$authorID;{description:You can't ban yourself (Or else, I couldn't find that user)}{color:RED}]
$endelseIf
$endif
$onlyIf[$isBanned[$findUser[$message[1]]]==false;{description:This user has already been banned on this server}{color:RED}]
$onlyIf[$message!=;{description:Please specify the user you want to ban. Correct usage:\`$getServerVar[prefix]ban <@User> Reason}{color:RED}]
$onlyPerms[ban;{description:To use this you require the \`BAN_MEMBERS\` permission}{color:RED}]
 $onlyBotPerms[ban;{description:I don't have enough perms to execute this command. Permissions missing: \`BAN_MEMBERS\`}{color:RED}]`
})
 
 
bot.command({
 name: "unban",
 code: `$unban[$message[1];By $userTag[$authorID] Reason: $sliceMessage[1]]
$username[$message[1]] **has been unbanned ✅**
$onlyBotPerms[ban;{description:I don't have ban perms}{color:RED}]
$argsCheck[>1;{description:Please Provide User ID To Unban}{color:RED}]
$onlyPerms[ban;{description:You need ban permission}{color:RED}]
$suppressErrors[{description:I can't find that user.}{color:RED}]`
})

//ban unban end


//warn unwarn start

bot.command({
name: "warn",
code: `
$color[BLACK]
$title[Warned $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has warned **$username[$mentioned[1;yes]]** for \`$noMentionMessage\`
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings
]
$setUserVar[reason;$getUserVar[reason;$mentioned[1]]/**$date+:$hour:$minute:$second**+> $noMentionMessage+;$mentioned[1]]
$setUserVar[warn;$sum[$getUserVar[warn;$mentioned[1]];1];$mentioned[1]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];{description:That user is higher than me on role position}{color:RED}]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];{description:That user is higher/equal than you on role position}{color:RED}]
$onlyIf[$message[2]!=;{description:Provide a reason}{color:RED}]
$onlyIf[$mentioned[1]!=;{description:Mention the user you want to warn and provide a reason}{color:RED}]
$onlyIf[$mentioned[1]!=$authorID;{description:You can't warn yourself}{color:RED}]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;{description:You can't warn a bot}{color:RED}]
$onlyBotPerms[manageroles;{description:I don't have** \`MANAGAGE_ROLES\` perms}{color:RED}]
$onlyPerms[manageroles;{description:You don't have** \`MANAGAGE_ROLES\` perms}{color:RED}]`
})
 
bot.command({
name: "warnings", 
code: `$color[BLACK]
$title[$username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]'s warnings]
$description[
**$username[$mentioned[1;yes]]** has
\`$getUserVar[warn;$findUser[$message]]\` warnings
 
**Warnings User**
<@$mentioned[1;yes]> 
(\`$mentioned[1;yes]\`)]
$onlyIf[$getUserVar[warn;$findUser[$message]]>0;{description:The warnings of this user is already at 0}{color:RED}]
$onlyIf[$mentioned[1]!=;{description:You must mention someone}{color:RED}]
$onlyIf[$isBot[$mentioned[1;yes]]!=true;{description:You can't warn a bot, so they don't have warnings}{color:RED}]`
})
 
bot.command({
name: "unwarn", 
code: `
$color[BLACK]
$title[Removed Warn from $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has removed a warn from **$username[$mentioned[1;yes]]** 
he now has \`$getUserVar[warn;$findUser[$message]]\` Warnings]
$setUserVar[warn;$sub[$getUserVar[warn;$findUser[$message]];1];$findUser[$message]]
$removeSplitTextElement[$getTextSplitLength]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$getUserVar[warn;$findUser[$message]]>0;**⛔ The Warnings of this User is already at 0**]
$onlyIf[$mentioned[1]!=$authorID;**⛔ You can't unwarn yourself**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**, Correct usage: \`$getServerVar[prefix]unwarn <@user>\`]
$onlyPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms**]`
})
 

//warn unwarn end

// roles start 
bot.command({
name: "removerole",
code: `$color[BLACK]
$takeRoles[$mentioned[1];$mentionedRoles[1]]
$title[Removed role to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has taken <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
bot.command({
name: "giverole",
code: `$color[BLACK]
$giveRoles[$mentioned[1];$mentionedRoles[1]]
$title[Role given to $username[$mentioned[1;yes]]#$discriminator[$mentioned[1;yes]]]
$description[**$username** has given <@&$mentionedRoles[1]> **role to** $username[$mentioned[1;yes]]]
$onlyIf[$rolePosition[$highestRole[$clientID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher than me on role position**]
$onlyIf[$rolePosition[$highestRole[$authorID]]<$rolePosition[$highestRole[$mentioned[1;yes]]];**⛔ That user is higher/equal than you on role position**]
$onlyIf[$mentionedRoles[1]!=;⛔ **Mention a role**]
$onlyIf[$mentioned[1]!=;**⛔ You must mention someone**]
$onlyBotPerms[manageroles;⛔ **I don't have** \`MANAGAGE_ROLES\` perms]
$onlyPerms[manageroles;⛔ **You don't have** \`MANAGAGE_ROLES\` perms]`
})
 
// roles end


//avatar start
bot.command({
    name: "avatar",
    aliases: ['av'],
    code: `
$if[$findMembers[$message;10;{position}]!=1]
$author[$userTag[$authorID];$authorAvatar]
$description[Please choose the following...
 
$findMembers[$message;10;**{position}.)** [{tag}](https://youtu.be/Qskm9MTz2V4=16)]]
$color[BLACK]
$awaitMessages[$authorID;1m;everything;avatar;$getVar[no] Cancelled]
$setUserVar[userav;$findMembers[$message;10;{id}]]
$elseIf[$findMembers[$message;10;{position}]==1]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[$userAvatar[$get[id]?size=2048]]
$color[BLUE]
$addTimestamp
$let[id;$findMembers[$message;10;{id}]]
$endElseIf
$endIf
$onlyIf[$message!=;{execute:avatar2}]
$onlyIf[$findMembers[$message;10;{id}]!=;{execute:avatar2}]
`
})
 
bot.awaitedCommand({
    name: "avatar",
    code: `
$if[$isNumber[$message[1]]==true]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[attachment://avatar.$get[if]]
$color[BLACK]
$addTimestamp
$attachment[$userAvatar[$get[id]];avatar.$get[if]]
$let[if;$replaceText[$replaceText[$stringEndsWith[$get[replace];png];true;png];false;gif]]
$let[replace;$replaceText[$userAvatar[$get[id]];webp;png]]
$let[id;$splitText[$message[1]]]
$textSplit[$getUserVar[userav];\n]
$elseIf[$toLowercase[$message[1]]==cancel]
$getVar[no] Cancelled
$endElseIf
$else
$getVar[no] Cancelled
$endIf
$suppressErrors[$getVar[no] Cancelled]
`
})
 
bot.awaitedCommand({
    type: "awaitedCommand",
    name: "avatar2",
    code: `
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$image[attachment://avatar.$get[if]]
$color[BLACK]
$addTimestamp
$attachment[$userAvatar[$get[id]];avatar.$get[if]]
$let[if;$replaceText[$replaceText[$stringEndsWith[$userAvatar[$get[id]];png];true;png];false;gif]]
$let[replace;$replaceText[$userAvatar[$get[id]];webp;png]]
$let[id;$findUser[$message]]
`
})
//avatar end

//userinfo start
bot.command({
    name: "info",
    aliases: ['i', 'whois', 'userinfo', 'useri', 'ui'],
    code: `
$if[$findMembers[$message;10;{position}]!=1]
$author[$userTag[$authorID];$authorAvatar]
$description[Please choose the following...
$findMembers[$message;10;**{position}.)** [{tag}](https://youtu.be/Qskm9MTz2V4=16)]]
$color[BLACK]
$awaitMessages[$authorID;1m;everything;userinfo;$getVar[no] Cancelled]
$setUserVar[userinf;$findMembers[$message;10;{id}]]
$elseIf[$findMembers[$message;10;{position}]==1]
$author[$userTag[$get[id]];$userAvatar[$get[id]]]
$thumbnail[$userAvatar[$get[id]]]
$description[
$addField[Roles[$userRoleCount[$get[id]]];$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[id]]==0];true;Undefined];false;$userRoles[$get[id];mentions;, ]];yes]
$addField[Creation Date:;$creationDate[$get[id]]
\`$creationDate[$get[id];time]\`;yes]
$addField[Join Date:;$memberJoinedDate[$get[id]]
\`$memberJoinedDate[$get[id];time]\`;yes]
$addField[Nickname:;$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[id]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[id]").then(d=>d.nickname);yes]];yes]
$addField[Tag:;$discriminator[$get[id]];yes]
$addField[Username:;$username[$get[id]];yes]
$addField[ID:;\`$get[id]\`;yes]
]
$color[BLACK]
$let[id;$findMembers[$message;10;{id}]]
$endElseIf
$endIf
$onlyIf[$message!=;$get[err]]
$onlyIf[$findMembers[$message;10;{id}]!=;$get[err]]
$let[err;{author:$userTag[$get[idb]]:$userAvatar[$get[idb]]}{thumbnail:$userAvatar[$get[idb]]}
{field:ID#COLON#:\`$get[idb]\`:yes}
{field:Username#COLON#:$username[$get[idb]]:yes}
{field:Tag#COLON#:$discriminator[$get[idb]]:yes}
{field:Nickname#COLON#:$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[idb]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[idb]").then(d=>d.nickname);yes]]:yes}
{field:Join Date#COLON#:$memberJoinedDate[$get[idb]]
\`$memberJoinedDate[$get[idb];time]\`:yes}
{field:Creation Date#COLON#:$creationDate[$get[idb]]
\`$creationDate[$get[idb];time]\`:yes}
{field:Roles[$userRoleCount[$get[idb]]]:$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[idb]]==0];true;Undefined];false;$userRoles[$get[idb];mentions;, ]]:yes}
{color:BLUE}]
$let[idb;$findUser[$message]]
$suppressErrors[{author:$userTag[$authorID]:$authorAvatar}{description:$getVar[no] An error occurred, please try again}{color:RED}]
`
})
 
bot.awaitedCommand({
    namme: "userinfo",
    code: `
$if[$isNumber[$message[1]]==true]
$author[$userTag[$get[st]];$userAvatar[$get[st]]]
$thumbnail[$userAvatar[$get[st]]]
$description[
$addField[Roles[$userRoleCount[$get[st]]];$replaceText[$replaceText[$checkCondition[$userRoleCount[$get[st]]==0];true;Undefined];false;$userRoles[$get[st];mentions;, ]];yes]
$addField[Creation Date:;$creationDate[$get[st]]
\`$creationDate[$get[st];time]\`;yes]
$addField[Joined Date:;$memberJoinedDate[$get[st]]
\`$memberJoinedDate[$get[st];time]\`;yes]
$addField[Nickname:;$replaceText[$replaceText[$checkCondition[$djsEval[guild.members.fetch("$get[st]").then(d=>d.nickname);yes]==null];true;Undefined];false;$djsEval[guild.members.fetch("$get[st]").then(d=>d.nickname);yes]];yes]
$addField[Tag:;$discriminator[$get[st]];yes]
$addField[Username:;$username[$get[st]];yes]
$addField[ID;\`$get[st]\`;yes]
]
$color[BLACK]
$let[st;$splitText[$message[1]]]
$textSplit[$getUserVar[userinf];\n]
$elseIf[$toLowercase[$message[1]]==cancel]
$getVar[no] Cancelled
$endElseIf
$else
$getVar[no] Cancelled
$endIf
$suppressErrors[$getVar[no] Cancelled]
`
})

//userinfo end

//clear start
bot.command({
  name: "clear",
  code: `$if[$isNumber[$message[1]]==true]
  \`\`\`js
  $sub[$get[delMes];1] messages have been deleted.
  \`\`\`
  $deleteCommand
  $deleteIn[5s]
  $let[delMes;$clear[$sum[$noMentionMessage;1];everyone;$channelID;yes]]
  $onlyPerms[managemessages; You are missin \`MANAGE_MESSAGES\` permissions!]
  $onlyBotPerms[managemessages;I am missin \`MANAGE_MESSAGES\` permissions!]
  $else
  \`\`\`js
  $get[mesDel] messages have been deleted.
  \`\`\`
  $deletecommand
  $deleteIn[5s]
  $let[mesDel;$clear[100;everyone;$channelID;yes]]
  $onlyPerms[managemessages; You are missin \`MANAGE_MESSAGES\` permissions!]
  $onlyBotPerms[managemessages;I am missin \`MANAGE_MESSAGES\` permissions!]
  $endif
  `
})

//clear end


//aki start

bot.command({
  name: "akinator",
  aliases: ['aki'],
  code: `
  $djsEval[
  const akinator = require('discord.js-akinator');
  akinator(message, client, "en");`
})
//aki end


//setprefix start

bot.command({
  name: "setprefix",
  code: `
$title[Successfully]
$color[BLACK]
$description[Set the prefix to $message!]
$onlyPerms[admin;{description: 🚫|you don't have permission **adminstrator**} {color: #ff2052}]
$globalCooldown[5s;🕓|please wait %time%, and try again {delete:5s}]
$setServerVar[prefix;$message]
`
})

//setprefix end


//lock unlock start

bot.command({
  name: "lock",
  code: `
$modifyChannelPerms[$channelID;-sendmessages;$guildID]
$color[BLACK]
$description[<#$channelID> 🔒has been locked]
$globalCooldown[5s;🕓|please wait %time%, and try again {delete:5s}]
$onlyPerms[managechannels;{description: ⚠️|You don't have permission **managechannels**} {color: #ff2052}]`
})

bot.command({
  name: "unlock",
  code: `
 $globalCooldown[5s;🕓|please wait %time%, and try again {delete:5s}]
$onlyPerms[managechannels;{description: ⚠️|You don't have permission **managechannels**} {color: #ff2052}]
$modifyChannelPerms[$channelID;+sendmessages;$guildID]
$color[BLACK]
$description[<#$channelID> 🔓has been unlocked]`
})

//lock unlock end

// bot stats start

bot.command({
  name: "status",
  aliases: ['botstats', 'about'],
  code: `
$author[$username]
$color[BLACK]
$addField[About Bot;
• Total commands: $commandsCount
• Latency: $botPing ms
• Uptime: $uptime
• User: $numberSeparator[$allMembersCount]
• Guild: $serverCount
• Bot Language: DBD.js
• Prefix: $getServerVar[prefix]
• Owner: $usertag[$botOwnerID]]
$globalCooldown[5s;🕓|please wait %time%, and try again {delete:5s}]
`
})

//bot stats end

//kick start
bot.command({
name: "kick",
code: `$channelSendMessage[$channelID;$title[Kicked]$description[
Kicked: $userTag[$findUser[$message[1]]]  
Adminstrator: <@$authorID>
Reason: $message[2]]
$color[BLACK]

$sendDM[$findMember[$message[1]];{color:BLACK}{title:Kicked}{description:
Kicked in: **$serverName**
Adminstrator: <@$authorID>
Reason: $message[2]}]
$kick[$findUser[$message[1]];$userTag: $replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;A reason wasn't provided.];false;$messageSlice[1]];7]
$onlyIf[$authorID!=$mentioned[1];:x:| No te puedes kickear a ti mismo!]
 `
})

//kick end




bot.loopCommand({
code: `
$editMessage[883840279898112040;{description:
• Prefix: $getServerVar[prefix]
• Users: $allMembersCount
• Servers: $serverCount
• Channels: $allChannelsCount
- $allChannelsCount[category] Categories
- $allChannelsCount[text] Text
- $allChannelsCount[voice] Voice
• Total commands: $commandsCount
• Latency: $ping ms
• Uptime: $uptime
• Owner: <@$botOwnerID>
• User server average $numberseparator[$truncate[$divide[$allmemberscount;$servercount]];,]
}
{thumbnail:$userAvatar[$clientID]}
{author:$username[$clientID]:$userAvatar[$clientID]}
{footer:Updates every 10s} {color:#303136}]
`,
channel: "883823526728065026",
executeOnStartup: true,
every: 10000
})
