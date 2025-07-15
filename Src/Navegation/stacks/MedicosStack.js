// Archivo: Src/Navegation/stacks/MedicosStack.js

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedicos from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedicos from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

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