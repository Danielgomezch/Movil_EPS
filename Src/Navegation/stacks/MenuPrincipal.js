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

export default function NavegacionPrincipal() {
    return (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#f4340c", 
            tabBarActiveTintColor: "#f4340c", 
            tabBarActiveTintColor: {backgroundColor: "#f4340c"}, 
          }}
        >
            <Tab.Screen name="Citas" component={CitasStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home" size={size} color={color} />
                ),
            }}/>

            <Tab.Screen name="Especialidades" component={EspecialidadesStack} options={{
                tabBarIcon: ({ color, size }) => (
                    <Feather name="activity" size={24} color="red" />
                )
            }}/>

            <Tab.Screen name="Medicos" component={MedicosStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <Entypo name="paypal" size={24} color="lightblue" />

            }}/>

            <Tab.Screen name="Pacientes" component={PacienteStack} options={{
                tabBarIcon: ({ color, size }) =>
                    <FontAwesome6 name="people-group" size={24} color="silver" />

            }}/>
        </Tab.Navigator>
    );
}
