import { Response, Server } from "miragejs";

export function configureFakeBackend() {
  document.cookie = "coockiless=1;"+document.cookie;
  new Server({
    routes() {
      this.urlPrefix = 'https://ano.bot';
      this.namespace = "api";

      this.get("/stats.json", () => ({ "users": 1000, "servers": 10, "auth": true }));

      this.namespace = "api/interface";
      this.get("/guilds.json", () => ([{"id":"814230780418719755","name":"ToastiesCB.de","members":54,"icon":"https://cdn.discordapp.com/icons/814230780418719755/a_7f09a6553ed1a423740e33b5f22b1125.gif"},{"id":"831087186387927090","name":"☕ 𝐉𝐚𝐫𝐮𝐧𝐢𝐭𝐲 ☕","members":163,"icon":"https://cdn.discordapp.com/icons/831087186387927090/847558baaf1a4622ce0d02d8d0ee5ece.png"},{"id":"864903289086410753","name":"𝖮𝖿𝖿𝗂𝖼𝗂𝖺𝗅 - 𝖠𝗇𝗈𝗇𝗒𝗆𝗈𝗎𝗌","members":56,"icon":"https://cdn.discordapp.com/icons/864903289086410753/c435b9f7aea514ec4310e3349b193e2a.png"},{"id":"936619057942237255","name":"Server von JarDateien","members":3}]));

      this.namespace = "api/interface/936619057942237255";
      this.get("/info.json", () => new Response(404, {}, "Found no guild with id 936619057942237255"))

      this.namespace = "api/interface/*";
      this.get("/info.json", () => ({"guild":{"id":"864903289086410753","name":"𝖮𝖿𝖿𝗂𝖼𝗂𝖺𝗅 - 𝖠𝗇𝗈𝗇𝗒𝗆𝗈𝗎𝗌","members":55,"icon":"https://cdn.discordapp.com/icons/864903289086410753/c435b9f7aea514ec4310e3349b193e2a.png"},"roles":[{"id":"865606473554591795","name":"👑","managed":false},{"id":"865632842674208768","name":"❓┃A𝗇𝗈𝗇𝗒𝗆𝗈𝗎𝗌","managed":true},{"id":"865606309202362369","name":"❓┃A𝗇𝗈𝗇𝗒𝗆𝗈𝗎𝗌-Beta","managed":true},{"id":"864909598221402144","name":"💻┃D𝖾𝗏𝖾𝗅𝗈𝗉𝖾𝗋","managed":false},{"id":"872406575652937759","name":"☎️┃M𝖺𝗇𝖺𝗀𝖾𝗋","managed":false},{"id":"872422238022930443","name":"📗┃T𝗋𝖺𝗇𝗌𝗅𝖺𝗍𝗈𝗋","managed":false},{"id":"877706359846600704","name":"🎫┃S𝗎𝗉𝗉𝗈𝗋𝗍𝖾𝗋","managed":false},{"id":"864919621509709834","name":"👥┃T𝖾𝖺𝗆","managed":false},{"id":"867556661974270002","name":"🔗┃P𝖺𝗋𝗍𝗇𝖾𝗋","managed":false},{"id":"913898066627690507","name":"🚀┃B𝗈𝗈𝗌𝗍𝖾𝗋","managed":true},{"id":"864950470116245514","name":"🌟┃V𝖨𝖯","managed":false},{"id":"878740545307025500","name":"💙┃B𝗈𝗍","managed":false},{"id":"867555636409663519","name":"Patreon","managed":true},{"id":"917695310803894306","name":"WidgetBot","managed":true},{"id":"932633574182637598","name":"🎉┃G𝗂𝗏𝖾𝖺𝗐𝖺𝗒","managed":false},{"id":"924368591372058674","name":"🌐┃WebInterface","managed":false},{"id":"924368626574827531","name":"🎮┃D𝗂𝗌𝖼𝗈𝗋𝖽","managed":false},{"id":"924368695642423378","name":"❓┃B𝗈𝗍","managed":false},{"id":"926075809423298591","name":"bot needed","managed":false},{"id":"864903289086410753","name":"@everyone","managed":false}],"channels":[{"name":"📊┃𝖲𝖾𝗋𝗏𝖾𝗋 𝖲𝗍𝖺𝗍𝗌","type":4,"id":"864917157606850611"},{"name":"┏👤┃𝖬embers-55","type":0,"id":"887668187947208784"},{"name":"┣👥┃𝖳eam-5","type":0,"id":"887668671739199549"},{"name":"┣🌟┃𝖵𝖨𝖯s-5","type":0,"id":"887668975754965012"},{"name":"┗🧠┃𝖡oosts-0","type":0,"id":"887670177511141406"},{"name":"📊┃𝖡𝗈𝗍 𝖲𝗍𝖺𝗍𝗌","type":4,"id":"865590851090382879"},{"name":"┏🏧┃𝖲ervers-17","type":0,"id":"891729347004756029"},{"name":"┣🎁┃𝖦iveaways-0","type":0,"id":"901179429257093190"},{"name":"┗👥┃𝖴sers-1693","type":0,"id":"891729410670071839"},{"name":"❗┃𝖨𝗆𝗉𝗈𝗋𝗍𝖺𝗇𝗍","type":4,"id":"864912652693798962"},{"name":"📜┃𝖱ules","type":0,"id":"865188415543705610"},{"name":"🔔┃𝖭ews","type":0,"id":"864914564226220073"},{"name":"💸┃𝖪osten","type":0,"id":"905456064915456090"},{"name":"so-geht-bank-heute","type":0,"id":"929835442084380772"},{"name":"👾┃𝖡𝗈𝗍 𝖨𝗇𝖿𝗈𝗋𝗆𝖺𝗍𝗂𝗈𝗇","type":4,"id":"866239347731988511"},{"name":"🧾┃𝖥eatures","type":0,"id":"864975758643298325"},{"name":"📧┃𝖥eedback","type":0,"id":"877605352709972009"},{"name":"👥┃𝖳𝖾𝖺𝗆","type":4,"id":"871371357332570192"},{"name":"📌┃𝖯inboard","type":0,"id":"877593913181995058"},{"name":"🅰┃𝖢reator","type":0,"id":"875101630004084756"},{"name":"📗┃𝖳ranslator","type":0,"id":"876179627205333043"},{"name":"💬┃𝖳eamchat","type":0,"id":"864919603833864212"},{"name":"💻┃𝖢onsole","type":0,"id":"864947051140481074"},{"name":"📞┃𝖳eamcall","type":2,"id":"919522554295779339"},{"name":"🔗┃P𝖺𝗋𝗍𝗇𝖾𝗋𝖼𝗁𝖺𝗍𝗌","type":4,"id":"896500245230407701"},{"name":"🤝┃𝖢ooperation","type":0,"id":"934512945663209592"},{"name":"🔗┃𝖯artnerchat","type":0,"id":"920702524091150416"},{"name":"🔗┃𝖣ev𝖦aming","type":0,"id":"931860716300951552"},{"name":"🔗┃𝖬ilchstraße","type":0,"id":"932719214165377164"},{"name":"🔗┃𝖬iner𝖦ames","type":0,"id":"933027042600038510"},{"name":"🎫┃𝖳𝗂𝖼𝗄𝖾𝗍 𝖲𝗎𝗉𝗉𝗈𝗋𝗍","type":4,"id":"864922029513506816"},{"name":"🎫┃𝖲upport","type":0,"id":"864922118205603860"},{"name":"💬┃𝖳𝖾𝗑𝗍 𝖢𝗁𝖺𝗇𝗇𝖾𝗅𝗌","type":4,"id":"864923541182611466"},{"name":"🌏┃𝖦lobalchat-𝖣𝖤","type":0,"id":"864923686300811304"},{"name":"🌏┃𝖦lobalchat-𝖤𝖭","type":0,"id":"878751890408620042"},{"name":"❓┃𝖢ommands","type":0,"id":"890520143149539348"},{"name":"🔊┃𝖳𝖺𝗅𝗄 𝖫𝗈𝗎𝗇𝗀𝖾𝗌","type":4,"id":"864925208959778816"},{"name":"🔊┃𝖳𝖺𝗅𝗄-𝖫ounge","type":2,"id":"864925350491979786"},{"name":"🔊┃𝖯𝗋𝗂𝗏𝖺𝗍𝖾 𝖳𝖺𝗅𝗄𝗌","type":4,"id":"875807080781611048"},{"name":"➕┃𝖯rivate-𝖳alk","type":2,"id":"879805479881154630"}],"features":{"serverStats":[{"channelId":"887668187947208784","name":"┏👤┃𝖬embers: %","placeholder":"MEMBERS"},{"channelId":"887668975754965012","name":"┣🌟┃𝖵𝖨𝖯s: %","placeholder":"ROLE","role":"864950470116245514"},{"channelId":"887668671739199549","name":"┣👥┃𝖳eam: %","placeholder":"ROLE","role":"864919621509709834"},{"channelId":"887670177511141406","name":"┗🧠┃𝖡oosts: %","placeholder":"BOOSTCOUNT"}],"autoVoice":[{"channelId":"4925208959778816","emptyChannels":1},{"channelId":"5807080781611048","emptyChannels":1},{"channelId":"3345220140089354","emptyChannels":1}],"logger":[{"id":"3","logType":"JOIN","channelId":"887668187947208784","formate":"<:joined:891696710773002292> {user}","roles":[""]},{"id":"4","logType":"LEAVE","channelId":"887668187947208784","formate":"<:leaved:891696710546501653> {user}","roles":[""]},{"id":"5","logType":"ROLE_REMOVE","channelId":"887668671739199549","formate":"{user} left the team as {role} 🥺","roles":["864909598221402144","872406575652937759","877706359846600704","872422238022930443"]},{"id":"6","logType":"ROLE_ADD","channelId":"887668671739199549","formate":"{user} joined the team as {role}","roles":["864909598221402144","872406575652937759","877706359846600704","872422238022930443"]}]}}));

      this.namespace = "api/interface/*/update";
      this.post("/stats", (a, request) => {
        console.log("recieved:", request.requestBody)
        return "Succsess"
      })
      
      this.namespace = "api/translate/";
      this.passthrough("*.json")

      // prevent error
      this.urlPrefix = 'https://cloudflareinsights.com';
      this.namespace = "cdn-cgi";
      this.post("rum", () => "")
    }
  });
}