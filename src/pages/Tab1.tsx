import { IonContent, IonHeader, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab1.css';
import RepoItem from '../components/RepoItem';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle >Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          <RepoItem
            name="Nombre del Repositorio 1"
            description="Descripción breve del repositorio"
            language="JavaScript"
            avatarUrl="https://avatars.githubusercontent.com/u/1?v=4"
          />
          <RepoItem
            name="Nombre del Repositorio 2"
            description="Descripción breve del repositorio"
            language="Python"
            avatarUrl="https://avatars.githubusercontent.com/u/2?v=4"
          />
          <RepoItem
            name="Nombre del Repositorio 3"
            description="Descripción breve del repositorio"
            language="Java"
            avatarUrl="https://avatars.githubusercontent.com/u/3?v=4"
          />
          <RepoItem
            name="Nombre del Repositorio 4"
            description="Descripción breve del repositorio"
            language="C#"
            avatarUrl="https://avatars.githubusercontent.com/u/4?v=4"
          />
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
