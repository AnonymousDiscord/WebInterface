import React, { useContext, useState } from 'react';

import ServerInfo from '../../../structure/ServerInfo';
import { LocationContext } from '../../../hooks/Browse';
import { MSG, TranslationContext } from '../../../hooks/Translate';
import { FeatureType, Tabs, getFeatureView } from './tabs/Tabs';

export default function FeatureView({ guild }: { guild: ServerInfo }) {
  const { channel, channelFeatures } = useContext(LocationContext)
  const { t } = useContext(TranslationContext)
  const [selectedFeature, setSelectedFeature] = useState<FeatureType>(FeatureType.Settings)

  // channelfeatures cannot be undefined if channel is not undefined
  if (channel === undefined || channelFeatures === undefined) return <></>;

  return (
    <>
      {t(MSG.CHANNEL, { channel: channel.name })}
      {Tabs({ channelFeatures, selectedFeature, setSelectedFeature })}
      {getFeatureView(selectedFeature, {guild, channel})}
    </>
  )
}