import React, { useContext, useState } from 'react';
import './Guilds.scss';
import { LocationContext } from '../../../hooks/Browse';
import ServerInfo from '../../../structure/ServerInfo';
import { CrowdInPath, DefaultGuildIcon, Icon, GitHubPath, PlusPath } from './GuildIcons';
import { MSG, TranslationContext } from '../../../hooks/Translate';
import { QuestionMarkPath } from '../../../components/icons/Icons';

function Guild({ info, guild }: { info?: ServerInfo, guild: { id: string, icon?: string, path?: string, name: string, viewBox?: string } }) {
  const { setGuildId } = useContext(LocationContext)
  return (
    <div onClick={() => setGuildId(guild.id)}>
      <Raw info={info} guild={guild} />
    </div>
  );
}

function External({ guild, url }: { guild: { id: string, icon?: string, path?: string, name: string, viewBox?: string }, url: string }) {
  return (
    <div onClick={() => { window.open(url, '_blank')?.focus() }}>
      <Raw guild={guild} />
    </div>
  );
}

function Raw({ info, guild: { id, icon, path, name, viewBox } }: { info?: ServerInfo, guild: { id: string, icon?: string, path?: string, viewBox?: string, name: string } }) {
  const [hover, setHover] = useState(false);
  const selected = (info?.guild.id || "") === id

  return (
    <div className={"guild" + (selected ? " guild-selected" : "")} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {hover ?
        <div className='tooltip'>
          {name}
        </div>
        : <></>}
      <div className="pill-box" aria-hidden="true">
        <span className="pill-item" />
      </div>
      {icon ? <img src={icon + "?size=64"} alt="Icon" /> : path ? <Icon size={64} path={path} viewBox={viewBox||'0 0 24 24'} /> : <DefaultGuildIcon size={64} />}
    </div>
  );
}

export function Guilds() {
  const { guild, guilds } = useContext(LocationContext)
  const { t } = useContext(TranslationContext)

  return (
    <div className="guild-list">
      <Guild info={guild} guild={{ id: "", name: t(MSG.HOME), path: QuestionMarkPath, viewBox:"0 -.9 17.27 32" }} />
      <div className='seperator' />
      {guilds?.map(json => <Guild info={guild} guild={json} key={json.id} />)}
      <External url="https://ano.bot/invite" guild={{ id: "add", name: t(MSG.ADD_BOT), path: PlusPath }} />
      <div className='seperator' />
      <External url='https://ano.bot/discord' guild={{ id: "join", name: t(MSG.JOIN_SERVER) }} />
      <External url="https://ano.bot/github" guild={{ id: "github", name: "GitHub", path: GitHubPath, viewBox: "0 0 256 256" }} />
      <External url="https://ano.bot/translate" guild={{ id: "crowdin", name: "CrowdIn", path: CrowdInPath }} />
    </div>
  )
}