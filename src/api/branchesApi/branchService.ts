export const fetchBranches = async () => {
  const response = await fetch("http://localhost:3000/api/branches");
  if (!response.ok) {
    throw new Error("Error al conectar con el servidor de sucursales");
  }
  return response.json();
};
