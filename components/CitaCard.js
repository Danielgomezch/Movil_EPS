import React, { useState } from 'react'; 
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'; 
import { Ionicons } from '@expo/vector-icons';  

/**
 * CitasCard - Componente para mostrar información de una cita.
 *
 * Este componente representa una tarjeta que muestra información sobre una cita,
 * incluyendo la opción de editar o eliminar la cita. Permite expandir para ver más detalles.
 *
 * Props:
 * - citas (object): Objeto que contiene la información de la cita, incluyendo nombre, fecha, hora, estado, motivo, observación y tipo de consulta.
 * - onEdit (function): Función que se ejecuta al presionar el botón de editar.
 * - onDelete (function): Función que se ejecuta al presionar el botón de eliminar.
 *
 * Ejemplo de uso:
 * <CitasCard 
 *   citas={{ nombre: 'Juan Pérez', fecha: '2023-10-01', hora: '10:00', estado: 'Confirmada', motivo: 'Consulta general', observacion: 'Ninguna', tipo_consulta: 'Presencial' }} 
 *   onEdit={() => console.log('Editar')} 
 *   onDelete={() => console.log('Eliminar')} 
 * />
 */
export default function CitasCard({ citas, onEdit, onDelete }) {
    // Estado para mostrar/ocultar detalles de la cita
    const [showDetails, setShowDetails] = useState(false);

    // Renderizado del componente
    return (
        <View style={style.card}>
            {/* Contenedor para la información de la cita */}
            <View style={style.info}>
                {/* Botón táctil que alterna la visibilidad de los detalles */}
                <TouchableOpacity onPress={() => setShowDetails(!showDetails)}>
                    {/* Muestra el nombre de la cita */}
                    <Text style={style.nombre}>Información de la cita: {citas?.nombre}</Text>
                    {showDetails && (
                        <>
                            {/* Detalles que se muestran si showDetails es true */}
                            <Text style={style.detalle}>Fecha: {citas.fecha}</Text>
                            <Text style={style.detalle}>Hora: {citas.hora}</Text>
                            <Text style={style.detalle}>Estado: {citas.estado}</Text>
                            <Text style={style.detalle}>Motivo: {citas.motivo}</Text>
                            <Text style={style.detalle}>Observación: {citas.observacion}</Text>
                            <Text style={style.detalle}>Tipo de la consulta: {citas.tipo_consulta}</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
            {/* Contenedor para los botones de acción */}
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

// Objeto de estilos utilizando StyleSheet
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
        shadowOffset: { width: 0, height: 2 },  // Desplazamiento de sombra
        shadowOpacity: 0.1,  // Opacidad de sombra
        shadowRadius: 4,  // Radio de difuminado de sombra
        elevation: 3,  // Elevación (para Android)
    },
    info: {
        flex: 1,  
    },
    nombre: {
        fontSize: 18, 
        fontWeight: 'bold',  // Negrita
        color: '#333', 
        marginBottom: 4,  
    },
    detalle: {
        fontSize: 14,  
        color: '#666',  
        marginBottom: 2,  
    },
    actions: {
        flexDirection: 'row',  
        marginLeft: 8,  
    },
    iconBtn: {
        marginLeft: 12,  
    },
});
