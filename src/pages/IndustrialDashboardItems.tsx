import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow } from '@ionic/react'
import React from 'react'
import './Card.scss'
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { Card } from './Card';
interface Props {
    prop: {
         title: string; 
         items: { text: string; 
        items:{
            text:string,
            img:string
        }[]}[]
    }[]
  }

export const IndustrialDashboardItems:React.FC<Props> = ({prop}) => {
    return(
        <IonList>
            {prop.map(
                i => 
                    <IonItemGroup key={'i.title'}>
                        <IonItemDivider sticky>
                            <IonLabel>
                               <b> {i.title}</b>
                            </IonLabel>
                        </IonItemDivider>
                        {i.items.map(
                            x => <IonGrid>
                                <IonItemGroup>
                                    <IonLabel>{x.text}<br/></IonLabel>
                                </IonItemGroup>

                            <IonRow>
                                
                                {x.items.map(
                                    item => 
                                    <IonCol size="4">
                                        <Card img={item.img} text={item.text} sub={''}/>
                                    </IonCol>
                                )}
                             </IonRow>
                        </IonGrid>
                        )}
                    </IonItemGroup>
            )}
        </IonList>
    )
}