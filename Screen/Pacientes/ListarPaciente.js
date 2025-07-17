import React, { useEffect, useState } from "react";  
import { View, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native";  
import { useNavigation } from "@react-navigation/native";  
import { listarPasientes, eliminarPasientes } from "../../Src/Services/PacienteService";  
import PasientesCard from "../../components/PacienteCard";  

/**
 * ListarPasientesScreen - Componente para listar los pacientes registrados.
 *
 * Este componente permite a los usuarios ver una lista de pacientes registrados,
 * así como la opción de eliminar o editar cada paciente. También permite crear un nuevo paciente.
 *
 * Props:
 * - No se requieren props directamente, ya que utiliza el contexto de navegación.
 *
 * Ejemplo de uso:
 * <ListarPasientesScreen />
 */
export default function ListarPasientesScreen() {
  const [pasientes, setPasientes] = useState([]);  // Estado para almacenar la lista de pacientes
  const [loading, setLoading] = useState(true);  // Estado para manejar la carga
  const navigation = useNavigation();  // Hook para la navegación

  // Función para cargar los pacientes
  const handleCargarPasientes = async () => {
    setLoading(true);  // Activa el loading
    try {
      const result = await listarPasientes();  
      if (result.success) {
        setPasientes(result.data);  // Actualiza el estado con los datos de pacientes
      } else {
        Alert.alert("Error", result.message || "No se pudieron cargar los pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "No se pudieron cargar los pacientes");
    } finally {
      setLoading(false);  // Finaliza la carga
    }
  };

  // Efecto para cargar los pacientes al enfocar la pantalla
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", handleCargarPasientes);
    return unsubscribe;  // Limpia el listener al desmontar
  }, [navigation]);

  // Función para eliminar un paciente
  const handleEliminar = (id) => {
    Alert.alert(
      "Eliminar paciente",
      "¿Estás seguro que deseas eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPasientes(id);  // Llama al servicio para eliminar el paciente
              if (result.success) {
                handleCargarPasientes();  // Recarga la lista de pacientes
              } else {
                Alert.alert("Error", result.message || "No se pudo eliminar el paciente");
              }
            } catch (error) {
              Alert.alert("Error", "No se pudo eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  // Función para editar un paciente
  const handleEditar = (pasientes) => {
    navigation.navigate("editarPasientes", { pasientes });  // Navega a la pantalla de edición
  };

  // Función para crear un nuevo paciente
  const handleCrear = () => {
    navigation.navigate("editarPasientes");  // Navega a la pantalla de creación
  };

  // Muestra un indicador de carga mientras se cargan los pacientes
  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#66B2FF" />
      </View>
    );
  }

  // Renderiza la lista de pacientes
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={pasientes}  // Datos de los pacientes
        keyExtractor={(item) => item.id.toString()}  // Clave única para cada elemento
        renderItem={({ item }) => (
          <PasientesCard
            pasientes={item}  // Pasa el paciente al componente PasientesCard
            onEdit={() => handleEditar(item)}  // Maneja la edición
            onDelete={() => handleEliminar(item.id)}  // Maneja la eliminación
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No hay pacientes registrados</Text>}  // Mensaje si no hay pacientes
        contentContainerStyle={{ paddingBottom: 100 }}  // Espacio adicional para el botón
      />
      <TouchableOpacity style={styles.boton} onPress={handleCrear}>
        <Text style={styles.botonTexto}>Crear paciente</Text>
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
