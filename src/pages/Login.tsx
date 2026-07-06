import React, { useState } from "react";
import "./Login.css";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { logoGithub } from "ionicons/icons";
import AuthService from "../services/AuthService";

export const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMsg("");
    if (username.trim() === "" || token.trim() === "") {
      setErrorMsg("Por favor, ingrese un nombre de usuario y una contraseña.");
      return;
    }
    if (AuthService.login(username, token)) {
      window.location.href = "/tab1";
    } else {
      setErrorMsg("Nombre de usuario o contraseña incorrectos.");
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Iniciar Sesión</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Iniciar Sesión</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="login-container">
          <form className="login-form" onSubmit={handleLogin}>
            <IonIcon icon={logoGithub} className="login-icon" />
            <IonInput
              className="login-field"
              label="Nombre de usuario"
              labelPlacement="floating"
              fill="outline"
              type="text"
              value={username}
              onIonChange={(e) => setUsername(e.detail.value || "")}
            />
            <IonInput
              className="login-field"
              label="Contraseña"
              labelPlacement="floating"
              fill="outline"
              type="password"
              value={token}
              onIonChange={(e) => setToken(e.detail.value || "")}
            />

            {errorMsg !== "" && <IonText color="danger">{errorMsg}</IonText>}

            <IonButton className="login-button" expand="block" type="submit">
              Iniciar Sesión
            </IonButton>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;