import "./RepoItem.css";
import React from "react";
import {
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonThumbnail,
} from "@ionic/react";
import { pencil, trash } from "ionicons/icons";
import { Repository } from "../interfaces/Repository";

const RepoItem: React.FC<Repository> = (repository) => {
  return (
    <IonItemSliding>
      <IonItem>
        <IonThumbnail slot="start">
          <img src={repository.owner.avatar_url} alt={repository.name} />
        </IonThumbnail>
        <IonLabel className="repo-item-label">
          <h2>{repository.name}</h2>
          <p>{repository.description}</p>
          <p>Lenguaje: {repository.language}</p>
        </IonLabel>
        <IonItemOptions>
          <IonItemOption>
            <IonIcon icon={pencil} slot="icon-only" />
          </IonItemOption>
          <IonItemOption color="danger">
            <IonIcon icon={trash} slot="icon-only" />
          </IonItemOption>
        </IonItemOptions>
      </IonItem>
    </IonItemSliding>
  );
};

export default RepoItem;