import React, { useEffect } from 'react';
import './App.scss';

import Interface from './pages/interface/Interface';
import { TranslationProvider, useTranslator } from './hooks/Translate';
import { loadTheme } from './utils/Theme';
import { LocationProvider, useLocation } from './hooks/Browse';

//* setup fake backend
import { configureFakeBackend } from './Debug';
configureFakeBackend();
/**/

export default function App() {
  useEffect(loadTheme, [])
  const translator = useTranslator()
  const location = useLocation()

  return (
    <TranslationProvider value={translator}>
      <LocationProvider value={location}>
        <Interface />
      </LocationProvider>
    </TranslationProvider>
  );
}