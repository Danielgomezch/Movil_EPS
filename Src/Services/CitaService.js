import api from "./conexion"; 

// Función para listar citas
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

// Función para eliminar citas
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

// Función para crear citas
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

// Función para editar citas
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