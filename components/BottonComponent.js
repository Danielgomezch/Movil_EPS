import { TouchableOpacity, Text, StyleSheet } from "react-native";

/**
 * CustomButton - Componente de botón reutilizable.
 *
 * Este componente representa un botón personalizado que puede ser utilizado en diferentes partes de la aplicación.
 * Permite pasar un título, una función para manejar el evento de presión y estilos adicionales.
 *
 * Props:
 * - title (string): El texto que se mostrará en el botón.
 * - onPress (function): La función que se ejecutará cuando el botón sea presionado.
 * - style (object): Estilos adicionales que se pueden aplicar al botón.
 *
 * Ejemplo de uso:
 * <CustomButton title="Guardar" onPress={handleSave} style={{ backgroundColor: 'red' }} />
 */
export default function CustomButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

// Estilos del componente
const styles = StyleSheet.create({
    button: {
        backgroundColor: "#42a5f5", // Color de fondo del botón
        padding: 12, // Espaciado interno del botón
        borderRadius: 8, // Bordes redondeados del botón
        alignItems: "center", // Alineación del contenido en el centro
        marginVertical: 16, // Margen vertical alrededor del botón
    },
    text: {
        color: "#fff", // Color del texto
        fontWeight: "bold", // Peso de la fuente
        fontSize: 16, // Tamaño de la fuente
    }
});
