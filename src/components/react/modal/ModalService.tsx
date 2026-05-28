import { useStore } from "@nanostores/react";
import { modalStore, closeModal } from "../../../stores/modalStore";
import Modal from "./Modal";
import type { Service } from "../../../interfaces/service.interface";
import { useEffect, useState } from "react";
import whatsappIcon from "../../../assets/icons/networks-icons/whatsapp.png";
import gmailIcon from "../../../assets/icons/networks-icons/gmail.png";
import {
  getCloudinaryUrl,
  getCloudinarySrcSet,
} from "../../../utils/cloudinary";

const ModalService = () => {
  const { isOpen, view, payload } = useStore(modalStore);
  const [loaded, setLoaded] = useState(true);

  if (!isOpen || view !== "MODAL_SERVICE" || !payload?.data) return null;

  const service: Service = payload.data;
  const title = payload.title || service.name;
  const { description, imageUrl, mobileImageUrl } = service;

  return (
    <Modal
      id="modal-service-detail"
      title={title}
      onClose={closeModal}
      open
      key={service.id}
    >
      <div className="w-full">
        <div className="rounded-2xl bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col gap-5 md:gap-8 md:flex-row">
            <div className="md:w-5/12">
              <figure className="relative overflow-hidden rounded-2xl border border-black/5 shadow-sm bg-neutral-100 aspect-[4/5] md:aspect-auto">
                {!loaded && (
                  <div className="absolute inset-0 z-10 animate-pulse bg-neutral-200" />
                )}
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={getCloudinarySrcSet(
                      imageUrl || mobileImageUrl,
                      [400, 600, 800],
                    )}
                  />
                  <img
                    src={getCloudinaryUrl(mobileImageUrl || imageUrl, {
                      width: 400,
                      height: 500,
                    })}
                    alt={title}
                    decoding="async"
                    loading="eager"
                    fetchPriority="high"
                    width={400}
                    height={500}
                    onLoad={() => setLoaded(true)}
                    className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
                  />
                </picture>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </figure>
            </div>

            <div className="md:w-7/12">
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-6 text-neutral-700 sm:text-base sm:leading-7 md:text-[17px] md:leading-7">
                  {description}
                </p>
                <div className="h-px w-full bg-black/5" />
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
                    className="inline-flex items-center justify-center transition hover:scale-105 active:scale-95"
                  >
                    <img
                      src={whatsappIcon.src}
                      alt="WhatsApp DYRA"
                      className="w-9 h-auto"
                    />
                  </a>
                  <a
                    href="/"
                    className="inline-flex items-center justify-center transition hover:scale-105 active:scale-95"
                  >
                    <img
                      src={gmailIcon.src}
                      alt="Email DYRA"
                      className="w-9 h-auto"
                    />
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
