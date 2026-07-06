import "./RepoItem.css";
import React, { useRef, useState } from "react";
import {
  IonAlert,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import { pencil, trash } from "ionicons/icons";
import { useHistory } from "react-router";
import { Repository } from "../interfaces/Repository";
import { deleteRepository } from "../services/GithubService";

interface RepoItemProps {
  repository: Repository;
  onChanged: () => void;
}

const RepoItem: React.FC<RepoItemProps> = ({ repository, onChanged }) => {
  const history = useHistory();
  const slidingRef = useRef<HTMLIonItemSlidingElement>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const handleEdit = async () => {
    await slidingRef.current?.close();
    history.push("/tab2", { repository });
  };

  const handleDelete = async () => {
    try {
      await deleteRepository(repository.owner.login, repository.name);
    } finally {
      await slidingRef.current?.close();
      onChanged();
    }
  };

  return (
    <>
      <IonItemSliding ref={slidingRef}>
        <IonItem>
          <IonThumbnail slot="start">
            <img src={repository.owner.avatar_url} alt={repository.name} />
          </IonThumbnail>
          <IonLabel className="repo-item-label">
            <h2>{repository.name}</h2>
            <p>{repository.description}</p>
            <p>Lenguaje: {repository.language ?? "No especificado"}</p>
          </IonLabel>
        </IonItem>
        <IonItemOptions>
          <IonItemOption onClick={handleEdit}>
            <IonIcon icon={pencil} slot="icon-only" />
          </IonItemOption>
          <IonItemOption color="danger" onClick={() => setShowDeleteAlert(true)}>
            <IonIcon icon={trash} slot="icon-only" />
          </IonItemOption>
        </IonItemOptions>
      </IonItemSliding>

      <IonAlert
        isOpen={showDeleteAlert}
        header="Eliminar repositorio"
        message={`¿Estás seguro de que deseas eliminar el repositorio "${repository.name}"? Esta acción es permanente.`}
        buttons={[
          {
            text: "Cancelar",
            role: "cancel",
            handler: () => {
              slidingRef.current?.close();
            },
          },
          {
            text: "Eliminar",
            role: "destructive",
            handler: handleDelete,
          },
        ]}
        onDidDismiss={() => setShowDeleteAlert(false)}
      />
    </>
  );
};

export default RepoItem;
