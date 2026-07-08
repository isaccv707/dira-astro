import { useState } from "react";
import { useStore } from "@nanostores/react";
import { modalStore, closeModal } from "../../../stores/modalStore";
import Modal from "./Modal";
import {
  getCloudinaryUrl,
  getCloudinarySrcSet,
} from "../../../utils/cloudinary";
import type { Service } from "../../../interfaces/service.interface";

import CTAContact from "../CTA/CTAContact";
interface ModalServiceProps {
  id?: string;
}
const ModalService = ({ id = "MODAL_SERVICE" }: ModalServiceProps) => {
  const { isOpen, view, payload } = useStore(modalStore);
  const [loaded, setLoaded] = useState(true);

  if (!isOpen || view !== id || !payload?.data) return null;

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
        <div className="rounded-clinical-md bg-white">
          <div className="flex flex-col gap-5 md:gap-8 md:flex-row">
            <div className="md:w-5/12">
              <figure className="relative overflow-hidden rounded-clinical-md border border-ui-border shadow-xs bg-ui-bg aspect-4/5 md:aspect-auto">
                {!loaded && (
                  <div className="absolute inset-0 z-10 animate-pulse bg-ui-border" />
                )}
                <picture>
                  <source
                    media="(min-width: 768px)"
                    srcSet={getCloudinarySrcSet(
                      mobileImageUrl || imageUrl,
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
                <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent" />
              </figure>
            </div>

            <div className="md:w-7/12">
              <div className="flex flex-col gap-4">
                <p className="text-sm leading-6 text-grey-custom sm:text-base sm:leading-7 md:text-lg md:leading-7">
                  {description}
                </p>
                <CTAContact />
                <p className="text-xs text-grey-custom/70">
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
