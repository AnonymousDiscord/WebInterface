import React from 'react';
import { DirectButton } from '../AnimatedButton';
import { useStats } from '../../hooks/Stats';
import "./Error404.scss"

export function LoginPage() {
  return (
    <div className='error-404'>
      <LoginPage0/>
    </div>
  )
}

function LoginPage0() {
  return (
    <>
      <h1>Not logged in!</h1>
      <DirectButton url={'/login'} text={'Login'} id={0} />
    </>
  )
}

export function Guild404({ guildId }: { guildId: string }) {
  const stats = useStats()
  if (!stats) return <></>
  return (
    <div className='error-404'>
      {stats.auth ? (
        <>
          <h1>No guild found!</h1>
          <h1>guildId: {guildId}</h1 >
        </>
      ) : <LoginPage0 />}
    </div>
  );
}