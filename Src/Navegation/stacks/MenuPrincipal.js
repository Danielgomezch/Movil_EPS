import CitasStack from "./stacks/CitasStack";
import EspecialidadesStack from "./stacks/EspecialidadesStack";
import MedicosStack from "./stacks/MedicosStack";
import PacienteStack from "./stacks/PacienteStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

/**
 * NavegacionPrincipal - Componente que define la navegación principal de la aplicación.
 *
 * Este componente utiliza un tab navigator para gestionar las diferentes secciones de la aplicación,
 * incluyendo citas, especialidades, médicos y pacientes. Cada sección tiene su propio stack de navegación.
 *
 * Ejemplo de uso:
 * <NavegacionPrincipal />
 */
export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#f4340c", 
            tabBarStyle: { backgroundColor: "#ffffff" }, // Estilo del fondo de la barra de pestañas
          }}
        >
            <Tab.Screen name="Citas" component={CitasStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}/>

            <Tab.Screen name="Especialidades" component={EspecialidadesStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Feather name="activity" size={size} color={color} />
                )
            }}/>

            <Tab.Screen name="Medicos" component={MedicosStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <Entypo name="paypal" size={size} color={color} />
            }}/>

            <Tab.Screen name="Pacientes" component={PacienteStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome6 name="people-group" size={size} color={color} />
            }}/>
        </Tab.Navigator>
    );
}
