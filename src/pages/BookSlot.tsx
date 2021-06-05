import React, { useState } from 'react';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonMenuButton, IonRow, IonCol, IonButton, IonList, IonItem, IonLabel, IonInput, IonText, IonTextarea, IonToggle, IonSelect, IonItemOption, IonSelectOption, IonIcon } from '@ionic/react';
import './Login.scss';
import { setIsLoggedIn, setUsername } from '../data/user/user.actions';
import { connect } from '../data/connect';
import { RouteComponentProps } from 'react-router';
import { Plugins, CameraResultType, CameraSource ,CameraPhoto} from '@capacitor/core';
const { Camera } = Plugins;
interface OwnProps extends RouteComponentProps {}

interface DispatchProps {
  setIsLoggedIn: typeof setIsLoggedIn;
  setUsername: typeof setUsername;
}

interface LoginProps extends OwnProps,  DispatchProps { }
interface PhotoData extends CameraPhoto {}
const BookSlot: React.FC<LoginProps> = ({setIsLoggedIn, history, setUsername: setUsernameAction}) => {
  const sampleimageurl = 'https://img-getpocket.cdn.mozilla.net/296x148/filters:format(jpeg):quality(60):no_upscale():strip_exif()/https%3A%2F%2Fpocket-image-cache.com%2F1200x%2Ffilters%3Ano_upscale()%3Aformat(jpg)%3Aextract_cover()%2Fhttps%253A%252F%252Fpocket-syndicated-images.s3.amazonaws.com%252Farticles%252F5204%252F1595959480_GettyImages-129164329.jpgcrop.jpg22.jpg'
  const [username, setUsername] = useState('');
  const [time, setTime] = useState('');
  const [date,setDate] = useState('');
  const [coord,setCoord] = useState('');
  const [location,setLocation] = useState('');
  const [image,setImage] = useState<PhotoData | null>(null)
  const [gpsEnable,setGpsEnabled] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
const timeslots = ['10-12pm','2pm-4pm','6pm-7pm']
  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    if(!username) {
      setUsernameError(true);
    }
    
    if(username) {
      await setIsLoggedIn(true);
      await setUsernameAction(username);
      history.push('/tabs/schedule', {direction: 'none'});
    }
  };
  const getPicture = async() => {
      // const res = await ImagePicker.getPictures({})
      const res = addImage(CameraSource.Photos)
      console.log("picture",res)
  }
  const addImage  = async(source: CameraSource) => {
    const images = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source
    });
 
    // const blobData = b64toBlob(images.base64String, `image/${images.format}`);
    // const imageName = 'Give me a name';
 
    console.log("imgae",images)
    setImage(images)
    // this.api.uploadImage(blobData, imageName, image.format).subscribe((newImage: ApiImage) => {
    //   this.images.push(newImage);
    // });

  }
  const b64toBlob = (b64Data:any, contentType = '', sliceSize = 512) =>{
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
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
          <IonTitle>Book Your Slot</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <form noValidate onSubmit={login}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked" color="primary">Select Date</IonLabel>
              <IonInput name="username" type="text" value={date} spellCheck={false} autocapitalize="off" onIonChange={e => setDate(e.detail.value!)}
                required>
              </IonInput>
            </IonItem>

            {formSubmitted && usernameError && <IonText color="danger">
              <p className="ion-padding-start">
                Name is required
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
            <IonItem>
              <IonLabel position="stacked" color="primary">Picture</IonLabel>
              <IonButton color="primary" onClick={()=>{getPicture()}}>Get Picture</IonButton>
            </IonItem>
            {image!==null && 
            <div style={{margin:'20px'}}>
              {/* <IonIcon  */}
              <img style={{marginTop:'10px'}} src={image.dataUrl}/></div>}
              {/* <div style={{margin:'20px'}}>
  <img style={{marginTop:'10px'}} src={sampleimageurl}/></div>
               */}
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
  component: BookSlot
})