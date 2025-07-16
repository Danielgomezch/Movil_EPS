import { useEffect } from "react";
import AppNavegacion from "./Src/Navegation/AppNavegacion";
import * as Notifications from "expo-notifications";
import { View, Button } from "react-native";

export default function App() {
  useEffect(() => {
    // como se deben manejar las notificaciones cuando la app esta abierta
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Muestra la notificacion como alerta
        shouldPlaySound: true, // Reproduce un sonido cuando se recibe la notificacion
        shouldSetBadge: false, // No cambia el icono de la app
      }),
    });

    const getPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Se requiere permisos para recibir notificaciones");
      }
    };
    getPermissions();
  }, []);

  const enviarNotidicacionLocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola!",
        body: "Esta es una notificacion local de prueba",
      },
      trigger: { seconds: 2 }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppNavegacion />
      <Button title="Enviar Notificacion Local" onPress={enviarNotidicacionLocal} />
    </View>
  );
}
