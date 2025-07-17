import React, { useEffect, useState } from "react";
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { listarEspecialidad, eliminarEspecialidad } from "../../Src/Services/EspecialidadService";
import EspecialidadCard from "../../components/especialidadCard";

/**
 * ListarEspecialidadesScreen - Componente para listar las especialidades registradas.
 *
 * Este componente permite a los usuarios ver una lista de especialidades registradas,
 * así como la opción de eliminar o editar cada especialidad. También permite crear una nueva especialidad.
 *
 * Props:
 * - No se requieren props directamente, ya que utiliza el contexto de navegación.
 *
 * Ejemplo de uso:
 * <ListarEspecialidadesScreen />
 */
export default function ListarEspecialidadesScreen() {
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const handleCargarEspecialidades = async () => {
        setLoading(true);
        try {
            // Se llama a la función correcta
            const result = await listarEspecialidad();
            if (result.success) {
                // Se añade la lógica para manejar datos anidados
                if (Array.isArray(result.data)) {
                    setEspecialidades(result.data);
                } else if (result.data && Array.isArray(result.data.data)) {
                    setEspecialidades(result.data.data);
                } else {
                    Alert.alert("Error de Datos", "La respuesta del servidor no tiene el formato esperado.");
                }
            } else {
                Alert.alert("Error", result.message || "No se pudieron cargar las especialidades");
            }
        } catch (error) {
            Alert.alert("Error", "No se pudieron cargar las especialidades");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", handleCargarEspecialidades);
        return unsubscribe;
    }, [navigation]);

    const handleEliminar = (id) => {
        Alert.alert(
            "Eliminar especialidad",
            "¿Estás seguro que deseas eliminar esta especialidad?",
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            // Se llama a la función correcta
                            const result = await eliminarEspecialidad(id);
                            if (result.success) {
                                handleCargarEspecialidades();
                            } else {
                                Alert.alert("Error", result.message || "No se pudo eliminar la especialidad");
                            }
                        } catch (error) {
                            Alert.alert("Error", "No se pudo eliminar la especialidad");
                        }
                    },
                },
            ]
        );
    };

    const handleEditar = (especialidad) => {
        // Se usa el nombre de la ruta de edición correcto
        navigation.navigate("EditarEspecialidades", { especialidad });
    };

    const handleCrear = () => {
        // Se usa el nombre de la ruta de edición/creación correcto
        navigation.navigate("EditarEspecialidades");
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
                data={especialidades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <EspecialidadCard
                        especialidad={item}
                        onEdit={() => handleEditar(item)}
                        onDelete={() => handleEliminar(item.id)}
                    />
                )}
                ListEmptyComponent={<Text style={styles.empty}>No hay especialidades registradas</Text>}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
            <TouchableOpacity style={styles.boton} onPress={handleCrear}>
                <Text style={styles.botonTexto}>Crear Especialidad</Text>
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
