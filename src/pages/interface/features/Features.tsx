import React, { useContext } from 'react';

import '../../../App.scss';
import './Features.scss';

import ServerInfo from '../../../structure/ServerInfo';
import ServerStatsView from './feature/ServerStatsView';
import AutoVoiceView from './feature/AutoVoice';
import { ChannelType } from '../../../structure/ChannelType';
import { LocationContext, UsedFeatures } from '../../../hooks/Browse';
import { useState } from 'react';
import { FeatureType } from '../../../utils/Cookies';
import { MSG, TranslationContext } from '../../../hooks/Translate';
import PopUp from '../../../components/popup/PopUp';

function Tabs({ channelFeatures, selectedFeature, setSelectedFeature }: { channelFeatures: UsedFeatures, selectedFeature: FeatureType | undefined, setSelectedFeature(feature: FeatureType | undefined): void }) {
  return (
    <div className='tabs'>
      <Tab name={'Settings'} feature={undefined} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} />
      {channelFeatures.serverStats ? <Tab name={'ServerStats'} feature={FeatureType.ServerStats} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} /> : <></>}
      {channelFeatures.autoVoice ? <Tab name={'AutoVoice'} feature={FeatureType.AutoVoice} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} /> : <></>}
      <Plus />
    </div>
  )
}

function Tab({ name, feature, selectedFeature, setSelectedFeature }: { name: string, feature: FeatureType | undefined, selectedFeature: FeatureType | undefined, setSelectedFeature(feature: FeatureType | undefined): void }) {
  return (
    <div className={feature === selectedFeature ? 'tab tab-selected' : 'tab'} onClick={() => setSelectedFeature(feature)}>
      {name}
    </div>
  )
}

function Plus() {
  const [openPopup, setOpenPopup] = useState(false)
  return (
    <>
      {openPopup ?
        <PopUp close={() => setOpenPopup(false)}>
          
        </PopUp>
      : <></>}
      <div className='tab tab-plus' onClick={() => setOpenPopup(true)}>+</div>
    </>
  )
}

export default function FeatureView({ guild }: { guild: ServerInfo }) {
  const { channel, channelFeatures } = useContext(LocationContext)
  const { t } = useContext(TranslationContext)
  const [selectedFeature, setSelectedFeature] = useState<FeatureType>()

  // channelfeatures cant be undefined when channel is not undefined
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