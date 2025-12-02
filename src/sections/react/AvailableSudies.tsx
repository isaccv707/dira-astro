import { useGetAllStudiesQuery } from "../../api/studiesApi/StudyApi"
import CardProduct from "../../components/react/cards/CardProduct";
import type { Service } from "../../interfaces/service.interface";

interface AvailableSudiesProps {
  service: Service<any>
}
const AvailableSudies = ({ service }: AvailableSudiesProps) => {

  const { data: products } = useGetAllStudiesQuery();
  return (
    <div id="products-section">
      <h1
        className="text-center font-bold text-3xl text-green-secondary mb-10 mt-16"
      >
        {service ? `Servicios de ${service.title}` : ``}
      </h1>

      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center p-10"
      >
        {
          products && products.length > 0 ? (
            products.map((product) => (
              <CardProduct
                path={"/contact"}
                // description={product.description}
                id={product.id}
                title={product.name}
                // isRequiredAppointment={
                //   product.isRequiredAppointment
                // }
                // preparation={product.preparation}
                price={product.price}
              />
            ))
          ) : (
            <h2 className="text-gray-500 text-center col-span-full">
              Sin servicios para mostrar
            </h2>
          )
        }
      </div>
    </div>
  )
}

export default AvailableSudies
