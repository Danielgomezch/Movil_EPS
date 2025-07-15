import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";

// --- CORRECCIÓN AQUÍ ---
// Se importa desde el servicio de Citas, no de Pacientes.
import { listarCitas, eliminarCitas } from "../../Src/Services/CitaService"; 
import CitasCard from "../../components/CitaCard"; // Asegúrate de que este componente exista

export default function ListarCitasScreen() {
    const [citas, setCitas] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCargarCitas = async () => {
        setLoading(true);
        try {
            const result = await listarCitas();
            if (result.success) {
                setCitas(result.data.data || result.data || []);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las citas");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las citas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleCargarCitas);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar cita",
            "¿Estás seguro que deseas eliminar esta cita?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            const result = await eliminarCitas(id);
                            if (result.success) {
                                handleCargarCitas();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la cita");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la cita");
                        }
                    },
                },
            ]
        );
    };
    
    const handleEditar = (cita) => {
    // Asegúrate de que aquí diga "editarCitas"
    navigation.navigate("editarCitas", { cita }); 
  };

  // Función para crear una nueva cita
  const handleCrear = () => {
    // Asegúrate de que aquí también diga "editarCitas"
    navigation.navigate("editarCitas");
  };

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#66B2FF" />
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={citas}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <CitasCard
                        citas={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay citas registradas</Text>}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <TouchableOpacity style={styles.boton} onPress={handleCrear}>
                <Text style={styles.botonTexto}>Crear cita</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    empty: {
        textAlign: "center",
        marginTop: 20,
        fontSize: 16,
        color: "#666",
    },
    boton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: "#66B2FF",
        padding: 15,
        borderRadius: 50,
        elevation: 5,
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});