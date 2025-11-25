import { api } from "../api";
import type { QuotationPayload } from "../interfaces/quotation.interface";

// export async function downloadQuotationPdf(payload: QuotationPayload) {
//   const response = await fetch(`http://localhost:3000/api/quotations/pdf`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(payload),
//   });

//   if (!response.ok) {
//     throw new Error('Error al generar el PDF de la cotización');
//   }

//   const blob = await response.blob();
//   const url = window.URL.createObjectURL(blob);

//   👉 Opción A: abrir en una nueva pestaña (bonito para impresión)
//   window.open(url, '_blank');

//   👉 Si prefieres descarga directa:
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'cotizacion-dyra.pdf';
//   a.click();
//   window.URL.revokeObjectURL(url);
// }

export const quotationApi = api.injectEndpoints({
  endpoints: (builder) => ({
    downloadQuotationPdf: builder.mutation<Blob, QuotationPayload>({
      query: (body) => ({
        url: 'quotations/pdf',
        method: 'POST',
        body,
        responseHandler: async (response) => {
          if (!response.ok) {
            throw new Error('Error al generar el PDF de la cotización');
          }
          return await response.blob();
        },
      }),
    }),
  }),
});

export const { useDownloadQuotationPdfMutation } = quotationApi;