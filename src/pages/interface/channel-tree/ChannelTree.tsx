import React, { useContext } from 'react';

import './ChannelTree.scss';

import { ChannelType } from '../../../structure/ChannelType';
import { ChannelIcon } from '../../../components/icons/Icons';
import ServerInfo, { ChannelInfo } from '../../../structure/ServerInfo';
import { LocationContext } from '../../../hooks/Browse';

const getClasses = (selected: boolean, type: ChannelType) => {
  return "channel " + (selected?" channel-selected":"") + (type===ChannelType.CATEGORY?" category":"")
}

function Channel({ channel }: { channel: ChannelInfo }) {
  const {channelId, setChannel} = useContext(LocationContext)
  const path = ChannelType.getPath(channel.type)
  
  return (
      <div className={getClasses(channel.id === channelId, channel.type)} onClick={() => setChannel(channel)}>
        {path ? <ChannelIcon path={path} /> : <></>}
        <span style={{gridColumn:3,overflowX:'hidden',whiteSpace:'nowrap'}}>{channel.name}</span>
      </div>
  );
}

export default function ChannelView({ guild }: { guild: ServerInfo }) {
  
  return (
    <>
      {guild.channels.map(channel => <Channel channel={channel} key={channel.id} />)}
    </>
  );
}