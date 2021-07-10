import { IonCard,IonCheckbox, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import React from 'react'
import './Card.scss'
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
interface CardProps {
    img:string,
    text:string,
    sub:string,
    type:string,
    fn:Function,
    checkfn:Function,
  }

export const Card:React.FC<CardProps> = ({img,text,sub,type,fn,checkfn}) => {
    const sample_img = 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg'
    return(
        <div>
            
            {type==="a" &&
            <div>
                <IonCheckbox 
            // checked={} 
            onIonChange={e => {checkfn(text)
            }} 
            />
             <IonCard onKeyPress={()=>checkfn('start')} className="ion-card-dash" href={`/bookslot?query=${text}`}>
                 <img width="100%" height="90px" src={img || sample_img} className="img-dash"/>
                <IonCardHeader>
                    <IonCardTitle className="text-size">{text}
                    
                    </IonCardTitle>
                    <IonCardSubtitle className="subtitle">{sub}</IonCardSubtitle>
                    
                </IonCardHeader>
                
            </IonCard>
            </div>}
            {type==="b" &&
             <IonCard className="ion-card-dash" onClick={()=>fn(text)}>
                 <img width="100%" height="90px" src={img || sample_img} className="img-dash"/>
                <IonCardHeader>
                    <IonCardTitle className="text-size">{text}</IonCardTitle>
                </IonCardHeader>
            </IonCard>}
           
        </div>
    )
}