/**
 * Prefilled WhatsApp messages. Every message names the branch (and the study
 * when there is one) so reception knows what the patient wants and where,
 * without asking again.
 */
const atBranch = (branchName?: string | null) =>
  branchName ? ` en ${branchName}` : "";

export const generalWhatsappMessage = (branchName?: string | null) =>
  `Hola, quiero información para hacerme estudios${atBranch(branchName)}.`;

export const studyWhatsappMessage = (
  studyName: string,
  branchName?: string | null,
) =>
  `Hola, quiero agendar ${studyName}${atBranch(branchName)}. ¿Qué preparación necesito y qué horarios tienen?`;

export const promoWhatsappMessage = (
  promoTitle: string,
  branchName?: string | null,
) => `Hola, me interesa la promoción "${promoTitle}"${atBranch(branchName)}.`;

export const cartWhatsappMessage = (
  studies: { name: string; quantity?: number }[],
  total: number,
  branchName?: string | null,
) => {
  const list = studies
    .map((study) => `- ${study.name} (${study.quantity || 1}x)`)
    .join("\n");
  return (
    `¡Hola! Me gustaría agendar una cita${atBranch(branchName)} para los siguientes estudios:\n\n` +
    `${list}\n\n` +
    `*Total estimado:* $${total.toLocaleString("es-MX", { minimumFractionDigits: 2 })}\n\n` +
    `¿Qué horarios tienen disponibles?`
  );
};
