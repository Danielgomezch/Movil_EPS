import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Inicio from "../../../Screen/Inicio/Inicio";
import CitasStack from "./CitasStack";
import EspecialidadesStack from "./EspecialidadesStack";
import MedicosStack from "./MedicosStack";
import PacienteStack from "./PacienteStack";

const Stack = createStackNavigator();

export default function InicioStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="InicioPantalla" 
                component={Inicio}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="CitasFlow"
                component={CitasStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="EspecialidadesFlow"
                component={EspecialidadesStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="MedicosFlow"
                component={MedicosStack}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="PacienteFlow"
                component={PacienteStack}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}