import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function ListarCitas({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listar Citas</Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("DetalleCitas")}
            >
                <Text style={styles.buttonText}>Ver Citas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("EditarCitas")}
            >
                <Text style={styles.buttonText}>Editar Citas</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5", 
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    button: {
        backgroundColor: "#007BFF", 
        padding: 15,
        borderRadius: 5,
        marginVertical: 10,
        width: "80%",
        alignItems: "center", 
    },
    buttonText: {
        color: "#FFFFFF", 
        fontSize: 18,
        fontWeight: "600",
    },
});
