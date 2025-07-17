import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarMedicos, eliminarMedico } from "../../Src/Services/MedicoService";
import MedicoCard from "../../components/medicoCard";

/**
 * ListarMedicosScreen - Componente para listar los médicos registrados.
 *
 * Este componente permite a los usuarios ver una lista de médicos registrados,
 * así como la opción de eliminar o editar cada médico. También permite crear un nuevo médico.
 *
 * Props:
 * - No se requieren props directamente, ya que utiliza el contexto de navegación.
 *
 * Ejemplo de uso:
 * <ListarMedicosScreen />
 */
export default function ListarMedicosScreen() {
    const [medicos, setMedicos] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCargarMedicos = async () => {
        setLoading(true);
        try {
            const result = await listarMedicos();
            if (result.success) {
                // Se añade robustez para manejar datos directos o anidados
                setMedicos(result.data.data || result.data || []);
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar los médicos");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar los médicos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleCargarMedicos);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar médico",
            "¿Estás seguro que deseas eliminar este médico?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Usar el nombre de función correcto "eliminarMedico"
                            const result = await eliminarMedico(id);
                            if (result.success) {
                                handleCargarMedicos();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar el médico");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar el médico");
                        }
                    },
                },
            ]
        );
    };

    const handleEditar = (medico) => {
        navigation.navigate("editarMedicos", { medico });
    };

    const handleCrear = () => {
        navigation.navigate("editarMedicos");
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
                data={medicos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <MedicoCard
                        medico={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay médicos registrados</Text>}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <TouchableOpacity style={styles.boton} onPress={handleCrear}>
                <Text style={styles.botonTexto}>Crear médico</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

// Estilos del componente
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
        position: "absolute",
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
