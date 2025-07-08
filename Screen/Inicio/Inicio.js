import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from 'react-native';
import { AntDesign, FontAwesome6, Fontisto, MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const itemWidth = (width / 2) - 30;

export default function Inicio() {
    const navigation = useNavigation();

    const navigateToFlow = (flowName) => {
        navigation.navigate(flowName);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="black" />
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>SE BIENVENIDO</Text>
                    <Text style={styles.headerSubtitle}>A tu EPS de confianza</Text>
                    <Text style={styles.headerSubtitle}>Selecciona una opción</Text>
                </View>

                <View style={styles.gridContainer}>
                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('CitasFlow')}
                    >
                        <AntDesign name="medicinebox" size={24} color="black" />
                        <Text style={styles.gridItemText}>Citas</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('EspecialidadesFlow')}
                    >
                        <MaterialIcons name="folder-special" size={24} color="black" />
                        <Text style={styles.gridItemText}>Especialidades</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('MedicosFlow')}
                    >
                        <FontAwesome6 name="user-doctor" size={24} color="black" />
                        <Text style={styles.gridItemText}>Medicos</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.gridItem}
                        onPress={() => navigateToFlow('PacienteFlow')}
                    >
                        <Fontisto name="bed-patient" size={24} color="black" />
                        <Text style={styles.gridItemText}>Pacientes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
        padding: 20,
    },
    header: {
        alignItems: 'center',
        marginBottom: 40,
        marginTop: 20,
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: '800',
        color: '#42a5f5',
        marginBottom: 5,
    },
    headerSubtitle: {
        fontSize: 18,
        color: '#666',
    },
    statusText: {
        fontWeight: 'bold',
        color: 'blue',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 5,
    },
    gridItem: {
        width: itemWidth,
        height: itemWidth,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
    },
    gridItemText: {
        marginTop: 15,
        fontSize: 17,
        fontWeight: '600',
        color: '#444',
        textAlign: 'center',
    },
});
