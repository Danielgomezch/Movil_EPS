import api from "./conexion"; 

// --- CORRECCIÓN ---
// Se han cambiado las rutas y nombres de funciones a singular para que coincidan con tu API.

// Función para listar especialidades
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

// Función para eliminar especialidades
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

// Función para crear especialidades
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

// Función para editar especialidades
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