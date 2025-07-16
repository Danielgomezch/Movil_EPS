import React, { useState, useEffect, use } from "react";
import { View, Text, Switch, Alert, Button } from "react-native";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Configuración() {
  const [permisosNotificaciones, setPermisosNotificaciones] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkPermisos = async () => {
      const { status } = await Notifications.getPermissionsAsync();
      const preferencia = await AsyncStorage.getItem("notificaciones_activas");
      setPermisosNotificaciones(status === "granted" && preferencia === "true");
      setLoading(false);
    };
    checkPermisos();
  }, []);

  const toggleSwitch = async (valor) => {
    if (valor) {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status === "granted") {
        await AsyncStorage.setItem("notificaciones_activas", "true");
        setPermisosNotificaciones(true);
        Alert.alert("Permiso concedido", "Ahora puedes recibir notificaciones");
      } else {
        await AsyncStorage.setItem("notificaciones_activas", "false");
        setPermisosNotificaciones(false);
        Alert.alert("Permiso denegado", "No podrás recibir notificaciones");
      }
    } else {
      await AsyncStorage.setItem("notificaciones_activas", "false");
      setPermisosNotificaciones(false);
      Alert.alert(
        "Desactivado",
        "Si quieres desactivar completamente las notificaciones, hazlo desde la configuracion de tu dispositivo."
      );
    }
  };

  if (loading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Cargando configuracion...</Text>
    </View>;
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 18, marginTop: 10 }}>
        Notificaciones: {permisosNotificaciones ? "Activadas" : "Desactivadas"}
      </Text>
      <Switch value={permisosNotificaciones} onValueChange={toggleSwitch} />
    </View>
  );
}
