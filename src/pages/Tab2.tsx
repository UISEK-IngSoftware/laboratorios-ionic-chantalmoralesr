import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Tab2.css';

const Tab2: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Formulario de Repositorio</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Formulario de Repositorio</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            label="Nombre del Repositorio"
            labelPlacement="floating"
            className="form-field"
            placeholder="Ingrese el nombre del repositorio"
          />
          <IonInput
            label="Descripción"
            labelPlacement="floating"
            className="form-field"
            placeholder="Ingrese una descripción breve"
          />
          <IonButton
            className="form-field"
            expand="block"
            fill="solid" >
            Agregar Repositorio
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
