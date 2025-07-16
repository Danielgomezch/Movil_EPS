import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";  
import { useNavigation, useRoute } from "@react-navigation/native";  
import { crearPasientes, editarPasientes } from "../../Src/Services/PacienteService";  
// Componente principal EditarPasientesScreen
export default function EditarPasientesScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const pasientes = route.params?.pasientes;  // Obtiene el paciente a editar desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [nombre, setNombre] = useState(pasientes?.nombre?.toString() || "");
  const [apellido, setApellido] = useState(pasientes?.apellido?.toString() || "");
  const [num_documento, setNum_documento] = useState(pasientes?.num_documento?.toString() || "");
  const [tipo_documento, setTipo_documento] = useState(pasientes?.tipo_documento?.toString() || "");
  const [genero, setGenero] = useState(pasientes?.genero?.toString() || "");
  const [telefono, setTelefono] = useState(pasientes?.telefono?.toString() || "");
  const [correo, setCorreo] = useState(pasientes?.correo?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!pasientes;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del paciente
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!nombre || !apellido || !num_documento || !tipo_documento || !genero || !telefono || !correo) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true); 
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarPasientes(pasientes.id, {
          nombre,
          apellido,
          num_documento: parseInt(num_documento),
          tipo_documento,
          genero,
          telefono,
          correo
        });
      } else {
        result = await crearPasientes({ nombre, apellido, num_documento, tipo_documento, genero, telefono, correo });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Paciente actualizado" : "Paciente creado");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar el paciente");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar el paciente");
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>Nuevo Paciente</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nombre del paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del paciente"
            value={nombre}
            onChangeText={setNombre}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Apellido del paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido del paciente"
            value={apellido}
            onChangeText={setApellido}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Número de documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Número de documento"
            value={num_documento}
            onChangeText={setNum_documento}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Tipo de documento</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de documento"
            value={tipo_documento}
            onChangeText={setTipo_documento}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Género</Text>
          <TextInput
            style={styles.input}
            placeholder="Género"
            value={genero}
            onChangeText={setGenero}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Teléfono</Text>
          <TextInput
            style={styles.input}
            placeholder="Teléfono"
            value={telefono}
            onChangeText={setTelefono}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Correo electrónico</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={correo}
            onChangeText={setCorreo}
            keyboardType="email-address"
          />
        </View>

        {/* Botón para guardar el paciente */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGuardar}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.buttonText}>Guardar paciente</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: "#555",
  },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: "#88CCFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});