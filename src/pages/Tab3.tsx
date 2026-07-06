import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Tab3.css";
import { useState } from "react";
import { getUserInfo } from "../services/GithubService";
import { GithubUser } from "../interfaces/GithubUser";
import LoadingSpinner from "../components/LoadingSpinner";
import { useHistory } from "react-router";
import AuthService from "../services/AuthService";
import { logOutOutline } from "ionicons/icons";

const Tab3: React.FC = () => {
  const [userInfo, setUserInfo] = useState<GithubUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const history = useHistory();

  const loadUserInfo = async () => {
    setIsLoading(true);
    getUserInfo()
      .then((userData) => {
        setUserInfo(userData);
      })
      .catch((error) => {
        setErrorMsg(
          "Error al obtener la información del usuario: " + error.message,
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = () => {
    AuthService.logout();
    history.push("/login");
  };

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

        {userInfo && (
          <div className="card-container">
            <IonCard className="profile-card">
              <img
                src={userInfo?.avatar_url}
                alt="Avatar"
                className="profile-avatar"
              />
              <IonCardHeader className="profile-card-header">
                <IonCardTitle>{userInfo?.name}</IonCardTitle>
                <IonCardSubtitle>{userInfo?.login}</IonCardSubtitle>
              </IonCardHeader>
              <IonCardContent>
                <p>{userInfo?.bio}</p>{" "}
              </IonCardContent>
            </IonCard>
            <IonButton expand="block" color="danger" onClick={logout}>
              <IonIcon icon={logOutOutline} slot="start" />
              Salir
            </IonButton>
          </div>
        )}
        {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}
        <LoadingSpinner isOpen={isLoading} />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;