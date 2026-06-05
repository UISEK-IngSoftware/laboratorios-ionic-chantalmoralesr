import "./RepoItem.css";
import React from "react";
import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonThumbnail } from "@ionic/react";
import { pencil, trash } from "ionicons/icons";

interface RepoProps {
    name: string;
    description: string;
    language: string;
    avatarUrl: string;
}

const RepoItem: React.FC<RepoProps> = ({ name, description, language, avatarUrl }) => {
    return (
        <IonItemSliding>
            <IonItem>
                <IonThumbnail slot="start">
                    <img src={avatarUrl} alt={`${name} avatar`} />
                </IonThumbnail>
                <IonLabel>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Lenguaje: {language}</p>
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
    )
};

export default RepoItem;