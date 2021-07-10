import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Menu from './components/Menu';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
/* Theme variables */
import './theme/variables.css';
import MainTabs from './pages/MainTabs';
import { connect } from './data/connect';
import { AppContextProvider } from './data/AppContext';
import { loadConfData } from './data/sessions/sessions.actions';
import { setIsLoggedIn, setUsername, loadUserData } from './data/user/user.actions';
import Account from './pages/Account';
import Login from './pages/DetailsPage';
import Signup from './pages/Signup';
import Support from './pages/Support';
import { Schedule } from "./models/Schedule";
import RedirectToLogin from './components/RedirectToLogin';
import Dashboard from './pages/Dashboard';
import SelectFour from './pages/SelectFour'
import firebase from "firebase/app";
import BookSlot from './pages/BookSlot';
import { Capacitor } from '@capacitor/core';
import './app.scss'
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed } from '@capacitor/core';

const { PushNotifications } = Plugins;
const isPushNotificationsAvailable = Capacitor.isPluginAvailable('PushNotifications');
if(isPushNotificationsAvailable){
  PushNotifications.register();
}

declare global {
  interface Window { recaptchaVerifier: any;
  confirmationResult:any; }
}
var firebaseConfig = {
  apiKey: "AIzaSyC6BJDG7MmCWEOOnPBN6yi0TzkhSxVGH5I",
  authDomain: "cleanit2021-9ec8d.firebaseapp.com",
  projectId: "cleanit2021-9ec8d",
  storageBucket: "cleanit2021-9ec8d.appspot.com",
  messagingSenderId: "476944139677",
  appId: "1:476944139677:web:11f7eaaae1bdb6780b5b74",
  measurementId: "G-8QZTHP7L76"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const App: React.FC = () => {
  return (
    <AppContextProvider>
      <IonicAppConnected />
    </AppContextProvider>
  );
};

interface StateProps {
  darkMode: boolean;
  schedule: Schedule;
}

interface DispatchProps {
  loadConfData: typeof loadConfData;
  loadUserData: typeof loadUserData;
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}


interface IonicAppProps extends StateProps, DispatchProps { }
const IonicApp: React.FC<IonicAppProps> = ({ darkMode, schedule, setIsLoggedIn, setUsername, loadConfData, loadUserData }) => {
  
  useEffect(() => {
    loadUserData();
    loadConfData();
    // eslint-disable-next-line
  }, []);

  return (
    schedule.groups.length === 0 ? (
      <div></div>
    ) : (
        <IonApp className={`${darkMode ? 'dark-theme' : ''}`}>
          <IonReactRouter>
            <IonSplitPane contentId="main">
              <Menu />
              <IonRouterOutlet id="main">
                {/*
                We use IonRoute here to keep the tabs state intact,
                which makes transitions between tabs and non tab pages smooth
                */}
                <Route path="/tabs" render={() => <MainTabs />} />
                <Route path="/account" component={Account} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/support" component={Support} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/selectfour" component={SelectFour} />
                <Route path="/bookslot" component={BookSlot} />

                <Route path="/logout" render={() => {
                  return <RedirectToLogin
                    setIsLoggedIn={setIsLoggedIn}
                    setUsername={setUsername}
                  />;
                }} />
                <Route path="/" component={Signup} exact />
              </IonRouterOutlet>
            </IonSplitPane>
          </IonReactRouter>
        </IonApp>
      )
  )
}

export default App;

const IonicAppConnected = connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.user.darkMode,
    schedule: state.data.schedule
  }),
  mapDispatchToProps: { loadConfData, loadUserData, setIsLoggedIn, setUsername },
  component: IonicApp
});
