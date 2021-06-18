import React, { useState, useRef } from 'react';
import {dashboard, dashboard_data_home} from './dashboardData'
import { IonToolbar, IonContent, IonPage, IonButtons, IonTitle, IonMenuButton, IonSegment, IonSegmentButton, IonButton, IonIcon, IonSearchbar, IonRefresher, IonRefresherContent, IonToast, IonModal, IonHeader, getConfig, IonCard, IonCardHeader, IonGrid, IonRow, IonCol, IonCardContent } from '@ionic/react';
import {  search } from 'ionicons/icons';
import {useLocation} from "react-router-dom";
import SessionList from '../components/SessionList';
import SessionListFilter from '../components/SessionListFilter';
import './SchedulePage.scss'
import './Dashboard.scss'
import ShareSocialFab from '../components/ShareSocialFab';

import * as selectors from '../data/selectors';
import { connect } from '../data/connect';
import { setSearchText } from '../data/sessions/sessions.actions';
import { Schedule } from '../models/Schedule';
import { Card } from './Card';
import {maindata} from './maindata'
import {DashboardItems} from './DashboardItems'
import {MainDashboard} from './MainDashboard'
interface OwnProps { }

interface StateProps {
  schedule: Schedule;
  favoritesSchedule: Schedule;
  mode: 'ios' | 'md'
}

interface DispatchProps {
  setSearchText: typeof setSearchText;
}

type SchedulePageProps = OwnProps & StateProps & DispatchProps;

const SchedulePage: React.FC<SchedulePageProps> = ({ favoritesSchedule, schedule, setSearchText, mode }) => {
  const [segment, setSegment] = useState<'all' | 'favorites'>('all');
  const [showSearchbar, setShowSearchbar] = useState<boolean>(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const ionRefresherRef = useRef<HTMLIonRefresherElement>(null);
  const [showCompleteToast, setShowCompleteToast] = useState(false);
  const [viewsub,setviewSub] = useState(false)
  const search = useLocation().search;  
  const category = new URLSearchParams(search).get('category');

  const clickfn = (text:string) => {
      setviewSub(true)
  }
  
  const pageRef = useRef<HTMLElement>(null);

  const ios = mode === 'ios';

  const doRefresh = () => {
    setTimeout(() => {
      ionRefresherRef.current!.complete();
      setShowCompleteToast(true);
    }, 2500)
  };
const cardstyle = {
    height:'50px'
}
  return (
    <IonPage ref={pageRef} id="schedule-page">
      <IonHeader translucent={true}>
        <IonToolbar>
          {!showSearchbar &&
            <IonButtons slot="start">
              <IonMenuButton />
            </IonButtons>
          }
          {ios &&
            <IonSegment value={segment} onIonChange={(e) => setSegment(e.detail.value as any)}>
              <IonSegmentButton value="all">
                All
              </IonSegmentButton>
              <IonSegmentButton value="favorites">
                Favorites
              </IonSegmentButton>
            </IonSegment>
          }
          {!ios && !showSearchbar &&
            <IonTitle>{category || 'Dashboard'}</IonTitle>
          }
          {showSearchbar &&
            <IonSearchbar showCancelButton="always" placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)} onIonCancel={() => setShowSearchbar(false)}></IonSearchbar>
          }

          <IonButtons slot="end">
            {!ios && !showSearchbar &&
              <IonButton onClick={() => setShowSearchbar(true)}>
                <IonIcon slot="icon-only" icon={search}></IonIcon>
              </IonButton>
            }
           
          </IonButtons>
        </IonToolbar>


       
      </IonHeader>

      <IonContent fullscreen={true}>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Schedule</IonTitle>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar placeholder="Search" onIonChange={(e: CustomEvent) => setSearchText(e.detail.value)}></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        {/* <IonGrid>      
            {dashboard.dashboard.heading.map(i => 
            <div>
            <IonRow> 
                <IonCol>
                        <IonCard>
                            <IonCardHeader>{i.title}</IonCardHeader>
                        </IonCard>
                </IonCol>
                </IonRow>
                
                <IonRow>
                    {i.data.map(item =>
                        <IonCol size="4">
                            <IonCard key={item.title} style={cardstyle}>
                                <IonCardHeader>
                                    {item.title}
                                </IonCardHeader>
                            </IonCard>
                        </IonCol>  
                    )}
                </IonRow>
            </div>
            )} 
        </IonGrid> */}
        {/* <MainDashboar */}
        {category && <DashboardItems prop={dashboard_data_home} />}
        {category}
       {!category && <MainDashboard array={maindata}/>}
       
        {/* <Card img='https://ionicframework.com/docs/demos/api/card/madison.jpg' text="Image Card"/> */}
        {false && dashboard.dashboard.heading.map(
            i => 
            <IonCard key={i.title}>
                <IonCardHeader>{i.title}</IonCardHeader>
                <IonCardContent>
                    <IonGrid>
                        <IonRow>
                        {i.data.map(item => 
                            <IonCol key={item.title}>
                                {/* <IonIcon name="albums"/>
                                {item.title} */}
                                <Card sub="hello" img='https://ionicframework.com/docs/demos/api/card/madison.jpg' text={item.title}/>
                            </IonCol>
                            )}
                        </IonRow>
                    </IonGrid>
                </IonCardContent>
            </IonCard>
        )}

        <IonRefresher slot="fixed" ref={ionRefresherRef} onIonRefresh={doRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        <IonToast
          isOpen={showCompleteToast}
          message="Refresh complete"
          duration={2000}
          onDidDismiss={() => setShowCompleteToast(false)}
        />

        {/* <SessionList
          schedule={schedule}
          listType={segment}
          hide={segment === 'favorites'}
        /> */}
        <SessionList
          schedule={favoritesSchedule}
          listType={segment}
          hide={segment === 'all'}
        />
      </IonContent>

      <IonModal
        isOpen={showFilterModal}
        onDidDismiss={() => setShowFilterModal(false)}
        swipeToClose={true}
        presentingElement={pageRef.current!}
        cssClass="session-list-filter"
      >
        <SessionListFilter
          onDismissModal={() => setShowFilterModal(false)}
        />
      </IonModal>

      <ShareSocialFab />

    </IonPage>
  );
};

export default connect<OwnProps, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    schedule: selectors.getSearchedSchedule(state),
    favoritesSchedule: selectors.getGroupedFavorites(state),
    mode: getConfig()!.get('mode')
  }),
  mapDispatchToProps: {
    setSearchText
  },
  component: React.memo(SchedulePage)
});