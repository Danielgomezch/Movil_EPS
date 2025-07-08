import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarPaciente from "../../../Screen/Pacientes/ListarPaciente";
import DetallePaciente from "../../../Screen/Pacientes/DetallePaciente";
import EditarPaciente from "../../../Screen/Pacientes/EditarPaciente";

const Stack = createStackNavigator();

export default function PacienteStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarPaciente"
                component={ListarPaciente}
                options={{
                    title: "Paciente",
                    headerStyle: {
                        backgroundColor: '#4A90E2', 
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name= "DetallePaciente"
                component={DetallePaciente}
                options={{
                    title: "Detalle Paciente",
                    headerStyle: {
                        backgroundColor: '#4A90E2',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
            <Stack.Screen
                name= "EditarPaciente"
                component={EditarPaciente}
                options={{
                    title: "Nuevo/Editar Paciente",
                    headerStyle: { 
                        backgroundColor: '#4A90E2', 
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}
            />
        </Stack.Navigator>
    );
}