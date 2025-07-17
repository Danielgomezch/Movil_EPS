import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Feather } from "@expo/vector-icons";

import InicioStack from "./stacks/InicioStack";
import PerfilesStack from "./stacks/PerfilStack";
import ConfiguracionesStack from "./stacks/ConfiguracionStack";

const Tab = createBottomTabNavigator();

/**
 * NavegacionPrincipal - Componente que define la navegación principal de la aplicación.
 *
 * Este componente utiliza un tab navigator para gestionar las diferentes secciones de la aplicación,
 * incluyendo la pantalla de inicio, el perfil del usuario y la configuración. Cada sección tiene su propio stack de navegación.
 *
 * Ejemplo de uso:
 * <NavegacionPrincipal />
 */
export default function NavegacionPrincipal() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#42a5f5',
          borderTopWidth: 1,
          borderTopColor: '#3d481d',
          height: 60,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "#ADD8E6",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tab.Screen
        name="Inicio"
        component={InicioStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          tabBarLabel: 'Inicio',
        }}
      />

      <Tab.Screen
        name="Perfil"
        component={PerfilesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={size} color={color} />
          ),
          tabBarLabel: 'Perfil',
        }}
      />

      <Tab.Screen
        name="Configuración"
        component={ConfiguracionesStack}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
          tabBarLabel: 'Configuración',
        }}
      />
    </Tab.Navigator>
  );
}
