import React, { useContext } from 'react';

import '../../App.scss';
import './Interface.scss';

import { Guild404 } from '../../components/error/Error404';
import ChannelFeatures from './features/Features';
import { Guilds } from './guilds/Guilds';
import ChannelView from './channel-tree/ChannelTree';
import { LocationContext } from '../../hooks/Browse';
import Home from './home/Home';

export default function Interface() {
  const location = useContext(LocationContext)
  const { guildId, guild } = location
  return (
      <div className="interface-grid">
        <Guilds />
        {guild && guild !== null ?
          <>
            <div className="channel-list">
              {guild.guild.name}
              <ChannelView guild={guild} key={guild.guild.id} />
            </div>
            <div>
              <ChannelFeatures guild={guild} />
            </div>
          </>
          :
          guildId === "" ? <Home /> : <Guild404 guildId={guildId!} />
        }
      </div>
  );
}