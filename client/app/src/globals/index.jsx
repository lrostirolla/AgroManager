
export const initialState = () => {
  return {
    CPF : "",
    client_name : "",
    farm_name : "",
    city : "Selecione um estado primeiro",
    state : "Selecione uma unidade federativa",
    total_area : 0,
    useful_area : 0,
    vegetation_area : 0,
    crops : ""
  }
}

export const states = [
  { id: 12, name: "AC" },
  { id: 27, name: "AL" },
  { id: 16, name: "AP" },
  { id: 13, name: "AM" },
  { id: 29, name: "BA" },
  { id: 23, name: "CE" },
  { id: 53, name: "DF" },
  { id: 32, name: "ES" },
  { id: 52, name: "GO" },
  { id: 21, name: "MA" },
  { id: 51, name: "MT" },
  { id: 50, name: "MS" },
  { id: 31, name: "MG" },
  { id: 15, name: "PA" },
  { id: 25, name: "PB" },
  { id: 41, name: "PR" },
  { id: 26, name: "PE" },
  { id: 22, name: "PI" },
  { id: 33, name: "RJ" },
  { id: 24, name: "RN" },
  { id: 43, name: "RS" },
  { id: 11, name: "RO" },
  { id: 14, name: "RR" },
  { id: 42, name: "SC" },
  { id: 35, name: "SP" },
  { id: 28, name: "SE" },
  { id: 17, name: "TO" },
];

export const crops = [
  { id : '1' , name :  "Soja"},
  { id : '2' , name :  'Milho'}, 
  { id : '3' , name :  'Algodão'},
  { id : '4' , name :  'Café'}, 
  { id : '5' , name :  'Cana de Açucar'},
]