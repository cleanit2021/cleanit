import React, { useEffect, useState } from 'react';
import { IonHeader,IonDatetime, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonToggle, IonSelect, IonItemOption, IonSelectOption, IonIcon } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType, CameraSource ,CameraPhoto} from '@capacitor/core';
import firebase from 'firebase/app'
import 'firebase/firestore';
import { getUserData } from '../data/dataApi';
import { Modal } from './Modal';
import {useLocation} from "react-router-dom";

const { Camera ,Dialog,Toast} = Plugins;
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
  getUserData: typeof getUserData;
}
// const db = firebase.firestore()
interface LoginProps extends OwnProps,  DispatchProps { }
interface PhotoData extends CameraPhoto {}
const BookSlot: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {
  const  sampleimageurl = 'https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Ano_upscale()%3Aformat(jpg)%3Aextract_cover()%2Fhttps%253A%252F%252Fpocket-syndicated-images.s3.amazonaws.com%252Farticles%252F5204%252F1595959480_GettyImages-129164329.jpgcrop.jpg22.jpg'
  const [username, setUsername] = useState('');
  const [time, setTime] = useState('');
  const [date,setDate] = useState('2021-06-15');
  const [coord,setCoord] = useState('');
  const [location,setLocation] = useState('');
  const [image,setImage] = useState<PhotoData | null>(null)
  const [gpsEnable,setGpsEnabled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading,setLoading] = useState(false)
  const [phone,setPhone] = useState('')
  const [showModal,setShowModal] = useState(false)
 
  useEffect(()=>{
    async function getData() {
      let res = await getUserData()
      setPhone(res.username)
      console.log(res)
     }
    getData()
  },[getUserData])

  useEffect(()=>{

  },[])
  const search = useLocation().search;    
  const query = new URLSearchParams(search).get("query");
  async function alert(){
   try{
    await Dialog.alert({
      title: 'Successfully Updated',
      message: `You have selected ${time} on ${date}`,
    });
   }catch(e){
     console.log(e)
     await Toast.show({
      text: `You have selected ${time} on ${date}`
     })
   }
  }

const timeslots = ['10-12pm','2pm-4pm','6pm-7pm']
useEffect(()=>{
  console.log(date)
  alert()
},[date])
  const login = async (e: React.FormEvent) => {
    setLoading(true)
    e.preventDefault();

    //ADD DATA TO DB

    const db = firebase.firestore()
    const data = {
      date:'12-10-19',
      image:image,
      time:time,
      category:query
    }
    try {
      var docRef = db.collection('waste_collection_details').doc(phone)

      docRef.get().then(async(doc) => {
          if(doc.exists) {
            let doc_data = doc.data()
            let bookings = doc_data.bookings
            bookings.push(data)
            
            let res = await db.collection('waste_collection_details').doc(phone).update({bookings})

          }else{
            let res = await db.collection('waste_collection_details').doc(phone).set({bookings:[data]})

          }
        })

      setLoading(false)// alert()
      setShowModal(true)
      
    }catch(e) {
      console.log(e)
    }
    
    
    
  };
  const getPicture = async() => {
      const res = addImage(CameraSource.Photos)
  }
  const addImage  = async(source: CameraSource) => {
    try{
      const images = await Camera.getPhoto({
        quality: 60,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        source
      });
      if(images){
        setImage(images)
      }
    }
    catch(err){
      console.log(err)
    }
 
    

  }
  
 
  
  return (
    <IonPage id="details-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Book Your Slot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Select Date</IonLabel>
              <IonDatetime min={'2021-06-15'} max={'2025-01-01'} value={date} onIonChange={e => setDate(e.detail.value!)}/>
              
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Date is required
              </p>
            </IonText>}

            
            <IonItem>
              <IonLabel position="stacked" color="primary">Time</IonLabel>
              <IonSelect value={time} placeholder="Select One" onIonChange={e => setTime(e.detail.value)}>
                
                {timeslots.map(i => 
                <IonSelectOption value={i}>{i}</IonSelectOption>
                    )}
              </IonSelect>
            </IonItem>
           
            
            <IonItem>
              <IonLabel position="stacked" color="primary">Picture</IonLabel>
              <IonButton style={{borderRadius:0}} color="primary" onClick={()=>{getPicture()}}>
                {/* <IonIcon name="camera"/> */}
                Upload Picture</IonButton>
            </IonItem>
            {image!==null && 
            <div style={{margin:'20px'}}>
              <img style={{marginTop:'10px'}} src={image.dataUrl}/></div>}
              
          </IonList>

          <IonRow>
            <IonCol>
              <IonButton disabled={loading} type="submit" expand="block" onClick={(e)=>login(e)}>Submit</IonButton>
            </IonCol>
            {/* <IonCol>
              <IonButton routerLink="/signup" color="light" expand="block">Signup</IonButton>
            </IonCol> */}
          </IonRow>
          <Modal openModal={showModal} text={`You have selected ${time} on ${date}`} closeModal={()=>history.push('/dashboard', {direction: 'none'})}/>

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
  component: BookSlot
})