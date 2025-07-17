import api from "./conexion"; 

/**
 * listarMedicos - Función para listar todos los médicos.
 *
 * Esta función envía una solicitud a la API para obtener la lista de médicos.
 *
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de los médicos si es exitoso.
 */
export const listarMedicos = async () => {
    try {
        const response = await api.get("/listarMedicos");
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al listar los médicos:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response?.data?.message || "Error de conexión",
        };
    }
}

/**
 * crearMedico - Función para crear un nuevo médico.
 *
 * Esta función envía una solicitud a la API para crear un nuevo médico.
 *
 * @param {Object} data - Los datos del nuevo médico.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos del nuevo médico si es exitoso.
 */
export const crearMedico = async (data) => {
    try {
        const response = await api.post("/crearMedicos", data);
        return { success: true, data: response.data }; 
    } catch (error) {
        console.error("Error al crear el médico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response?.data?.message || "Error de conexión", 
        }
    }
}

/**
 * editarMedico - Función para editar un médico existente.
 *
 * Esta función envía una solicitud a la API para editar un médico específico.
 *
 * @param {string} id - El ID del médico a editar.
 * @param {Object} data - Los nuevos datos del médico.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos del médico editado si es exitoso.
 */
export const editarMedico = async (id, data) => {
    try {
        const response = await api.put(`/editarMedicos/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar el médico:", error.response ? error.response.data : error.message);
        return {
            success: false,
            message: error.response?.data?.message || "Error de conexión", 
        }
    }
}

/**
 * eliminarMedico - Función para eliminar un médico.
 *
 * Esta función envía una solicitud a la API para eliminar un médico específico.
 *
 * @param {string} id - El ID del médico a eliminar.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación.
 */
export const eliminarMedico = async (id) => {
    try {
        await api.delete(`/eliminarMedicos/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar el médico:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response?.data?.message || "Error de conexión", 
        }
    }
}
