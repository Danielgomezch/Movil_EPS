import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { crearMedico, editarMedico } from "../../Src/Services/MedicoService";

export default function EditarMedicosScreen() {
    const navigation = useNavigation();
    const route = useRoute();
    const medico = route.params?.medico;

    // Estados para los campos del formulario
    const [nombre, setNombre] = useState(medico?.nombre || "");
    const [apellido, setApellido] = useState(medico?.apellido || "");
    const [num_documento, setNum_documento] = useState(medico?.num_documento?.toString() || "");
    const [tipo_documento, setTipo_documento] = useState(medico?.tipo_documento || "");
    const [telefono, setTelefono] = useState(medico?.telefono || "");
    const [correo, setCorreo] = useState(medico?.correo || "");
    const [idConsultorio, setIdConsultorio] = useState(medico?.idConsultorio?.toString() || "");
    const [idEspecialidad, setIdEspecialidad] = useState(medico?.idEspecialidad?.toString() || "");
    const [activo, setActivo] = useState(medico?.activo || "");
    const [reg_medicos, setRegMedicos] = useState(medico?.reg_medicos || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!medico;

    // --- FUNCIÓN DE GUARDADO MEJORADA Y MÁS ROBUSTA ---
    const handleGuardar = async () => {
        // Validación más específica para cada campo
        if (!nombre.trim()) return Alert.alert("Error", "El campo 'Nombre' es obligatorio.");
        if (!apellido.trim()) return Alert.alert("Error", "El campo 'Apellido' es obligatorio.");
        if (!num_documento.trim()) return Alert.alert("Error", "El campo 'Número de Documento' es obligatorio.");
        if (!tipo_documento.trim()) return Alert.alert("Error", "El campo 'Tipo de Documento' es obligatorio.");
        if (!telefono.trim()) return Alert.alert("Error", "El campo 'Teléfono' es obligatorio.");
        if (!correo.trim()) return Alert.alert("Error", "El campo 'Correo' es obligatorio.");
        if (!idConsultorio.trim()) return Alert.alert("Error", "El campo 'ID del Consultorio' es obligatorio.");
        if (!idEspecialidad.trim()) return Alert.alert("Error", "El campo 'ID de la Especialidad' es obligatorio.");
        if (!activo.trim()) return Alert.alert("Error", "El campo 'Estado' es obligatorio.");
        if (!reg_medicos.trim()) return Alert.alert("Error", "El campo 'Registro Médico' es obligatorio.");
        
        setLoading(true);

        // Se preparan los datos para enviar, asegurando que los números son válidos
        const datosMedico = {
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            num_documento: parseInt(num_documento, 10),
            tipo_documento: tipo_documento.trim(),
            telefono: telefono.trim(),
            correo: correo.trim(),
            idConsultorio: parseInt(idConsultorio, 10),
            idEspecialidad: parseInt(idEspecialidad, 10),
            activo: activo.trim(),
            reg_medicos: reg_medicos.trim(),
        };

        try {
            let result;
            if (esEdicion) {
                result = await editarMedico(medico.id, datosMedico);
            } else {
                result = await crearMedico(datosMedico);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Médico actualizado" : "Médico creado");
                navigation.goBack();
            } else {
                Alert.alert("Error al Guardar", result.message || "No se pudo completar la operación.");
            }
        } catch (error) {
            // Loguea el error completo en la consola para una mejor depuración
            console.error("Error capturado en el componente:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar el médico.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
                <Text style={styles.titulo}>{esEdicion ? 'Editar Médico' : 'Nuevo Médico'}</Text>

                <TextInput style={styles.input} placeholder="Nombre" value={nombre} onChangeText={setNombre} />
                <TextInput style={styles.input} placeholder="Apellido" value={apellido} onChangeText={setApellido} />
                <TextInput style={styles.input} placeholder="Número de Documento" value={num_documento} onChangeText={setNum_documento} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Tipo de Documento (CC, CE, etc.)" value={tipo_documento} onChangeText={setTipo_documento} />
                <TextInput style={styles.input} placeholder="Teléfono" value={telefono} onChangeText={setTelefono} keyboardType="phone-pad" />
                <TextInput style={styles.input} placeholder="Correo Electrónico" value={correo} onChangeText={setCorreo} keyboardType="email-address" autoCapitalize="none" />
                <TextInput style={styles.input} placeholder="ID del Consultorio" value={idConsultorio} onChangeText={setIdConsultorio} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="ID de la Especialidad" value={idEspecialidad} onChangeText={setIdEspecialidad} keyboardType="numeric" />
                <TextInput style={styles.input} placeholder="Estado (ej: Activo)" value={activo} onChangeText={setActivo} />
                <TextInput style={styles.input} placeholder="Registro Médico" value={reg_medicos} onChangeText={setRegMedicos} />

                <TouchableOpacity style={styles.button} onPress={handleGuardar} disabled={loading}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={styles.buttonText}>Guardar Médico</Text>}
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    keyboardContainer: { flex: 1 },
    scrollContainer: { flexGrow: 1, padding: 20, paddingBottom: 40 },
    titulo: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center", color: "#333" },
    input: {
        backgroundColor: "#f8f8f8",
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 15,
    },
    button: {
        backgroundColor: "#007BFF", // Un color más estándar para el botón
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 10,
    },
    buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});