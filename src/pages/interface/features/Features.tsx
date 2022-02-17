import React, { useContext } from 'react';

import '../../../App.scss';

import ServerInfo from '../../../structure/ServerInfo';
import ServerStatsView from './feature/ServerStatsView';
import AutoVoiceView from './feature/AutoVoice';
import { ChannelType } from '../../../structure/ChannelType';
import { LocationContext } from '../../../hooks/Browse';
import { MSG, TranslationContext } from '../../../hooks/Translate';

export default function FeatureView({ guild }: { guild: ServerInfo }) {
  const { channel, channelFeatures } = useContext(LocationContext)
  const { t } = useContext(TranslationContext)

  // channelfeatures cannot be undefined if channel is not undefined
  if (channel === undefined || channelFeatures === undefined) return <></>;

  return (
    <>
      {t(MSG.CHANNEL, { channel: channel.name })}
      <ServerStatsView channel={channel} guild={guild} key={channel.id} />
      {channel.type === ChannelType.CATEGORY ? <AutoVoiceView channel={channel} guild={guild} key={channel.id + 1} /> : <></>}
    </>
  )
}