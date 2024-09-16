
export async function fetchCities(selectedState) {
  return fetch(
    `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState}/municipios`
  )
    .then((response) => {return response.json()}).catch(
      e => console.log(e)
    );
}
