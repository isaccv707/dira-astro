import RHFTextInput from '../../../components/react/hk-form/RHFTextInput'
import RHFSelectInput from '../../../components/react/hk-form/RHFSelectInput'
import Button from '../../../components/react/ui/Button'
import { useFormContext } from 'react-hook-form'
import { motion, AnimatePresence } from "framer-motion";
import { useQuoterContext } from '../../../hooks/useQuoterContext';

interface PersonalDataFormProps {
  nextStep: () => Promise<void>
  step: number
}

const PersonalDataForm = ({ nextStep }: PersonalDataFormProps) => {
  const { setClient } = useQuoterContext();
  const { watch } = useFormContext();

  const clientType = watch("clientType");

  const handleNext = () => {
    const values = {
      clientType: watch("clientType"),
      name: watch("name"),
      lastName: watch("lastName"),
      phoneNumber: watch("phoneNumber"),
      email: watch("email"),
      companyRFC: watch("companyRFC"),
    };
    setClient(values);
    nextStep();
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8 sm:p-10 md:p-12 transition-all">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-700">Datos del cliente</h2>
        <p className="text-gray-500 text-sm mt-1">
          Ingresa tu información para generar la cotización
        </p>
      </div>

    
      <div className="space-y-5">
        <RHFSelectInput
          id="clientType"
          name="clientType"
          label="Tipo de cliente"
          placeholder="Selecciona una opción"
          options={[
            { label: "Particular", value: "particular" },
            { label: "Empresa", value: "company" },
          ]}
        />

       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <RHFTextInput
            id="name"
            name="name"
            label={clientType === "company" ? "Razón social" : "Nombre"}
            placeholder={
              clientType === "company"
                ? "Ingresa la razón social"
                : "Ingresa tu nombre"
            }
          />

          <RHFTextInput
            id="phoneNumber"
            name="phoneNumber"
            label="Teléfono"
            placeholder="Ingresa tu número de teléfono"
          />

          <AnimatePresence mode="wait">
            {clientType === "particular" && (
              <motion.div
                key="lastName"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <RHFTextInput
                  id="lastName"
                  name="lastName"
                  label="Apellido"
                  placeholder="Ingresa tu apellido"
                />
              </motion.div>
            )}

            {clientType === "company" && (
              <motion.div
                key="companyRFC"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <RHFTextInput
                  id="companyRFC"
                  name="companyRFC"
                  label="RFC de la empresa"
                  placeholder="Ej. ABC123456XYZ"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <RHFTextInput
            id="email"
            name="email"
            label="Correo electrónico"
            placeholder="Ingresa tu correo electrónico"
          />
        </div>
      </div>

     
      <div className="flex justify-center mt-8">
        <Button
          text="Siguiente"
          type="button"
          variant="submit"
          size="lg"
          onClick={handleNext}
        />
      </div>
    </div>
  );
};

export default PersonalDataForm;
