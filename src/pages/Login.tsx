import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonToggle } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';

interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age,setAge] = useState('');
  const [coord,setCoord] = useState('');
  const [location,setLocation] = useState('');
  const [gpsEnable,setGpsEnabled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
   

    if(username && password) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/dashboard', {direction: 'none'});
    }
    history.push('/dashboard', {direction: 'none'});

  };
  const getLocation = () => {
    // api.get('http://api.positionstack.com/v1/forward?access_key=bce98239614aaa6f7954015a64f6bb76')
  }
  return (
    <IonPage id="details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Details</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Name</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUsername(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Name is required
              </p>
            </IonText>}

            
            <IonItem>
              <IonLabel position="stacked" color="primary">Age</IonLabel>
              <IonInput name="age" type="number" value={age} spellCheck={false} autocapitalize="off" onIonChange={e => setAge(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked" color="primary">Use GPS</IonLabel>
              <IonToggle checked={gpsEnable} onIonChange={e => setGpsEnabled(e.detail.checked)} />
            
            </IonItem>
            { !gpsEnable && 
            <IonItem>
              <IonLabel position="stacked" color="primary">Location</IonLabel>
              <IonTextarea name="text" value={location} spellCheck={false} autocapitalize="off" onIonChange={e => setLocation(e.detail.value!)}
                required>
              </IonTextarea>
            </IonItem>}
            { gpsEnable && 
            <IonItem>
              <IonLabel position="stacked" color="primary">Location</IonLabel>
              <IonButton color="primary" onClick={()=>{getLocation()}}>Use Current Location</IonButton>
            </IonItem>}
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" onClick={(e)=>login(e)}>Submit</IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
        </form>

      </IonContent>

    </IonPage>
  );
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: {
    setIsLoggedIn,
    setUsername
  },
  component: Login
})