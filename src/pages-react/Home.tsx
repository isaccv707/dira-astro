import CardService from "../components/cards/CardService"
import { services } from "../data/services/services"
import CarouselHome from "../sections/CarouselHome"

const Home = () => {
  return (
    <div>
      <section>
        <CarouselHome />
      </section>

      <section className="mt-10 px-6 sm:px-10 lg:px-20 p-10">
        <h1 className="text-center text-3xl font-bold text-green-ligth mb-8">
          Nuestros Servicios
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 place-items-center">
          {services.map(({ path, text, textButton, title, id, Icon }) => (
            <CardService
              key={id}
              id={id}
              Icon={Icon}
              path={path}
              text={text}
              textButton={textButton}
              title={title}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
