import api from "./conexion"; 

/**
 * listarEspecialidad - Función para listar todas las especialidades.
 *
 * Esta función envía una solicitud a la API para obtener la lista de especialidades.
 *
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de las especialidades si es exitoso.
 */
export const listarEspecialidad = async () => {
    try {
        const response = await api.get("/listarEspecialidad");
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de las especialidades
    } catch (error) {
        console.error("Error al listar las especialidades:", error.response ? error.response.data : error.message);
        if (error.response && error.response.status === 401) {
            return {
                success: false,
                message: "Token ha expirado. Por favor, inicia sesión nuevamente.", 
            };
        }
        return {
            success: false,
            message: error.response ? error.response.data.message || "Error de conexión" : "Error de conexión",
        };
    }
}

/**
 * eliminarEspecialidad - Función para eliminar una especialidad.
 *
 * Esta función envía una solicitud a la API para eliminar una especialidad específica.
 *
 * @param {string} id - El ID de la especialidad a eliminar.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación.
 */
export const eliminarEspecialidad = async (id) => {
    try {
        await api.delete(`/eliminarEspecialidad/${id}`);
        return { success: true }; 
    } catch (error) {
        console.error("Error al eliminar las especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data.message || "Error de conexión" : "Error de conexión",
        };
    }
}

/**
 * crearEspecialidad - Función para crear una nueva especialidad.
 *
 * Esta función envía una solicitud a la API para crear una nueva especialidad.
 *
 * @param {Object} data - Los datos de la nueva especialidad.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de la nueva especialidad si es exitoso.
 */
export const crearEspecialidad = async (data) => {
    try {
        const response = await api.post("/crearEspecialidad", data);
        return { success: true, data: response.data }; // Devuelve el éxito y los datos de la nueva especialidad
    } catch (error) {
        console.error("Error al crear las especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data.message || "Error de conexión" : "Error de conexión",
        };
    }
}

/**
 * editarEspecialidad - Función para editar una especialidad existente.
 *
 * Esta función envía una solicitud a la API para editar una especialidad específica.
 *
 * @param {string} id - El ID de la especialidad a editar.
 * @param {Object} data - Los nuevos datos de la especialidad.
 * @returns {Promise<Object>} - Un objeto que indica el éxito de la operación y los datos de la especialidad editada si es exitoso.
 */
export const editarEspecialidad = async (id, data) => {
    try {
        const response = await api.put(`/editarEspecialidad/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error("Error al editar las especialidades:", error.response ? error.response.data : error.message);
        return {
            success: false, 
            message: error.response ? error.response.data.message || "Error de conexión" : "Error de conexión",
        };
    }
}
