import { ToastContainer } from "react-toastify"
import { ContactForm } from "../../../sections/react/ContactForm"


const ContactFormWrapper = () => {
    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} />
            <ContactForm />
        </>
    )
}

export default ContactFormWrapper
