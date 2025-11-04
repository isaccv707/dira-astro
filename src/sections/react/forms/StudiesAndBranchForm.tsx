import RHFSelectInput from "../../../components/react/hk-form/RHFSelectInput";
import RHFDateInput from "../../../components/react/hk-form/RHFDateInput";
import { useFormContext } from "react-hook-form";
import Button from "../../../components/react/ui/Button";

interface StudiesAndBranchFormProps {
  onBack: () => void;
}

const availableStudies = [
  { value: "biometria", label: "Biometría Hemática" },
  { value: "quimica", label: "Química Sanguínea" },
  { value: "glucosa", label: "Prueba de Glucosa" },
  { value: "lipidico", label: "Perfil Lipídico" },
];

const StudiesAndBranchForm = ({ onBack }: StudiesAndBranchFormProps) => {
  const { formState: { errors } } = useFormContext();

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 sm:p-10 max-w-3xl mx-auto my-6">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-green-primary">
          Sucursal y estudios
        </h2>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">
          Selecciona la sucursal, los estudios que deseas realizar y la fecha de tu cita.
        </p>
      </div>

      {/* Sección Sucursal */}
      <section className="mb-8">
        <h3 className="font-semibold text-green-primary mb-2 text-lg">Sucursal</h3>
        <RHFSelectInput
          id="branch"
          name="branch"
          label="Selecciona la sucursal donde deseas realizar tu cita"
          options={[
            { label: "Colima", value: "Colima" },
            { label: "Guadalajara", value: "Guadalajara" },
          ]}
          placeholder="Selecciona una sucursal"
        />
        {errors.branch && (
          <p className="text-red-500 text-sm mt-1">{errors.branch.message?.toString()}</p>
        )}
      </section>

      
      <section className="mb-8">
        <h3 className="font-semibold text-green-primary mb-2 text-lg">Estudios</h3>
        {/* <RHFCheckboxGroup
          name="studies"
          label="Selecciona uno o varios estudios"
          options={availableStudies}
        /> */}
        {errors.studies && (
          <p className="text-red-500 text-sm mt-1">{errors.studies.message?.toString()}</p>
        )}
      </section>

      
      <section className="mb-8">
        <h3 className="font-semibold text-green-primary mb-2 text-lg">Fecha de cita</h3>
        <RHFDateInput id="date" name="date" label="Selecciona la fecha" />
        {errors.date && (
          <p className="text-red-500 text-sm mt-1">{errors.date.message?.toString()}</p>
        )}
      </section>

  
      <section className="mt-10 flex flex-col sm:flex-row justify-between gap-4">
        <Button
          text="Anterior"
          type="button"
          variant="cancel"
          size="md"
          onClick={onBack}
        />
        <Button
          text="Enviar cita"
          type="submit"
          variant="submit"
          size="md"
        />
      </section>
    </div>
  );
};

export default StudiesAndBranchForm;
