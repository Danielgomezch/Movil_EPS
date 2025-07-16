import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Platform, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

// Se importan las funciones con el nombre correcto y en singular.
import { crearEspecialidad, editarEspecialidad } from "../../Src/Services/EspecialidadService";

// Componente principal EditarEspecialidadesScreen
export default function EditarEspecialidadesScreen() {
    const navigation = useNavigation();
    const route = useRoute();

    const especialidad = route.params?.especialidad;

    const [nombre, setNombre] = useState(especialidad?.nombre || "");
    const [descripcion, setDescripcion] = useState(especialidad?.descripcion || "");
    const [loading, setLoading] = useState(false);

    const esEdicion = !!especialidad;


    // Se simplificó y corrigió toda la lógica de guardado.
    const handleGuardar = async () => {
        if (!nombre || !descripcion) {
            Alert.alert("Error", "Todos los campos son obligatorios");
            return;
        }
        setLoading(true);

        try {
            const datosParaGuardar = { nombre, descripcion };
            let result;

            if (esEdicion) {
                result = await editarEspecialidad(especialidad.id, datosParaGuardar);
            } else {
                result = await crearEspecialidad(datosParaGuardar);
            }

            if (result.success) {
                Alert.alert("Éxito", esEdicion ? "Especialidad actualizada" : "Especialidad creada");
                navigation.goBack();
            } else {
                Alert.alert("Error", result.message || "No se pudo guardar la especialidad");
            }
        } catch (error) {
            console.error("Error inesperado al guardar:", error);
            Alert.alert("Error", "Ocurrió un error inesperado al guardar la especialidad.");
        } finally {
            setLoading(false);
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
                <Text style={styles.titulo}>{esEdicion ? 'Editar Especialidad' : 'Nueva Especialidad'}</Text>

                {/* Campos del formulario */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Nombre de la especialidad</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre de la especialidad"
                        value={nombre}
                        onChangeText={setNombre}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Descripción</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Descripción de la especialidad"
                        value={descripcion}
                        onChangeText={setDescripcion}
                    />
                </View>

                {/* Botón para guardar la especialidad */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleGuardar}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.buttonText}>Guardar especialidad</Text>
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