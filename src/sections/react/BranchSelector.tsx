import { useState } from "react";
import Map from "../../components/react/Map"
import { branches } from "../../data/branches/branches";
import RHFSelectInput from "../../components/react/hk-form/RHFSelectInput";


const BranchSelector = () => {
    const [selected, setSelected] = useState(branches[0]);
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const branch = branches.find((b) => b.id === e.target.value);
        if (branch) setSelected(branch);
    }

    return (
        <div>
            {/* <RHFSelectInput
                id="branch"
                name="branch"
                label="Selecciona tu sucursal"
                placeholder="Elige una sucursal"
                options={[{ value: '', label: '' }]}
            /> */}
            <Map src={''} />
        </div>
    )
}

export default BranchSelector
