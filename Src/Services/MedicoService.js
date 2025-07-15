import api from "./conexion"; 

// --- SERVICIO PARA MÉDICOS CON TUS RUTAS PERSONALIZADAS ---

// Función para listar médicos
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

// Función para crear un médico
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

// Función para editar un médico
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

// Función para eliminar un médico
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