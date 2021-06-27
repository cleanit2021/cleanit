
import React, { useEffect, useState } from 'react';
import { IonModal, IonButton, IonContent } from '@ionic/react';
import './Modal.scss'
interface ModalProps {
    openModal : boolean,
    text: string,
    closeModal : Function
  }

export const Modal: React.FC<ModalProps> = ({openModal,text,closeModal}) => {
  const [showModal, setShowModal] = useState(openModal);
    useEffect(()=>
    setShowModal(openModal)
    ,[openModal])
  return (
    <IonContent>
       
      <IonModal isOpen={showModal} cssClass='my-custom-modal-css'>
        <p>{text}</p>
        <IonButton onClick={() => {setShowModal(false)
                                    closeModal()
                                }
        }>OK</IonButton>
      </IonModal>
      {/* <IonButton onClick={() => setShowModal(true)}>Show Modal</IonButton> */}
    </IonContent>
  );
};