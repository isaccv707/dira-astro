import type { Service } from "../../../interfaces/service.interface"


const BusinessHealthServices = ({ service }: { service: Service<any> }) => {
  return (
    <div className="mt-10 rounded-3xl bg-white p-8 ring-1 ring-black/5">
      <h2 className="text-xl font-extrabold text-green-primary">
        {service.title}
      </h2>
      <p className="mt-2 text-grey">
        Vista informativa/CTA (Paso 4).
      </p>
    </div>
  )
}

export default BusinessHealthServices
