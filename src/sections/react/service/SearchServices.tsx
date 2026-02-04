import { useForm } from "react-hook-form";
import FormProvider from "../../../components/react/hk-form/FormProvider";
import RHFTextInput from "../../../components/react/hk-form/RHFTextInput";
import { useEffect, useState } from "react";


interface SearchServicesProps {
    onSearchChange: (value: string) => void;
}
interface Inputs {
    search: string;
}

const SearchServices = ({ onSearchChange }: SearchServicesProps) => {
    const [debouncedSearch, setDebounceSearch] = useState("");

    const methods = useForm<Inputs>({
        defaultValues: {
            search: ""
        },
    })
    const { watch } = methods;
    const searchValue = watch("search");

    useEffect(() => {
        const term = setDebounceSearch(searchValue?.trim() ?? "")
    }, [searchValue]);

    useEffect(() => {
        onSearchChange(debouncedSearch);
    }, [debouncedSearch,]);

    const handleSubmit = () => { }

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit}>
            <RHFTextInput
                id="search"
                label=""
                name="search"
                placeholder="Buscador de servicios"
            />
        </FormProvider>
    )
}

export default SearchServices
