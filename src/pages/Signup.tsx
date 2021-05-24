import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonModal, IonAlert, IonCard, IonCardContent, IonRouterLink } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}
var firebaseConfig = {
  apiKey: "AIzaSyDEcMIB14K3Kal3V7hrd15lRhYj2Ceudqc",
  authDomain: "waste-management-17f9c.firebaseapp.com",
  projectId: "waste-management-17f9c",
  storageBucket: "waste-management-17f9c.appspot.com",
  messagingSenderId: "776025916617",
  appId: "1:776025916617:web:2ead70a8d3b56de1f83918",
  measurementId: "G-6HJ9X9GLWN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  
  
   
  
// React.useEffect(()=>{

// })
  const login = async (e: React.FormEvent) => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    e.preventDefault();
    // setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }

    if(username) {
      // window.recaptchaVerifier = 
      
      firebase.auth().signInWithPhoneNumber('+91'+username,window.recaptchaVerifier)
    .then(async(confirmationResult) => {
      console.log(confirmationResult,typeof(confirmationResult))
      window.confirmationResult=confirmationResult

      setShowModal(true)
     
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      setPasswordError(true)
    }); 
    }
   
  };
  const otpSubmit = async(otp:string) => {
    setShowModal(false)
    // if(confirmationRes!=={})
    window.confirmationResult.confirm(otp).then(async(result:any) => {
      // User signed in successfully.
      
      const user = result.user;
      await setIsLoggedIn(true);
      await setUsernameAction(user);
      setShowAlert1(true)
      history.push('/tabs/schedule', {direction: 'none'});
      // ...
    }).catch((error:any) => {
      // User couldn't sign in (bad verification code?)
      // ...
    });
  }
  return (
    <IonPage id="signup-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Signup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <div className="login-logo">
          <img src="assets/img/appicon.svg" alt="Ionic logo" />
        </div>
          <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Phone Number</IonLabel>
              <IonInput name="username" type="number" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUsername(e.detail.value!);
                setUsernameError(false);
              }}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Username is required
              </p>
            </IonText>}

            {/* <IonItem>
              <IonLabel position="stacked" color="primary">Password</IonLabel>
              <IonInput name="password" type="password" value={password} onIonChange={e => {
                setPassword(e.detail.value!);
                setPasswordError(false);
              }}>
              </IonInput>
            </IonItem> */}

            {formSubmitted && passwordError && <IonText color="danger">
              <p className="ion-padding-start">
                Error in code
              </p>
            </IonText>}
          </IonList>
          <div style={{margin:'10px'}} id="recaptcha-container"></div>
          <IonRow>
            <IonCol>
              <IonButton type="submit" expand="block" id="sign-in-button">Send OTP</IonButton>
            </IonCol>
          </IonRow>
        </form>
        <IonModal isOpen={showModal} cssClass='my-custom-class'>
          <IonContent>
          <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>OTP</IonTitle>
        </IonToolbar>
        <IonCard>
          <IonCardContent>
            <IonItem>
              <IonText>
                +91 {username}
              </IonText>
              
            </IonItem>
            <IonItem>
                <IonLabel position="stacked" color="primary">Enter your OTP</IonLabel>
                <IonInput name="otp" type="number" value={password} maxlength={1} onIonChange={e => {
                  setPassword(e.detail.value!);
                  setPasswordError(false);
                }}>
                </IonInput>
            </IonItem> 
            <IonButton expand="block" onClick={() => otpSubmit(password)}>Submit</IonButton>

          </IonCardContent>
        </IonCard>
            
            </IonContent>
        <IonAlert
          isOpen={showAlert1}
          onDidDismiss={() => {
            
            setShowAlert1(false)}}
          cssClass='my-custom-class'
          header={'Registration Successfull'}
          message={'Enter your details to continue'}
          buttons={['OK']}
        />
      </IonModal>
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