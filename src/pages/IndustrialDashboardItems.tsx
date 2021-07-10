import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonItemDivider, IonItemGroup, IonLabel, IonList, IonRow, IonTitle } from '@ionic/react'
import React from 'react'
import './Card.scss'
import { pin, wifi, wine, warning, walk } from 'ionicons/icons';
import { Card } from './Card';
interface Props {
    prop: {
         title: string; 
         img:string;
         items: { text: string; 
        items:{
            text:string,
            img:string
        }[]}[]
    }[]
    checkfn:Function;
  }
  interface PropsChildren {
    props:{ text: string; 
        items:{
            text:string,
            img:string
        }[]
    }[],
    checkfn:Function
  }

export const IndustrialDashboardItems:React.FC<Props> = ({prop,checkfn}) => {
    const [select,setSelected] = React.useState('')
    return(
        <div>
            <IonTitle color="primary">{select}</IonTitle>
            {select!=='' && <SelectFunction checkfn={checkfn} props={prop.find(i => i.title===select).items}/>}
            {select==='' && 
                <IonGrid>
                    <IonRow>
                        {prop.map(
                            i => 
                            <IonCol size="4">
                                <Card checkfn={checkfn} type="b" img={i.img} text={i.title} sub={''} fn={setSelected}/>
                            </IonCol>
                            )}
                    </IonRow>
                </IonGrid>
            }
        </div>
    )
}

const SelectFunction:React.FC<PropsChildren> = ({props,checkfn}) => {
    return(
        <IonList>
            {/* {JSON.stringify(props)} */}
            <IonGrid>
                {props.map(
                    i => 
                      <IonGrid>
                     <IonItemGroup>
                                    <IonLabel>{i.text}<br/></IonLabel>
                                </IonItemGroup>

                            <IonRow>
                                
                                {i.items.map(
                                    item => 
                                    <IonCol size="4">
                                        <Card checkfn={checkfn} fn={()=>{}} type="a" img={item.img} text={item.text} sub={''}/>
                                    </IonCol>
                                )}
                             </IonRow>
            </IonGrid> 
                )}
            </IonGrid>
             {/* <IonGrid>
                     <IonItemGroup>
                                    <IonLabel>{props.text}<br/></IonLabel>
                                </IonItemGroup>

                            <IonRow>
                                
                                {props.items.map(
                                    item => 
                                    <IonCol size="4">
                                        <Card fn={()=>{}} type="a" img={item.img} text={item.text} sub={''}/>
                                    </IonCol>
                                )}
                             </IonRow>
            </IonGrid> */}
                
                 
            
        </IonList>
    )
}