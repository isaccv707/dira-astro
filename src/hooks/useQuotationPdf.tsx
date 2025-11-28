import type { QuotationPayload } from "../api/interfaces/quotation.interface"
import { useDownloadQuotationPdfMutation } from "../api/quotationApi/quotationAPi";
import type { Client } from "../interfaces/client.interface"
import type { Study } from "../interfaces/study.interface"
import { toast } from "react-toastify";

interface useQuotationPdf {
    client: Client | null
    selectedStudies: Study[]
}

const useQuotationPdf = ({ client, selectedStudies }: useQuotationPdf) => {
    const [downloadQuotationPdf, { isLoading }] = useDownloadQuotationPdfMutation();
    const hasClient = Boolean(client);
    const hasStudies = selectedStudies.length > 0;

    const buildPayload = (): QuotationPayload | null => {
        if (!hasClient) {
            toast.error("Primero llena la información del cliente.");
            return null;
        }

        if (!hasStudies) {
            toast.error("Debes seleccionar al menos un estudio para cotizar.");
            return null;
        }

        if (!client) return null;
        const payloadStudies = selectedStudies.map((study) => ({
            id: study.id,
            name: study.name,
            price: study.price,
        }));

        const payload: QuotationPayload = {
            clientType: client.clientType,
            name: client.name,
            lastName: client?.lastName,
            phoneNumber: client.phoneNumber,
            email: client.email,
            studies: payloadStudies,
        };
        return payload;
    }

    const downloadQuotation = async () => {
        const payload = buildPayload();
        if (!payload) return;

        try {
            const blob = await downloadQuotationPdf(payload).unwrap();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `cotizacion-${client?.name?.replace(/\s+/g, "_") || "dyra"}.pdf`;
            document.body.appendChild(a);
            a.click();
            a.remove();

            setTimeout(() => window.URL.revokeObjectURL(url), 10000);
        } catch (error) {
            console.error(error);
            toast.error("Hubo un error al descargar la cotización en PDF.");
        }
    };

    const viewQuotation = async () => {
        const payload = buildPayload();
        if (!payload) return;
        try {
            const blob = await downloadQuotationPdf(payload).unwrap();
            const url = window.URL.createObjectURL(blob);
            window.open(url, "_blank");
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 10000);
        } catch (error) {
            console.error(error);
            alert("Hubo un error al generar la cotización en PDF.");
        }
    }

    return {
        downloadQuotation,
        viewQuotation,
        isLoading,
        hasClient,
        hasStudies
    }
}

export default useQuotationPdf
