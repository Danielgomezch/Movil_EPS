import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Platform,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { crearCitas, editarCitas } from "../../Src/Services/CitaService";

export default function EditarCitasScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const cita = route.params?.cita;

  // Se añaden los tres estados para los IDs 
  const [idPasientes, setIdPasientes] = useState(
    cita?.idPasientes?.toString() || ""
  );
  const [idMedicos, setIdMedicos] = useState(cita?.idMedicos?.toString() || "");
  const [idConsultorios, setIdConsultorios] = useState(
    cita?.idConsultorios?.toString() || ""
  );

  // Resto de los estados
  const [fecha, setFecha] = useState(cita?.fecha || "");
  const [hora, setHora] = useState(cita?.hora || "");
  const [estado, setEstado] = useState(cita?.estado || "");
  const [motivo, setMotivo] = useState(cita?.motivo || "");
  const [observacion, setObservacion] = useState(cita?.observacion || "");
  const [tipo_consulta, setTipo_consulta] = useState(cita?.tipo_consulta || "");
  const [loading, setLoading] = useState(false);

  const esEdicion = !!cita;

  const handleGuardar = async () => {
    //  Se valida que los tres IDs estén presentes
    if (
      !idPasientes ||
      !idMedicos ||
      !idConsultorios ||
      !fecha ||
      !hora ||
      !estado ||
      !motivo ||
      !observacion ||
      !tipo_consulta
    ) {
      Alert.alert("Error", "Todos los campos son obligatorios");
      return;
    }
    setLoading(true);

    try {
      //  Se envían los tres IDs a la API 
      const datosCita = {
        idPasientes: parseInt(idPasientes, 10),
        idMedicos: parseInt(idMedicos, 10),
        idConsultorios: parseInt(idConsultorios, 10),
        fecha,
        hora,
        estado,
        motivo,
        observacion,
        tipo_consulta,
      };

      let result;
      if (esEdicion) {
        result = await editarCitas(cita.id, datosCita);
      } else {
        result = await crearCitas(datosCita);
      }

      if (result.success) {
        Alert.alert("Éxito", esEdicion ? "Cita actualizada" : "Cita creada");
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Nueva cita creada",
            body: `Se ha creado una nueva cita para el ${fecha} a las ${hora}.`,
          },
          trigger: { seconds: 2 },
        });
        navigation.goBack();
      } else {
        Alert.alert("Error", result.message || "Error al guardar la cita");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error inesperado al guardar la cita.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.titulo}>
          {esEdicion ? "Editar Cita" : "Nueva Cita"}
        </Text>

        {/*  Se añaden los tres campos de ID */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID del Paciente</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el ID del paciente"
            value={idPasientes}
            onChangeText={setIdPasientes}
            keyboardType="numeric"
            editable={!esEdicion}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID del Médico</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el ID del médico"
            value={idMedicos}
            onChangeText={setIdMedicos}
            keyboardType="numeric"
            editable={!esEdicion}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>ID del Consultorio</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingrese el ID del consultorio"
            value={idConsultorios}
            onChangeText={setIdConsultorios}
            keyboardType="numeric"
            editable={!esEdicion}
          />
        </View>

        {/* Resto del formulario */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Fecha</Text>
          <TextInput
            style={styles.input}
            placeholder="AAAA-MM-DD"
            value={fecha}
            onChangeText={setFecha}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Hora</Text>
          <TextInput
            style={styles.input}
            placeholder="HH:MM:SS"
            value={hora}
            onChangeText={setHora}
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
          <Text style={styles.label}>Tipo de Consulta</Text>
          <TextInput
            style={styles.input}
            placeholder="Tipo de consulta"
            value={tipo_consulta}
            onChangeText={setTipo_consulta}
          />
        </View>
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

const styles = StyleSheet.create({
  keyboardContainer: { flex: 1 },
  scrollContainer: { flexGrow: 1, padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, marginBottom: 5, color: "#555" },
  input: {
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  buttonContainer: { marginTop: 20 },
  button: {
    backgroundColor: "#88CCFF",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
