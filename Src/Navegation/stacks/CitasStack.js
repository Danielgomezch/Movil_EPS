import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

const Stack = createStackNavigator();

/**
 * CitasStack - Componente que define la navegación de la sección de citas.
 *
 * Este componente utiliza un stack navigator para gestionar las pantallas relacionadas con las citas,
 * incluyendo la lista de citas, el detalle de una cita específica y la edición o creación de citas.
 *
 * Ejemplo de uso:
 * <CitasStack />
 */
export default function CitasStack () {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { 
                    backgroundColor: '#4A90E2', 
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            {/* --- NOMBRES CORREGIDOS A camelCase --- */}
            <Stack.Screen
                name="listarCitas"
                component={ListarCitas}
                options={{ title: "Citas" }}
            />
            <Stack.Screen
                name="detalleCitas"
                component={DetalleCitas}
                options={{ title: "Detalle Cita" }}
            />
            <Stack.Screen
                name="editarCitas"
                component={EditarCitas}
                options={{ title: "Nuevo/Editar Cita" }}
            />
        </Stack.Navigator>
    );
}
