import { useState } from "react";
import Map from "../../components/react/Map"
import { branches } from "../../data/branches/branches";
import RHFSelectInput from "../../components/react/hk-form/RHFSelectInput";
import { useForm } from "react-hook-form";
import SelectInput from "../../components/react/form/SelectInput";
import FormProvider from "../../components/react/hk-form/FormProvider";


const BranchSelector = () => {
    const [selected, setSelected] = useState(branches[0].mapSrc);

    const methods = useForm();
    
    const handleChange = (e: any) => {
        const branch = branches.find((b) => b.id === e.target.value);
        if (branch) setSelected(branch.mapSrc);
    }

    return (
        <FormProvider onSubmit={handleChange} methods={methods}>
            <div className="mb-8">
                <RHFSelectInput
                    id="branch"
                    name="branch"
                    label="Selecciona tu sucursal"
                    placeholder="Elige una sucursal"
                    options={[{ value: 'Colima', label: 'Colima' }, { value: 'Guadalajara', label: 'Guadalajara' }]}
                />
            </div>
            <Map src={selected} />
        </FormProvider>
    )
}

export default BranchSelector
