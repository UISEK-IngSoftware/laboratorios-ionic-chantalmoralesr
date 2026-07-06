import { useHistory, useLocation } from "react-router";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Tab2.css";
import { RepositoryPayload } from "../interfaces/RepositoryPayload";
import { createRepository, updateRepository } from "../services/GithubService";
import { useRef, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import { Repository } from "../interfaces/Repository";

const Tab2: React.FC = () => {
  const history = useHistory();
  const location = useLocation<{ repository?: Repository }>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [editingRepo, setEditingRepo] = useState<Repository | null>(null);
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  // ubicación actual en un ref para leer siempre el estado de navegación más reciente 
  const locationRef = useRef(location);
  locationRef.current = location;

  useIonViewWillEnter(() => {
    const repository = locationRef.current.state?.repository;
    if (repository) {
      setEditingRepo(repository);
      setName(repository.name);
      setDescription(repository.description ?? "");
    } else {
      setEditingRepo(null);
      setName("");
      setDescription("");
    }
    setErrorMsg("");
  });

  const saveRepository = async () => {
    if (name.trim() === "") {
      setErrorMsg("El nombre del repositorio es requerido");
      return;
    }

    const repoFormData: RepositoryPayload = {
      name: name.trim(),
      description: description,
    };

    setIsLoading(true);

    const request = editingRepo
      ? updateRepository(editingRepo.owner.login, editingRepo.name, repoFormData)
      : createRepository(repoFormData);

    request
      .then((repo) => {
        if (repo) {
          setName("");
          setDescription("");
          setEditingRepo(null);
          setErrorMsg("");
          history.push("/tab1");
        } else {
          setErrorMsg(
            editingRepo
              ? "Error al actualizar el repositorio"
              : "Error al crear el repositorio",
          );
        }
      })
      .catch((error) => {
        setErrorMsg(
          (editingRepo
            ? "Error al actualizar el repositorio: "
            : "Error al crear el repositorio: ") + error.message,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const pageTitle = editingRepo
    ? "Editar Repositorio"
    : "Formulario de Repositorio";

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{pageTitle}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{pageTitle}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="form-container">
          <IonInput
            label="Nombre del Repositorio"
            labelPlacement="floating"
            className="form-field"
            placeholder="Ingrese el nombre del repositorio"
            value={name}
            onIonInput={(e) => setName(e.detail.value!)}
          />
          <IonInput
            label="Descripción"
            labelPlacement="floating"
            className="form-field"
            placeholder="Ingrese una descripción breve"
            value={description}
            onIonInput={(e) => setDescription(e.detail.value!)}
          />

          {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}

          <IonButton
            className="form-field"
            expand="block"
            fill="solid"
            onClick={saveRepository}
            disabled={isLoading}
          >
            {editingRepo ? "Actualizar Repositorio" : "Guardar Repositorio"}
          </IonButton>
        </div>
        <LoadingSpinner isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
