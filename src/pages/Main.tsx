import React from 'react';
import '../App.scss';
import { DirectButton } from '../components/AnimatedButton';
import { Logo } from '../components/icons/Icons';

function LoginButton() {
  return <DirectButton id={0} url='/login' text='Login' />;
}

export default function Main() {
  return (
        <div className="main">
          <Logo />
          <LoginButton />
        </div>
  );
}