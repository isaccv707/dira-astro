import Modal from "./Modal";
import useModalManager from "../../../hooks/useModalManager";
import type { Service } from "../../../interfaces/service.interface";
import { useEffect, useMemo, useState } from "react";
import whatsappIcon from "../../../assets/icons/networks-icons/whatsapp.png";
import gmailIcon from "../../../assets/icons/networks-icons/gmail.png";

interface ModalServiceProps {
    id: string;
    title: string;
    data: Service;
}

const ModalService = ({ id, data: service, title }: ModalServiceProps) => {
    if (!id) return null;

    const { close } = useModalManager();
    const { description, img } = service;

    const [loaded, setLoaded] = useState(false);

    //   const alt = useMemo(
    //     () => img?.alt ?? `Imagen del servicio: ${title ?? "Servicio"}`,
    //     [img?.alt, title]
    //   );

    useEffect(() => {
        if (!img?.image45) return;
        setLoaded(false);

        const pre = new Image();
        pre.src = img.image45.src;
        pre.onload = () => setLoaded(true);

        return () => {
            pre.onload = null;
        };
    }, [img?.image45]);

    return (
        <Modal id={id} title={title} onClose={() => close(id)} open>
            <div className="w-full">
                {/* Contenedor tipo “card” */}
                <div className="rounded-2xl bg-white/70 backdrop-blur-sm">
                    <div className="flex flex-col gap-5 md:gap-8 md:flex-row">
                        {/* Imagen */}
                        <div className="md:w-5/12">
                            <figure className="relative overflow-hidden rounded-2xl border border-black/5 shadow-sm">
                                {/* Skeleton */}
                                {!loaded && (
                                    <div className="absolute inset-0 animate-pulse bg-black/10" />
                                )}

                                <div className="aspect-[16/10] sm:aspect-[16/9] md:aspect-[4/5]">
                                    <img
                                        src={img?.image45?.src}
                                        alt={img?.image45?.src}
                                        className={[
                                            "h-full w-full object-cover",
                                            "transition-opacity duration-300",
                                            loaded ? "opacity-100" : "opacity-0",
                                        ].join(" ")}
                                        decoding="async"
                                        loading="eager"
                                        fetchPriority="high"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                        onLoad={() => setLoaded(true)}
                                    />
                                </div>
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                            </figure>
                        </div>

                        {/* Contenido */}
                        <div className="md:w-7/12">
                            <div className="flex flex-col gap-4">

                                <p className="text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7 md:text-[17px] md:leading-7">
                                    {description}
                                </p>

                                {/* Separador */}
                                <div className="h-px w-full bg-black/5" />

                                {/* Bloque “callout” (opcional) */}
                                <div className="rounded-2xl border border-green-primary/15 bg-green-primary/5 p-4">
                                    <p className="text-xs font-medium text-green-primary sm:text-sm">
                                        ¿Necesitas más información?
                                    </p>
                                    <p className="mt-1 text-xs text-neutral-600 sm:text-sm">
                                        Podemos orientarte para elegir el estudio o servicio ideal
                                        según tu necesidad.
                                    </p>
                                </div>

                               
                                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
                                    <a
                                        href="/"
                                        className="inline-flex items-center justify-center  transition hover:opacity-95"
                                    >
                                        <img src={whatsappIcon.src} alt="icon-dyra" className="w-8 h-auto" />
                                    </a>
                                    <a
                                        href="/"
                                        className="inline-flex items-center justify-center transition hover:opacity-95"
                                    >
                                        <img src={gmailIcon.src} alt="icon-dyra" className="w-8 h-auto" />
                                    </a>
                                </div>

                                <p className="text-[11px] text-neutral-500 sm:text-xs">
                                    * La disponibilidad puede variar según sucursal.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ModalService;
