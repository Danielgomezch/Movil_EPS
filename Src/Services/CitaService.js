import api from "./conexion"; 

/**
 * listarCitas - Función para listar todas las citas.
 *
 * Esta función envía una solicitud a la API para obtener la lista de citas.
 *
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de las citas si es exitoso.
 */
export const listarCitas = async () => {
    try {
        const response = await api.get("/listarCitas");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de las citas
    } catch (error) {
        console.error("Error al listar las citas:", error.response ? error.response.data : error.message);

        // Manejo específico para el error de token expirado
        if (error.response && error.response.status === 401) {
            return {
                success: false,
                message: "Token ha expirado. Por favor, inicia sesión nuevamente.", 
            };
        }

        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
}

/**
 * eliminarCitas - Función para eliminar una cita.
 *
 * Esta función envía una solicitud a la API para eliminar una cita específica.
 *
 * @param {string} id - El ID de la cita a eliminar.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación.
 */
export const eliminarCitas = async (id) => {
    try {
        await api.delete(`/eliminarCitas/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar las citas:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

/**
 * crearCitas - Función para crear una nueva cita.
 *
 * Esta función envía una solicitud a la API para crear una nueva cita.
 *
 * @param {Object} data - Los datos de la nueva cita.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de la nueva cita si es exitoso.
 */
export const crearCitas = async (data) => {
    try {
        const response = await api.post("/crearCitas", data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de la nueva cita
    } catch (error) {
        console.error("Error al crear las citas:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

/**
 * editarCitas - Función para editar una cita existente.
 *
 * Esta función envía una solicitud a la API para editar una cita específica.
 *
 * @param {string} id - El ID de la cita a editar.
 * @param {Object} data - Los nuevos datos de la cita.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de la cita editada si es exitoso.
 */
export const editarCitas = async (id, data) => {
    try {
        const response = await api.put(`/editarCitas/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar las citas:", error.response ? error.response.data : error.message);
        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}
