import React from 'react';
import authScreenAtom from '../../atoms/authAtom';
import LoginCard from '../components/LoginCard';

const AuthPage = () => {
    const authScreenState = useRecoilValue(authScreenAtom);
    console.log(authScreenState);
  return (
    <LoginCard/>
  )
}

export default AuthPage