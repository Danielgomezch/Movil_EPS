import React from 'react';  // React
import { createStackNavigator } from '@react-navigation/stack';  
import { createNativeStackNavigator } from "@react-navigation/native-stack";  

// Importación de las pantallas
import ListarPasientes from '../../../Screen/Pacientes/ListarPaciente'; 
import DetallePasientes from '../../../Screen/Pacientes/DetallePaciente';  
import EditarPasientes from '../../../Screen/Pacientes/EditarPaciente';

// Crea el stack navigator
const Stack = createNativeStackNavigator();

// Componente principal PacienteStack
export default function PacienteStack() {
    return (
        <Stack.Navigator>
            {/* Pantalla para listar pacientes */}
            <Stack.Screen 
                name="listarPasientes" 
                component={ListarPasientes} 
                options={{ title: "Pacientes" }} 
            />
            {/* Pantalla para editar o crear pacientes */}
            <Stack.Screen 
                name="editarPasientes" 
                component={EditarPasientes} 
                options={{ title: "Nuevo/Editar Pacientes" }} 
            />
            {/* Pantalla para mostrar detalles de un paciente */}
            <Stack.Screen 
                name="DetallePasientes"  
                component={DetallePasientes} 
                options={{ title: "Detalles Pacientes" }} 
            />
        </Stack.Navigator>
    );
}