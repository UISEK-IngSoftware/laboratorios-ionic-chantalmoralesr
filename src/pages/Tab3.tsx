import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Tab3.css';
import { useState } from 'react';
import { getUserInfo } from '../services/GithubService';
import { GithubUser } from '../interfaces/GithubUser';
import LoadingSpinner from '../components/LoadingSpinner';

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadUserInfo = async () => {
    setIsLoading(true);
    const userData = await getUserInfo();
    setUserInfo(userData);
    setIsLoading(false);
  }

  useIonViewWillEnter(() => {
    loadUserInfo();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Perfil de Usuario</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Perfil de Usuario</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="card-container">
          <IonCard className="profile-card">
            <img src={userInfo?.avatar_url} alt="Avatar" className="profile-avatar" />
            <IonCardHeader className="profile-card-header">
              <IonCardTitle>{userInfo?.name}</IonCardTitle>
              <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <p>{userInfo?.bio}</p>
            </IonCardContent>
          </IonCard>
        </div>
        <LoadingSpinner isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
