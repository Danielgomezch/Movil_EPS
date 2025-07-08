import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ListarCitas from "../../../Screen/Citas/ListarCitas";
import DetalleCitas from "../../../Screen/Citas/DetalleCitas";
import EditarCitas from "../../../Screen/Citas/EditarCitas";

const Stack = createStackNavigator();

export default function CitasStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name= "ListarCitas"
                component={ListarCitas}
                options={{
                    title: "Citas",
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
                name= "DetalleCitas"
                component={DetalleCitas}
                options={{
                    title: "Detalle citas",
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
                name= "EditarCitas"
                component={EditarCitas}
                options={{
                    title: "Nuevo/Editar Citas",
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