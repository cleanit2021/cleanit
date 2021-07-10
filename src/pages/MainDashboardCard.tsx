import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react'
import React,{useState} from 'react'
import './Card.scss'
import {dashboard_data_home} from './dashboardData'

// import { pin,homeOutline,} from 'ionicons/icons';
interface CardProps {
    img:string,
    text:string
    url:string
  }

export const MainDashboardCard:React.FC<CardProps> = ({text,img,url}) => {
   
    return(
        <div>
            <IonCard className="green-card" 
            href={`/dashboard?category=${url}`}
            >
                <img alt="sample" width="50%" style={{margin:'auto',display:'block'}} height="50%" src={img} className="img-dash"/>
                {/* {pin} */}
                <IonCardHeader style={{margin:'auto',display:'block'}}>
                    <b>
                        <IonCardTitle style={{fontSize:'20px'}} className="text-size">{text}</IonCardTitle>
                    </b>
                    {/* <IonCardSubtitle className="subtitle">{sub}</IonCardSubtitle> */}
                </IonCardHeader>
            </IonCard>
        </div>
    )
}