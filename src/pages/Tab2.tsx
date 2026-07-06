import { useHistory } from "react-router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Tab2.css";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { createRepository } from "../services/GithubService";
import { useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab2: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const repoFormData: RepositoryPayload = {
    name: "",
    description: "",
  };

  const setFormName = (value: string) => {
    repoFormData.name = value;
  };

  const setFormDescription = (value: string) => {
    repoFormData.description = value;
  };

  const saveRepository = async () => {
    if (repoFormData.name.trim() === "") {
      setErrorMsg("El nombre del repositorio es requerido");
      return;
    }
    setIsLoading(true);
    createRepository(repoFormData)
      .then((newRepo) => {
        if (newRepo) {
          setFormName("");
          setFormDescription("");
          setErrorMsg("");
          history.push("/tab1");
        } else {
          setErrorMsg("Error al crear el repositorio");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        setErrorMsg("Error al crear el repositorio: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
            value={repoFormData.name}
            onIonChange={(e) => setFormName(e.detail.value!)}
          />
          <IonInput
            label="Descripción"
            labelPlacement="floating"
            className="form-field"
            placeholder="Ingrese una descripción breve"
            value={repoFormData.description}
            onIonChange={(e) => setFormDescription(e.detail.value!)}
          />

          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}

          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            onClick={saveRepository}
            disabled={isLoading}
          >
            Guardar Repositorio
          </IonButton>
        </div>
        <LoadingSpinner isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;