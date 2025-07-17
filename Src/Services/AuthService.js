import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./conexion";

/**
 * loginUser  - Función para iniciar sesión de un usuario.
 *
 * Esta función envía una solicitud de inicio de sesión a la API y almacena el token de usuario en AsyncStorage.
 *
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y el token si es exitoso.
 */
export const loginUser  = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        console.log("Respuesta de la API:", response.data);
        const { token } = response.data;

        if (token) {
            await AsyncStorage.setItem("userToken", token);
            return { success: true, token };
        } else {
            console.error("Token no recibido en la respuesta");
            throw new Error("Token no recibido");
        }
    } catch (error) {
        console.error(
            "Error de login:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error al conectar",
        };
    }
};

/**
 * logoutUser  - Función para cerrar sesión de un usuario.
 *
 * Esta función envía una solicitud de cierre de sesión a la API y elimina el token de usuario de AsyncStorage.
 *
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación.
 */
export const logoutUser  = async () => {
    try {
        await api.post("/logout");
        await AsyncStorage.removeItem("userToken");
        return { success: true };
    } catch (error) {
        console.error("Error al cerrar sesión:", error.response ? error.response.data : error.message);
        return { success: false, message: error.response ? error.response.data.message : "Error al cerrar sesión" };
    }
};

/**
 * registroUser  - Función para registrar un nuevo usuario.
 *
 * Esta función envía una solicitud de registro a la API.
 *
 * @param {string} name - El nombre del usuario.
 * @param {string} email - El correo electrónico del usuario.
 * @param {string} password - La contraseña del usuario.
 * @param {string} role - El rol del usuario (por ejemplo, "admin", "user").
 * @returns {Promise<Object>} - Un objeto que contiene la respuesta de la API.
 */
export const registroUser  = async (name, email, password, role) => {
    try {
        const response = await api.post("/registrar", {
            name,
            email,
            password,
            role,
        });

        return response.data;
    } catch (error) {
        console.error(
            "Error al registrar:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response
                ? error.response.data.message
                : "Error de conexión",
        };
    }
};
