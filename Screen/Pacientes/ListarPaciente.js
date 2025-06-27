import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarPaciente({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Pacientes</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetallePaciente")}
            >
                <Text style={styles.buttonText}>Ver Paciente</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarPaciente")}
            >
                <Text style={styles.buttonText}>Editar Paciente</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", // Color de fondo
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007BFF", // Color de fondo del botón
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: "80%", // Ancho del botón
        alignItems: "center", // Centrar texto
    },
    buttonText: {
        color: "#FFFFFF", // Color del texto del botón
        fontSize: 18,
        fontWeight: "600",
    },
});
