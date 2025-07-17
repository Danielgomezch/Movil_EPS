import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarEspecialidades from "../../../Screen/Especialidades/ListarEspecialidades";
import DetalleEspecialidades from "../../../Screen/Especialidades/DetalleEspecialidades";
import EditarEspecialidades from "../../../Screen/Especialidades/EditarEspecialidades";

const Stack = createStackNavigator();

/**
 * EspecialidadesStack - Componente que define la navegación de la sección de especialidades.
 *
 * Este componente utiliza un stack navigator para gestionar las pantallas relacionadas con las especialidades,
 * incluyendo la lista de especialidades, el detalle de una especialidad específica y la edición o creación de especialidades.
 *
 */
export default function EspecialidadesStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ListarEspecialidades"
                component={ListarEspecialidades}
                options={{
                    title: "Especialidades",
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
                name="DetalleEspecialidades"
                component={DetalleEspecialidades}
                options={{
                    title: "Detalle Especialidades",
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
                name="EditarEspecialidades"
                component={EditarEspecialidades}
                options={{
                    title: "Nuevo/Editar Especialidades",
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
