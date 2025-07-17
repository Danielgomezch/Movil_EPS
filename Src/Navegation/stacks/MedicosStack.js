// Archivo: Src/Navegation/stacks/MedicosStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedicos from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedicos from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

/**
 * MedicosStack - Componente que define la navegación de la sección de médicos.
 *
 * Este componente utiliza un stack navigator para gestionar las pantallas relacionadas con los médicos,
 * incluyendo la lista de médicos, el detalle de un médico específico y la edición o creación de médicos.
 *
 * Ejemplo de uso:
 * <MedicosStack />
 */
export default function MedicosStack () {
    return (
        <Stack.Navigator>
            {/* --- CORRECCIÓN: Nombres en camelCase --- */}
            <Stack.Screen
                name="listarMedicos"
                component={ListarMedicos}
                options={{ title: "Médicos" }}
            />
            <Stack.Screen
                name="detalleMedicos"
                component={DetalleMedicos}
                options={{ title: "Detalle del Médico" }}
            />
            <Stack.Screen
                name="editarMedicos"
                component={EditarMedicos}
                options={{ title: "Nuevo/Editar Médico" }}
            />
        </Stack.Navigator>
    );
}
