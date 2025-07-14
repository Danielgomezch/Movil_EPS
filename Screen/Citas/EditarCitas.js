import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";  
import { useNavigation, useRoute } from "@react-navigation/native";  
import { crearCitas, editarCitas } from "../../Src/Services/PacienteService";  
// Componente principal EditarCitaScreen
export default function EditarCitaScreen() {
  const navigation = useNavigation();  // Hook para la navegación
  const route = useRoute();  // Hook para acceder a los parámetros de la ruta

  const citas = route.params?.citas;  // Obtiene la cita a editar desde los parámetros de la ruta

  // Estados para los campos del formulario
  const [idPacientes, setIdPacientes] = useState(citas?.id?.toString() || "");
  const [idMedicos, setIdMedicos] = useState(citas?.idMedicos?.toString() || "");
  const [fecha, setFecha] = useState(citas?.fecha?.toString() || "");
  const [hora, setHora] = useState(citas?.hora?.toString() || "");
  const [estado, setEstado] = useState(citas?.estado?.toString() || "");
  const [motivo, setMotivo] = useState(citas?.motivo?.toString() || "");
  const [observacion, setObservacion] = useState(citas?.observacion?.toString() || "");
  const [tipo_consulta, setTipo_consulta] = useState(citas?.tipo_consulta?.toString() || "");
  const [loading, setLoading] = useState(false);  // Estado para controlar el loading

  const esEdicion = !!citas;  // Determina si es una edición o una nueva creación

  // Función para manejar el guardado del paciente
  const handleGuardar = async () => {
    // Validación de campos obligatorios
    if (!idPacientes || !idMedicos || !fecha || !hora || !estado || !motivo || !observacion || !tipo_consulta) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);  // Activa el loading
    try {
      let result;

      // Llama a la función de editar o crear según corresponda
      if (esEdicion) {
        result = await editarCita(citas.id, {
          fecha,
          hora,
          estado,
          motivo,
          observacion,
          tipo_consulta
        });
      } else {
        result = await crearCitas({ idPacientes, idMedicos, fecha, hora, estado, motivo, observacion, tipo_consulta });
      }

      // Manejo de la respuesta
      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
        navigation.goBack();  // Regresa a la pantalla anterior
      } else {
        Alert.alert("Error", result.message || "Error al guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "Error al guardar la cita");
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
        <Text style={styles.titulo}>Nueva Cita</Text>

        {/* Campos del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="Fecha de la cita"
            value={fecha}
            onChangeText={setFecha}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="Hora de la cita"
            value={hora}
            onChangeText={setHora}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Estado</Text>
          <TextInput
            style={styles.input}
            placeholder="Estado de la cita"
            value={estado}
            onChangeText={setEstado}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Motivo</Text>
          <TextInput
            style={styles.input}
            placeholder="Motivo de la cita"
            value={motivo}
            onChangeText={setMotivo}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Observación</Text>
          <TextInput
            style={styles.input}
            placeholder="Observación"
            value={observacion}
            onChangeText={setObservacion}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>tipo_consulta</Text>
          <TextInput
            style={styles.input}
            placeholder="tipo_consulta"
            value={tipo_consulta}
            onChangeText={setTipo_consulta}
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
              <Text style={styles.buttonText}>Guardar Cita</Text>
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