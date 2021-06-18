import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonModal, IonAlert, IonCard, IonCardContent, IonRouterLink, IonSpinner } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import firebase from "firebase/app";
import "firebase/auth";
import { Plugins } from '@capacitor/core'
import { getUserData } from '../data/dataApi';
// import { Storage } from '@capacitor/storage';
const { Storage } = Plugins
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  getUserData: typeof getUserData;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername}) => {

  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAlert1, setShowAlert1] = useState(false);
  const [loading,setLoading] = useState(false)
  
   useEffect(()=>{
     async function checkIfSignedIn(){

      let checkname =await checkName()
      if(checkname!==null){
        history.push('/dashboard', {direction: 'none'});
      }
     }
     checkIfSignedIn()
   },[history])

  const setName = async(val:any) => {
    let checkname= await checkName()
    if(checkname===null){
      await Storage.set({
        key: 'phonenumber',
        value: val,
      });
    }
  };
  
  const checkName = async () => {
    const { value } = await Storage.get({ key: 'phonenumber' });
    console.log(value)
    return value;
    
  };
  
  const removeName = async () => {
    await Storage.remove({ key: 'phonenumber' });
  };
  const checkData = async () => {
    console.log("username",username,"type",typeof(username))
    setUsername(username)
    let res = await getUserData()
    console.log(res)
  }
// React.useEffect(()=>{

// })
  const login = async (e: React.FormEvent) => {
    setLoading(true)
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');

    e.preventDefault();
    // setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    if(!password) {
      setPasswordError(true);
    }
    console.log(username)

    if(username) {
      // window.recaptchaVerifier = 
      
      firebase.auth().signInWithPhoneNumber(
        '+91'+username,
        window.recaptchaVerifier
        )
        .then(async(confirmationResult) => {
      console.log(confirmationResult,typeof(confirmationResult))
      window.confirmationResult=confirmationResult
      setShowModal(true)
     setLoading(false)
    }).catch((error) => {
      // Error; SMS not sent
      // ...
      console.log(error)
      setPasswordError(true)
    }); 
    }
   
  };
  const otpSubmit = async(otp:string) => {
    setShowModal(false)
    // if(confirmationRes!=={})
    setLoading(true)
    window.confirmationResult.confirm(otp).then(async(result:any) => {
      // User signed in successfully.
      const user = result.user;
      await setIsLoggedIn(true);
      // await setUsernameAction(user);
      setShowAlert1(true)
      setName(username)
      setUsername(username)
      history.push('/login', {direction: 'none'});
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
          <img src="data:image/png;base64,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" alt="Ionic logo" />
        </div>
          <form noValidate onSubmit={login}>
          <IonList className="div-with-space">
            <IonItem>
              <IonLabel position="stacked" color="primary">Phone Number</IonLabel>
              <IonInput name="username" type="number" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => {
                setUserName(e.detail.value!);
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
              {/* <IonButton onClick={()=>setName(username)}>ClickME</IonButton>
              <IonButton onClick={()=>checkData()}>checkME</IonButton> */}

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
              <IonButton disabled={loading} type="submit" expand="block" id="sign-in-button">
   
                Send OTP</IonButton>
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
                <IonInput disabled={loading} name="otp" type="number" value={password} maxlength={1} onIonChange={e => {
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
    setUsername,
    getUserData
  },
  component: Login
})