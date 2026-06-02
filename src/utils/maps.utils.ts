import type { Branch } from "../interfaces/branch.interface";

export const getFullAddress = (branch: Branch): string => {
  if (!branch.address) return "";

  const { street, extNumber, intNumber, neighborhood, zipCode, city } =
    branch.address;
  const stateName = branch.state?.name || "";

  const interior = intNumber ? ` Int. ${intNumber}` : "";

  return `${street} ${extNumber}${interior}, ${neighborhood}, CP ${zipCode}, ${city}, ${stateName}`;
};

export const getBranchMapEmbedUrl = (branch: Branch): string => {
  const fullAddress = getFullAddress(branch);
  if (!fullAddress) return "";

  const queryText = `DYRA Laboratorio ${branch.name} ${fullAddress}`;
  const searchQuery = encodeURIComponent(queryText);
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  return fallbackEmbedUrl;
};
