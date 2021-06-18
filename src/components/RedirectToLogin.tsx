import React, { useEffect, useContext } from 'react';
import { IonRouterContext } from '@ionic/react';
import { Plugins } from '@capacitor/core'

interface RedirectToLoginProps {
  setIsLoggedIn: Function;
  setUsername: Function;
}
// import { Storage } from '@capacitor/storage';
const { Storage } = Plugins
const RedirectToLogin: React.FC<RedirectToLoginProps> = ({ setIsLoggedIn, setUsername }) => {
  const ionRouterContext = useContext(IonRouterContext);

  const removeName = async () => {
    await Storage.remove({ key: 'phonenumber' });
  };
  useEffect(() => {
    setIsLoggedIn(false);
    setUsername(undefined);
    removeName();
    ionRouterContext.push('/signup')
  }, [setIsLoggedIn, setUsername, ionRouterContext]);
  return null;
};

export default RedirectToLogin;
