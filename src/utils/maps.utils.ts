import type { Branch } from "../interfaces/branch.interface";

const present = (value?: string | null): value is string =>
  Boolean(value && value.trim() && value.trim() !== "null");

export const getFullAddress = (branch: Branch): string => {
  if (!branch.address) return "";

  const { street, extNumber, intNumber, neighborhood, zipCode, city } =
    branch.address;

  // Optional parts (interior, neighborhood, ...) may be null in the API:
  // skip them instead of printing "null".
  const streetLine = [street, extNumber].filter(present).join(" ");
  const withInterior = present(intNumber)
    ? `${streetLine} Int. ${intNumber}`
    : streetLine;

  return [
    withInterior,
    neighborhood,
    present(zipCode) ? `CP ${zipCode}` : null,
    city,
    branch.state?.name,
  ]
    .filter(present)
    .join(", ");
};

export const getBranchMapEmbedUrl = (branch: Branch): string => {
  const fullAddress = getFullAddress(branch);
  if (!fullAddress) return "";

  const queryText = `DYRA Laboratorio ${branch.name} ${fullAddress}`;
  const searchQuery = encodeURIComponent(queryText);
  const fallbackEmbedUrl = `https://maps.google.com/maps?q=${searchQuery}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  return fallbackEmbedUrl;
};
