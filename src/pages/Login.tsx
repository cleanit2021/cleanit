import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonToggle } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import firebase from 'firebase/app'
import 'firebase/firestore';
import { getUserData } from '../data/dataApi';
import {  Plugins } from '@capacitor/core'
const { Geolocation } = Plugins
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  getUserData: typeof getUserData;
}

interface LoginProps extends OwnProps,  DispatchProps { }

const Login: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername}) => {

  const [username, setUserName] = useState('');
  const [pincode,setPincode] = useState('');
  const [coord,setCoord] = useState({latitude:0,longitude:0});
  const [location,setLocation] = useState('');
  const [gpsEnable,setGpsEnabled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [phone,setPhone] = useState('')
  const [loading,setLoading] = useState(false)

  const db = firebase.firestore()
  useEffect(()=>{
    async function getData() {
      let res = await getUserData()
      setPhone(res.username)
      console.log(res)
      if(phone!==''){
        var docRef = db.collection("user_data").doc(phone);

        docRef.get().then((doc) => {
            if(doc.exists) {
                history.push('/dashboard', {direction: 'none'});
  
            }})
      }
     
    }
    getData()
  },[getUserData])

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    
    const data = {
      name : username,
      coord,
      location,
      pincode
    }
    var docRef = db.collection("user_data").doc(phone);

    docRef.get().then(async(doc) => {
        if(doc.exists) {
          console.log("Doc exists");

        } else {
            // doc.data() will be undefined in this case
            let res = await db.collection('user_data').doc(phone).set(data)
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });

    
      

    
    history.push('/dashboard', {direction: 'none'});

  };
  const getLocation = async() => {
    const coordinates = await Geolocation.getCurrentPosition();
    const {latitude,longitude} = coordinates.coords
    setCoord({
      latitude,longitude
    })
  console.log('Current position:', coordinates.coords);
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
          <IonList className="div-with-space">
            <IonItem>
              <IonLabel position="stacked" color="primary">Name</IonLabel>
              <IonInput name="username" type="text" value={username} spellCheck={false} autocapitalize="off" onIonChange={e => setUserName(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Name is required
              </p>
            </IonText>}

            
            <IonItem>
              <IonLabel position="stacked" color="primary">Pincode</IonLabel>
              <IonInput name="age" type="number" value={pincode} spellCheck={false} autocapitalize="off" onIonChange={e => setPincode(e.detail.value!)}
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
              <IonButton disabled={loading} type="submit" expand="block" onClick={(e)=>login(e)}>Submit</IonButton>
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
    setUsername,
    getUserData
  },
  component: Login
})