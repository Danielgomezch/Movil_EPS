import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../Src/Services/conexion";
import { logoutUser } from "../../Src/Services/AuthService";
import { Ionicons } from "@expo/vector-icons";

/**
 * PantallaPerfil - Componente que gestiona la pantalla de perfil del usuario.
 *
 * Esta pantalla permite al usuario autenticado ver su información personal, como nombre y correo.
 * Ofrece funcionalidades para editar estos datos, cambiar la contraseña y cerrar la sesión en la aplicación.
 * Utiliza el estado local para manejar la interfaz de edición y se comunica con una API para
 * persistir los cambios.
 *
 * Ejemplo de uso en un Stack Navigator:
 * <Stack.Screen name="Perfil" component={PantallaPerfil} />
 */

export default function PantallaPerfil({ navigation }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) return;

        const response = await api.get("/listarUsuarios");
        setUsuario(response.data);
        setEditedName(response.data.user.name);
        setEditedEmail(response.data.user.email);
      } catch (error) {
        console.error("Error al cargar perfil:", error);
        Alert.alert("Error", "No se pudo cargar la información del perfil");
      } finally {
        setLoading(false);
      }
    };

    cargarPerfil();
  }, []);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      await api.put(
        `/editarUsuario/${usuario.user.id}`,
        {
          name: editedName,
          email: editedEmail,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUsuario({
        ...usuario,
        user: {
          ...usuario.user,
          name: editedName,
          email: editedEmail,
        },
      });

      setEditing(false);
      Alert.alert("Éxito", "Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar:", error);
      Alert.alert("Error", "No se pudo actualizar el perfil");
    }
  };

  const handleChangePassword = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) return;

      await api.put(
        `/cambiarContrasena/${usuario.user.id}`,
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Alert.alert("Éxito", "Contraseña cambiada correctamente");
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error al cambiar la contraseña:", error);
      Alert.alert("Error", "No se pudo cambiar la contraseña");
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007B8C" />
      </View>
    );
  }

  if (!usuario) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Perfil de Usuario</Text>
        <Text style={styles.errorText}>
          No se pudo cargar la información del perfil
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>My Profile</Text>
      </View>

      <View style={styles.card}>
        {editing ? (
          <>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#666" />
              <TextInput
                style={styles.editInput}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Nombre"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#666" />
              <TextInput
                style={styles.editInput}
                value={editedEmail}
                onChangeText={setEditedEmail}
                keyboardType="email-address"
                placeholder="Email"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="lock-closed" size={20} color="#666" />
              <TextInput
                style={styles.editInput}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                secureTextEntry
                placeholder="Contraseña Actual"
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="lock-closed" size={20} color="#666" />
              <TextInput
                style={styles.editInput}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                placeholder="Nueva Contraseña"
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.infoRow}>
              <Ionicons name="person" size={20} color="#666" />
              <Text style={styles.infoText}>
                {usuario?.user?.name || "Nombre no disponible"}
              </Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Ionicons name="mail" size={20} color="#666" />
              <Text style={styles.infoText}>
                {usuario?.user?.email || "Email no disponible"}
              </Text>
            </View>
          </>
        )}
      </View>

      {editing ? (
        <>
          <TouchableOpacity
            onPress={handleSave}
            style={[styles.editButton, styles.saveButton]}
          >
            <Ionicons name="save-outline" size={22} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Guardar Cambios</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleChangePassword}
            style={[styles.editButton, styles.saveButton]}
          >
            <Ionicons name="key-outline" size={22} color="#FFFFFF" />
            <Text style={styles.editButtonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          onPress={() => setEditing(true)}
          style={styles.editButton}
        >
          <Ionicons name="create-outline" size={22} color="#FFFFFF" />
          <Text style={styles.editButtonText}>Editar Perfil</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={async () => {
          await logoutUser();
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        <Text style={styles.editButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,

    backgroundColor: "#F0F4F8",

    alignItems: "center",
  },

  loadingContainer: {
    flex: 1,

    justifyContent: "center",

    alignItems: "center",

    backgroundColor: "#F0F4F8",
  },

  header: {
    alignItems: "center",

    paddingVertical: 30,
  },

  title: {
    color: "#2C3E50",

    fontSize: 26,

    fontWeight: "bold",

    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",

    borderRadius: 15,

    padding: 25,

    marginHorizontal: 20,

    marginBottom: 30,

    elevation: 5,

    width: "90%",
  },

  infoRow: {
    flexDirection: "row",

    alignItems: "center",

    paddingVertical: 15,
  },

  infoText: {
    color: "#34495E",

    fontSize: 18,

    marginLeft: 15,

    fontWeight: "500",
  },

  editInput: {
    flex: 1,

    color: "#34495E",

    fontSize: 18,

    marginLeft: 15,

    fontWeight: "500",

    padding: 0,

    borderBottomWidth: 1,

    borderBottomColor: "#8E44AD",
  },

  divider: {
    height: 1,

    backgroundColor: "#BDC3C7",

    marginVertical: 10,
  },

  editButton: {
    flexDirection: "row",

    backgroundColor: "#8E44AD",

    borderRadius: 25,

    padding: 15,

    marginHorizontal: 20,

    alignItems: "center",

    marginBottom: 15,

    width: "45%",

    borderWidth: 1,

    borderColor: "#8E44AD",
  },

  saveButton: {
    backgroundColor: "#8E44AD",
  },

  logoutButton: {
    flexDirection: "row",

    backgroundColor: "#E74C3C",

    borderRadius: 25,

    padding: 15,

    marginHorizontal: 20,

    alignItems: "center",

    marginBottom: 15,

    width: "45%",

    borderWidth: 1,

    borderColor: "#E74C3C",
  },

  editButtonText: {
    color: "#FFFFFF",

    fontSize: 16,

    fontWeight: "600",

    marginLeft: 10,
  },

  errorText: {
    color: "#E74C3C",

    fontSize: 16,

    textAlign: "center",
  },
});
