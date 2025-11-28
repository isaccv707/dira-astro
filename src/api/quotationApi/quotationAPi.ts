import { api } from "../api";
import type { QuotationPayload } from "../interfaces/quotation.interface";
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