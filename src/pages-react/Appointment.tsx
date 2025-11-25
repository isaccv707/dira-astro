import AppointmentForm from "../sections/react/quoter/QuoterForm-section";
import logo from "../assets/images/logo.png";
import { CheckCircle2 } from "lucide-react";

const Appointment = () => {
  return (
    <section className="w-full bg-gradient-to-b from-white to-gray-50 py-16 px-6 sm:px-10 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="space-y-8">
          <div className="space-y-4">
           
           
          </div>

          {/* Beneficios con íconos */}
          


          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <AppointmentForm />
          </div>
        </div>


        <div className="flex flex-col items-center text-center lg:text-left space-y-6">
          <img
            src={logo.src}
            alt="Agendar cita médica"
            className="w-full max-w-sm drop-shadow-md"
          />
          <p className="text-gray-500 text-sm max-w-md">
            Confía en nuestra experiencia y atención personalizada.
            Con un par de clics podrás agendar tu cita y recibir el mejor cuidado.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
