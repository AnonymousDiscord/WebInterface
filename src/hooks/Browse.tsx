import { createContext, useState } from "react";
import { useEffect } from "react";
import ServerInfo, { AutoVoice, ChannelInfo, GuildInfo, ServerStat } from "../structure/ServerInfo";
import { getGuilds, getServerInfo } from "../utils/Request";

export interface Location {
  guilds?: GuildInfo[]
  guild?: ServerInfo
  channel?: ChannelInfo
  guildId?: string
  channelId?: string
  channelFeatures?: UsedFeatures
}

export type UsedFeatures = {
  serverStats?: ServerStat;
  autoVoice?: AutoVoice;
}

export interface LocationStore extends Location {
  setGuild(guild: ServerInfo): void
  setChannel(channel: ChannelInfo): void
  setGuildId(guildId: string): void
  setChannelId(channelId: string): void
}

export const LocationContext = createContext<LocationStore>({
  setGuild: () => { },
  setGuildId: () => { },
  setChannel: () => { },
  setChannelId: () => { },
})

export const LocationProvider = LocationContext.Provider;

function featuresOf(guild: ServerInfo|undefined, channelId: string|undefined): UsedFeatures | undefined {
  if (channelId&&guild) return {
    serverStats: guild.features.serverStats?.find(c=>c.channelId===channelId),
    autoVoice: guild.features.autoVoice?.find(c=>c.channelId===channelId)
  }
}

export function useLocation(): LocationStore {

  const [store, setStore] = useState<Location | undefined>(() => {
    var path = window.location.pathname
    if (path.startsWith("/")) path = path.substring(1)
    if (path.endsWith("/")) path = path.substring(0, path.length - 1)
    const arr = path === "" ? [] : path.split("/")
    if (arr.length >= 1) {
      getServerInfo(arr[0]).then(guild => {
        const newStore = {
          guild: guild,
          guildId: arr[0] || "",
          channel: arr[1] ? guild?.channels.find(c => c.id === arr[1]) : undefined,
          channelId: arr[1],
          channelFeatures: featuresOf(guild, arr[1])
        }
        setStore(newStore)
        getGuilds().then(guilds => setStore({ ...newStore, guilds: guilds }))
      })
    } else getGuilds().then(guilds => setStore({ guildId: "", guilds: guilds }))
    return undefined
  })
  useEffect(() => { if (store) window.history.replaceState('', '', '/' + (store.guildId ? store.guildId + '/' + (store.channelId || "") : "")) }, [store])

  function setGuild(guild: ServerInfo) {
    setStore({
      ...store,
      guild: guild,
      guildId: guild.guild.id,
      channel: undefined,
      channelId: undefined,
      channelFeatures: undefined
    })
  }

  function setGuildId(guildId: string) {
    if (guildId === "") setStore({
      ...store,
      guild: undefined,
      guildId: "",
      channel: undefined,
      channelId: undefined,
      channelFeatures: undefined
    })
    else getServerInfo(guildId).then(guild => {
      setStore({
        ...store,
        guild: guild,
        guildId: guildId,
        channel: undefined,
        channelId: undefined,
        channelFeatures: undefined
      })
    })
  }

  function setChannel(channel: ChannelInfo) {
    setStore({
      ...store,
      channel: channel,
      channelId: channel.id,
      channelFeatures: featuresOf(store!.guild!, channel.id)
    });
  }

  function setChannelId(channelId: string) {
    const channel = store!.guild?.channels.find(c => c.id === channelId)
    setStore({
      ...store,
      channel: channel,
      channelId: channelId,
      channelFeatures: featuresOf(store!.guild!, channelId)
    });
  }

  return {
    ...store,
    setGuildId: setGuildId,
    setChannelId: setChannelId,
    setChannel: setChannel,
    setGuild: setGuild
  }
}