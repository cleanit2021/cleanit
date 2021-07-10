import { IonCard,IonGrid,IonRow,IonCol, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import React from 'react'
import './Card.scss'
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import {MainDashboardCard} from './MainDashboardCard'
interface CardProps {
    array: {
        key: string; 
        img: string;
        url:string;
   }[]
  }

export const MainDashboard:React.FC<CardProps> = ({array}) => {
    // const sample_img = 'https://coolbackgrounds.io/images/backgrounds/white/pure-white-background-85a2a7fd.jpg'
    return(
        <div>
            <IonGrid>
                            <IonRow>
                                {array.map(
                                    item => 
                                    <IonCol size="6">
                                        <MainDashboardCard url={item.url} img={item.img} text={item.key} />
                                    </IonCol>
                                )}
                             </IonRow>
             </IonGrid>
         
        </div>
    )
}