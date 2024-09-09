export const globals = {
  createHook : null, 
  editHook : null,
  fetchCPF : null
}

export const initialState = () => {
  return {
    CPF : "",
    client_name : "",
    farm_name : "",
    city : "Selecione um estado primeiro",
    state : "Selecione uma unidade federativa",
    total_area : "",
    useful_area : "",
    vegetation_area : "",
    crops : ""
  }
}