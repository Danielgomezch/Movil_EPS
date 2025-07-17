import { useEffect } from "react";
import AppNavegacion from "./Src/Navegation/AppNavegacion";
import * as Notifications from "expo-notifications";
import { View, Button } from "react-native";

/**
 * App - Componente principal de la aplicación.
 *
 * Este componente configura las notificaciones utilizando Expo y renderiza la navegación de la aplicación.
 * También incluye un botón para enviar una notificación local de prueba.
 *
 * Ejemplo de uso:
 * <App />
 */
export default function App() {
  useEffect(() => {
    // Configura cómo se deben manejar las notificaciones cuando la app está abierta
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true, // Muestra la notificación como alerta
        shouldPlaySound: true, // Reproduce un sonido cuando se recibe la notificación
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

  /**
   * enviarNotidicacionLocal - Función para enviar una notificación local.
   *
   * Esta función programa una notificación local que se mostrará después de 2 segundos.
   */
  const enviarNotidicacionLocal = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "¡Hola!",
        body: "Esta es una notificación local de prueba",
      },
      trigger: { seconds: 2 }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <AppNavegacion />
      <Button title="Enviar Notificación Local" onPress={enviarNotidicacionLocal} />
    </View>
  );
}
