import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';  

/**
 * MedicoCard - Componente para mostrar información de un médico.
 *
 * Este componente representa una tarjeta que muestra información sobre un médico,
 * incluyendo la opción de editar o eliminar la información del médico. Permite expandir para ver más detalles.
 *
 * Props:
 * - medico (object): Objeto que contiene la información del médico, incluyendo nombre, apellido, estado, especialidad, documento, registro médico, teléfono, correo y consultorio.
 * - onEdit (function): Función que se ejecuta al presionar el botón de editar.
 * - onDelete (function): Función que se ejecuta al presionar el botón de eliminar.
 *
 * Ejemplo de uso:
 * <MedicoCard 
 *   medico={{ nombre: 'Juan', apellido: 'Pérez', activo: 'Activo', idEspecialidad: 1, tipo_documento: 'DNI', num_documento: '12345678', reg_medicos: 'RM12345', telefono: '987654321', correo: 'juan.perez@example.com', idConsultorio: 2 }} 
 *   onEdit={() => console.log('Editar')} 
 *   onDelete={() => console.log('Eliminar')} 
 * />
 */
export default function MedicoCard({ medico, onEdit, onDelete }) {
    const [showDetails, setShowDetails] = useState(false);

    return (
        <View style={style.card}>
            <View style={style.info}>
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    <Text style={style.nombre}>Dr(a). {medico?.nombre} {medico?.apellido}</Text>
                    
                    <Text style={[
                        style.estado, 
                        medico?.activo?.toLowerCase() === 'activo' ? style.activo : style.inactivo
                    ]}>
                        {medico?.activo}
                    </Text>

                    {showDetails && (
                        <>
                            <Text style={style.detalle}>Especialidad ID: {medico.idEspecialidad}</Text>
                            <Text style={style.detalle}>Documento: {medico.tipo_documento} {medico.num_documento}</Text>
                            <Text style={style.detalle}>Registro Médico: {medico.reg_medicos}</Text>
                            <Text style={style.detalle}>Teléfono: {medico.telefono}</Text>
                            <Text style={style.detalle}>Correo: {medico.correo}</Text>
                            <Text style={style.detalle}>Consultorio ID: {medico.idConsultorio}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            
            <View style={style.actions}>
                <TouchableOpacity onPress={onEdit} style={style.iconBtn}>
                    <Ionicons name="create-outline" size={24} color="#1976D2" />
                </TouchableOpacity>

                <TouchableOpacity onPress={onDelete} style={style.iconBtn}>
                    <Ionicons name="trash-outline" size={24} color="#D32f2f" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    card: {
        flexDirection: 'row',  
        justifyContent: 'space-between',
        alignItems: 'center', 
        backgroundColor: '#FFFFFF', 
        padding: 16,  
        marginVertical: 8,  
        marginHorizontal: 16,  
        borderRadius: 12,  
        shadowColor: '#000',  
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    info: {
        flex: 1,  
    },
    nombre: {
        fontSize: 18, 
        fontWeight: 'bold',
        color: '#333', 
        marginBottom: 4,  
    },
    detalle: {
        fontSize: 14,  
        color: '#666',  
        marginTop: 4,
    },
    estado: {
        fontSize: 12,
        fontWeight: 'bold',
        paddingVertical: 2,
        paddingHorizontal: 8,
        borderRadius: 10,
        overflow: 'hidden',
        alignSelf: 'flex-start',
        marginTop: 2,
    },
    activo: {
        backgroundColor: '#d4edda',
        color: '#155724',
    },
    inactivo: {
        backgroundColor: '#f8d7da',
        color: '#721c24',
    },
    actions: {
        flexDirection: 'row',  
        marginLeft: 8,  
    },
    iconBtn: {
        marginLeft: 12,  
    },
});
