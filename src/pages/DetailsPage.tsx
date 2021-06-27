import React, { useEffect, useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonToggle, IonModal } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import firebase from 'firebase/app'
import 'firebase/firestore';
import { getUserData } from '../data/dataApi';
import {  Plugins } from '@capacitor/core'
import MapView from './MapView';
import Map from '../components/Map';
import { Modal } from './Modal';

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
  const [coord,setCoord] = useState({
    latitude:0,
    longitude:0
  });
  const [isEdited,setIsEdited] =  useState(false)
  const [location,setLocation] = useState('');
  const [gpsEnable,setGpsEnabled] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [phone,setPhone] = useState('');
  const [loading,setLoading] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [showlocModal,setShowLocModal] = useState(false);

  const [reset,setReset] = useState('1')
  const db = firebase.firestore()
  useEffect(()=>{
    async function getData() {
      let res = await getUserData()
      setStateofPhoneNumber(res.username)
      console.log(res)
      if(res.username!==''){
        var docRef = db.collection("user_data").doc(res.username);

        docRef.get().then((doc) => {
            if(doc.exists) {
              console.log('DOC EXISTS',doc.data().pincode,parseInt(doc.data().pincode))  
              setUserName(doc.data().name)   
              setStateofPincode(doc.data().pincode)
              setCoord(doc.data().coord)
              setLocation(doc.data().location) 
              setIsEdited(true)     
            }})
      }  
    }
    getData()
    console.log("Hello getuserdata", phone)
  },[getUserData])

  const setStateofPhoneNumber = (phonenum:any) => {
    setPhone(phonenum)
  }
  const setStateofPincode = (data:any) => {
    setPincode(data)
    
  }
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
          console.log("Doc exists",phone);
          let res = await db.collection('user_data').doc(phone).update(data)
          setShowModal(true)
        } else {
            // doc.data() will be undefined in this case
            let res = await db.collection('user_data').doc(phone).set(data)
            setShowModal(true)
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
    // history.push('/dashboard', {direction: 'none'});

  };
  const getLocation = async() => {
    var c;
    var bool;
    Geolocation.getCurrentPosition().then(
      (coordinates) => {
        // lat= coordinates.coords.latitude || 0
        // long = coordinates.coords.longitude || 0
       c = {
          latitude: coordinates.coords.latitude,longitude:coordinates.coords.longitude
        }
        setCoord(c)
    setShowLocModal(true)
      console.log('Current position:',coordinates.coords.latitude,coord,showModal);
      bool = true
      }
      
    ).catch(e => {
      console.log(e)
    });
   
  // console.log('Current position:',coordinates.coords.latitude,coord);
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
              <IonInput name="age" value={pincode} placeholder={pincode} onIonChange={e => setPincode(e.detail.value!)}
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

{/* <IonButton onClick={()=>
  {
    console.log(pincode,parseInt("678547"))}
  }>Phone</IonButton> */}
          </IonList>
              
          <IonRow>
            <IonCol>
              <IonButton disabled={loading} type="submit" expand="block" onClick={(e)=>login(e)}>{isEdited ? 'Update' : 'Submit'}</IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
        </form>
        <Modal openModal={showlocModal} text={'Successfully selected Data'} closeModal={()=>{setShowLocModal(false)}}/>
           

        <Modal openModal={showModal} text={'Hi '+username+`, We have successfully ${isEdited ? 'updated' : 'saved'} Your Details`} closeModal={()=>history.push('/dashboard', {direction: 'none'})}/>
        
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