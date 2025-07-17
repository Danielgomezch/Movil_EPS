import api from "./conexion"; 

/**
 * listarPasientes - Función para listar todos los pacientes.
 *
 * Esta función envía una solicitud a la API para obtener la lista de pacientes.
 *
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de los pacientes si es exitoso.
 */
export const listarPasientes = async () => {
    try {
        const response = await api.get("/listarPasientes");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de los pacientes
    } catch (error) {
        console.error("Error al listar los pasientes:", error.response ? error.response.data : error.message);
        
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
 * eliminarPasientes - Función para eliminar un paciente.
 *
 * Esta función envía una solicitud a la API para eliminar un paciente específico.
 *
 * @param {string} id - El ID del paciente a eliminar.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación.
 */
export const eliminarPasientes = async (id) => {
    try {
        await api.delete(`/eliminarPasientes/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

/**
 * crearPasientes - Función para crear un nuevo paciente.
 *
 * Esta función envía una solicitud a la API para crear un nuevo paciente.
 *
 * @param {Object} data - Los datos del nuevo paciente.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos del nuevo paciente si es exitoso.
 */
export const crearPasientes = async (data) => {
    try {
        const response = await api.post("/crearPasientes", data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos del nuevo paciente
    } catch (error) {
        console.error("Error al crear los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}

/**
 * editarPasientes - Función para editar un paciente existente.
 *
 * Esta función envía una solicitud a la API para editar un paciente específico.
 *
 * @param {string} id - El ID del paciente a editar.
 * @param {Object} data - Los nuevos datos del paciente.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos del paciente editado si es exitoso.
 */
export const editarPasientes = async (id, data) => {
    try {
        const response = await api.put(`/editarPasientes/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar los pasientes:", error.response ? error.response.data : error.message);
        return {
            success: false, // Indica que la operación falló
            message: error.response ? error.response.data : "Error de conexión", 
        }
    }
}
