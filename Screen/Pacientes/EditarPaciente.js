import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native-web";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearPaciente, editarPaciente } from "../../Src/Services/PacienteService";

export default function EditarPaciente() {
  const navigation = useNavigation();
  const route = useRoute();
  const paciente = route.params?.paciente || {};
  const [nombre, setNombre] = useState(paciente.nombre || "");
  const [edad, setEdad] = useState(paciente.edad || "");
  const [telefono, setTelefono] = useState(paciente.telefono || "");
  const [direccion, setDireccion] = useState(paciente.direccion || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!paciente;

  const handleGuardar = async () => {
    if (!nombre || !edad || !telefono || !direccion) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);
    try {
      let result;
      if (esEdicion) {
        result = await editarPaciente({
          id: paciente.id,
          nombre,
          edad,
          telefono,
          direccion,
        });
      } else {
        result = await crearPaciente({ nombre, edad, telefono, direccion });
      }
      if (result.success) {
        Alert.alert(
          "Éxito",
          esEdicion ? "Paciente Actualizado" : "Paciente Creado"
        );
        navigation.goBack();
      } else {
        Alert.alert(
          "Error",
          result.message || "Ocurrió un error al guardar el paciente"
        );
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al guardar el paciente");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {esEdicion ? "Editar Paciente" : "Crear Paciente"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Edad"
        value={edad}
        onChangeText={setEdad}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Dirección"
        value={direccion}
        onChangeText={setDireccion}
      />
      <TouchableOpacity
        style={styles.boton}
        onPress={handleGuardar}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botonTexto}>
            {esEdicion ? "Actualizar" : "Crear"}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  boton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    borderRadius: 5,
  },
  botonTexto: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
});