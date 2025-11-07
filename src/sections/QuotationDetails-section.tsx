import { useQuoterContext, type Study } from "../contexts/QuoterContext"


const QuotationDetailsSection = () => {
    const { studies, client } = useQuoterContext();
    return (
        <>
            <div className=' p-2 text-center'>
                <h1 className='text-green-primary font-bold text-lg text-nowrap'>Detalles de tu cotización</h1>
                {client?.name}
                {studies.map((study: Study) => (
                    <div key={study.id}>
                        <h1>{study.name}</h1>
                    </div>
                ))}
            </div>
        </>
    )
}

export default QuotationDetailsSection
