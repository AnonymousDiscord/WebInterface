import React, { useContext, useState } from 'react';

import ServerInfo from '../../../structure/ServerInfo';
import ServerStatsView from './feature/ServerStatsView';
import AutoVoiceView from './feature/AutoVoice';
import { ChannelType } from '../../../structure/ChannelType';
import { LocationContext } from '../../../hooks/Browse';
import { FeatureType } from '../../../utils/Cookies';
import { MSG, TranslationContext } from '../../../hooks/Translate';
import { Tabs } from './tabs/Tabs';

export default function FeatureView({ guild }: { guild: ServerInfo }) {
  const { channel, channelFeatures } = useContext(LocationContext)
  const { t } = useContext(TranslationContext)
  const [selectedFeature, setSelectedFeature] = useState<FeatureType>()

  // channelfeatures cannot be undefined if channel is not undefined
  if (channel === undefined || channelFeatures === undefined) return <></>;

  return (
    <>
      {t(MSG.CHANNEL, { channel: channel.name })}
      {Tabs({ channelFeatures, selectedFeature, setSelectedFeature })}
      <ServerStatsView channel={channel} guild={guild} key={channel.id} />
      {channel.type === ChannelType.CATEGORY ? <AutoVoiceView channel={channel} guild={guild} key={channel.id + 1} /> : <></>}
    </>
  )
}