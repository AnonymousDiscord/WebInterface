import React from 'react';

import ColorPicker from '../../../components/color-picker/ColorPicker';
import { LoginPage } from '../../../components/error/Error404';
import { Logo } from '../../../components/icons/Icons';
import LangSelector from '../../../components/lang-selector/LangSelector';
import { useStats } from '../../../hooks/Stats';
import { Stats } from '../../../structure/JsonTypes';
import './Home.scss';

export function Head({stats}:{stats: Stats}) {
  return (
    <div>
      Used by <b><span className='hightlight'>{stats?.servers}</span> servers</b>
      <> with a total of </><b><span className='hightlight'>{stats?.users}</span> members</b>!
    </div>
  );
}

export default function Home() {
  const stats = useStats()
  if (!stats) return <></>;
  if (!stats.auth) return <LoginPage />
  return (
    <div className="home">
      <Logo />
      <ColorPicker />
      <LangSelector />
      <Head stats={stats} />
    </div>
  );
}