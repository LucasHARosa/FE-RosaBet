const addressByCEP = async (cep: string) => {
  const response = await fetch(`/api/cep/${cep}`);
  const data = await response.json();
  return data;
};

export { addressByCEP };
