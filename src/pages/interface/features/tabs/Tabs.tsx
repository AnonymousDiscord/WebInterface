import React, { useState } from 'react';

import './Tabs.scss';

import { UsedFeatures } from '../../../../hooks/Browse';
import { FeatureType } from '../../../../utils/Cookies';
import PopUp from '../../../../components/popup/PopUp';

export function Tabs({ channelFeatures, selectedFeature, setSelectedFeature }: { channelFeatures: UsedFeatures, selectedFeature: FeatureType | undefined, setSelectedFeature(feature: FeatureType | undefined): void }) {
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