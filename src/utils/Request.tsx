import { Lang } from "../hooks/Translate"
import { Stats } from "../structure/JsonTypes"
import ServerInfo, { AutoVoice, ChannelInfo, GuildInfo, ServerStat } from "../structure/ServerInfo"

// GET
export function getTranslation(lang: Lang): Promise<{}> {
  return get('https://ano.bot/api/translate/'+Lang[lang].toLocaleLowerCase()+'.json')
}

export function getStats(): Promise<Stats> {
  return get('https://ano.bot/api/stats.json')
}

export function getGuilds(): Promise<GuildInfo[]> {
  return get('https://ano.bot/api/interface/guilds.json').then(c=>c!==null?c:[])
}

export function getServerInfo(guildId: string): Promise<ServerInfo> {
  return get('https://ano.bot/api/interface/' + guildId + '/info.json')
}

// UPDATE

export function updateServerStat(guildId: string, stat: ServerStat) {
  return updateFeature('https://ano.bot/api/interface/' + guildId +'/'+stat.channelId+'/update/stats', stat)
}

export function updateAutoVoice(guildId: string, autovoice: AutoVoice) {
  return updateFeature('https://ano.bot/api/interface/' + guildId +'/'+autovoice.channelId+ '/update/autovoice', autovoice)
}

// DELETE

export function delStats(guild: ServerInfo, channel: ChannelInfo) {
  return runDelete("api/interface/"+guild.guild.id+"/"+channel.id+"/delete/stats")
}

export function delAutoVoice(guild: ServerInfo, channel: ChannelInfo) {
  return runDelete("api/interface/"+guild.guild.id+"/"+channel.id+"/delete/autovoice")
}

// HELPER

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function error(errorMsg: any) {
  console.error(errorMsg)
  return undefined
}

function get(url: string) {
  return fetch(url, { method: 'GET', headers: { Accept: 'application/json' } })
    .then(response => response.status===200?response.json():error(response), error);
}

function updateFeature(url: string, content:{channelId:string}) {
  return update(url, JSON.stringify({...content, channelId: undefined}))
}

function update(url: string, content: string) {
  return fetch(url, { method: 'post', body: content, headers: [["Content-Type", "application/json"], ["Accept", "text/plain"]] })
    .then(response => response.text(), err => { error(err); return "ERROR" })
}

function runDelete(url: string) {
  return fetch(url, { method: 'post', body: "", headers: [["Content-Type", "application/json"], ["Accept", "text/plain"]] })
}