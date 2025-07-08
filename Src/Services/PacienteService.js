import api from "./conexion";

export const listarPacientes = async () => {
  try {
    const response = await api.get("/listarpaciente");
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al listar pacientes:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const eliminarPaciente = async (id) => {
  try {
    await api.delete(`/eliminarpaciente/${id}`);
    return { success: true, message: "Paciente eliminado correctamente" };
  } catch (error) {
    console.error(
      "Error al eliminar paciente:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const crearPaciente = async (paciente) => {
  try {
    const response = await api.post("/crearPaciente", data);
    return { success: true, data: response.data };
  } catch (error) {
    console.error(
      "Error al crear paciente:",
      error.response ? error.response.data : error.message
    );
    return {
      success: false,
      message: error.response ? error.response.data : "Error de conexión",
    };
  }
};

export const editarPaciente = async (id, data) => {
    try {
        const response = await api.put(`/editarpaciente/${id}`, data);
        return { success: true, data: response.data };
    } catch (error) {
        console.error(
            "Error al editar paciente:",
            error.response ? error.response.data : error.message
        );
        return {
            success: false,
            message: error.response ? error.response.data : "Error de conexión",
        };
    }
};
