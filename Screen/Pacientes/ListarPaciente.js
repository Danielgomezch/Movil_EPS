import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState, useEffect } from "react";
import PacienteCard from "../../components/PacienteCard";
import { useNavigation } from "@react-navigation/native";
import { listarPaciente } from "../../Src/Services/PacienteService";
import { eliminarPaciente } from "../../Src/Services/PacienteService";

export default function ListarPaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handlePaciente = async (id) => {
    setLoading(true);
    try {
      const result = await listarPaciente();
      if (result.success) {
        setPacientes(result.data);
      } else {
        Alert.alert("Error", result.message || "Error al cargar los pacientes");
      }
    } catch (error) {
      Alert.alert("Error", "Error al cargar los pacientes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      return unsubscribe;
    });
  }, [navigation]);

  const handleEliminar = (id) => {
    Alert.alert(
      "Confirmar Eliminación",
      "¿Estás seguro de que deseas eliminar este paciente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              const result = await eliminarPaciente(id);
              if (result.success) {
                handlePaciente();
                Alert.alert("Éxito", "Paciente eliminado correctamente");
              } else {
                Alert.alert(
                  "Error",
                  result.message || "Error al eliminar el paciente"
                );
              }
            } catch (error) {
              Alert.alert("Error", "Error al eliminar el paciente");
            }
          },
        },
      ]
    );
  };

  const handleEditar = (paciente) => {
    navigation.navigate("EditarPaciente", { paciente });
  };

  const handleCrear = () => {
    navigation.navigate("CrearPaciente");
  };

  if (loading) {
    return (
      <View style={StyleSheet.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={pacientes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PacienteCard
            paciente={item}
            onEdit={handleEditar(item)}
            onEliminar={handleEliminar(item.id)}
          />
        )}
      />
      <TouchableOpacity style={StyleSheet.botonCrear} onPress={handleCrear}>
        <Text style={StyleSheet.textoBoton}>Crear Paciente</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  empty: {
    textAlign: "center",
    marginTop: 40,
    color: "#888",
    fontSize: 16,
  },

  botonCrear: {
    backgroundColor: "#1972D2",
    padding: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: "center",
  },
  textoBoton: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});