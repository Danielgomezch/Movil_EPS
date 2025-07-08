import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarMedicos from "../../../Screen/Medicos/ListarMedicos";
import DetalleMedicos from "../../../Screen/Medicos/DetalleMedicos";
import EditarMedicos from "../../../Screen/Medicos/EditarMedicos";

const Stack = createStackNavigator();

export default function MedicosStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarMedicos"
                component={ListarMedicos}
                options={{
                    title: "Medicos",
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
                name= "DetalleMedicos"
                component={DetalleMedicos}
                options={{
                    title: "Detalle Medicos",
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
                name= "EditarMedicos"
                component={EditarMedicos}
                options={{
                    title: "Nuevo/Editar Medicos",
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