import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Tab1.css";
import RepoItem from "../components/RepoItem";
import { useState } from "react";
import { Repository } from "../interfaces/Repository";
import { fetchRepositories } from "../services/GithubService";
import LoadingSpinner from "../components/LoadingSpinner";

const Tab1: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const loadRepositories = async () => {
    setIsLoading(true);
    fetchRepositories()
      .then((reposData) => {
        setRepositories(reposData);
        setIsLoading(false);
      })
      .catch((error) => {
        setErrorMsg("Error obteniendo repositorios: " + error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useIonViewWillEnter(() => {
    loadRepositories();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Repositorios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Repositorios</IonTitle>
          </IonToolbar>
        </IonHeader>
        {!isLoading && repositories.length > 0 && (
          <IonList>
            {repositories.map((repository) => (
              <RepoItem key={repository.id} {...repository} />
            ))}
          </IonList>
        )}
        <LoadingSpinner isOpen={isLoading} />
        {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
      </IonContent>
    </IonPage>
  );
};

export default Tab1;