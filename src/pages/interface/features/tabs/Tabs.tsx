import React, { useState } from 'react';

import './Tabs.scss';

import { UsedFeatures } from '../../../../hooks/Browse';
import PopUp from '../../../../components/popup/PopUp';
import ServerStatsView from '../feature/ServerStatsView';
import AutoVoiceView from '../feature/AutoVoiceView';
import SettingsView from '../feature/SettingsView';
import ServerInfo, { ChannelInfo } from '../../../../structure/ServerInfo';

export enum FeatureType {
  Settings = 1,
  ServerStats,
  AutoVoice,
}

const Features = [FeatureType[1], FeatureType[2], FeatureType[3]];

export function getFeatureView(type: FeatureType, { channel, guild }: { channel: ChannelInfo, guild: ServerInfo }) {
  switch (type) {
    case FeatureType.ServerStats: return <ServerStatsView channel={channel} guild={guild} />
    case FeatureType.AutoVoice: return <AutoVoiceView channel={channel} guild={guild} />
    case FeatureType.Settings: return <SettingsView />
  }
}

export function Tabs({ channelFeatures, selectedFeature, setSelectedFeature }: { channelFeatures: UsedFeatures, selectedFeature: FeatureType, setSelectedFeature(feature: FeatureType): void }) {
  return (
    <div className='tabs'>
      <Tab name={'Settings'} feature={FeatureType.Settings} selectedFeature={selectedFeature} setSelectedFeature={setSelectedFeature} />
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
      {openPopup &&
        <PopUp close={() => setOpenPopup(false)} >
          {Features.map(c => (<div key={c}>{c}</div>))}
        </PopUp>
      }
      <div className='tab tab-plus' onClick={() => setOpenPopup(true)}>+</div>
    </>
  )
}