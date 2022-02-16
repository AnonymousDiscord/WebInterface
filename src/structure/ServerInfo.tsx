import { ChannelType } from "./ChannelType";

export default interface ServerInfo {
  guild: GuildInfo;
  roles: Role[];
  channels: ChannelInfo[];
  features: Features;
}

export type GuildInfo = {
  id: string
  name: string
  members: number
  icon?: string
}

export interface Role {
  id: string;
  name: string;
  managed: boolean;
}

export type ChannelInfo = {
  id: string
  name: string,
  type: ChannelType,
}

export interface Features {
  serverStats?: ServerStat[];
  autoVoice?: AutoVoice[];
}

export type Placeholder = "MEMBERS" | "USERS" | "BOOSTCOUNT" | "BOOSTLEVEL" | "BOTS" | "LIVE" | "MOBILE" | "WEB" | "DESKTOP" | "ONLINE" | "OFFLINE" | "IDLE" | "EMPLOYED" | "ROLE";
export const placeholderValues: Placeholder[] = ["MEMBERS", "USERS", "BOOSTCOUNT", "BOOSTLEVEL", "BOTS", "LIVE", "MOBILE", "WEB", "DESKTOP", "ONLINE", "OFFLINE", "IDLE", "EMPLOYED", "ROLE"];
export type ServerStat = {
  channelId: string;
  name: string;
  placeholder: Placeholder;
  role?: string;
}

export type AutoVoice = {
  channelId: string;
  emptyChannels: number;
}