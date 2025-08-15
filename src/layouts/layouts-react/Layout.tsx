import type { ReactNode } from "react"
import Header from "../../sections/header/Header";
import NavBar from "../../sections/navBar/NavBar";
import Footer from "../../sections/footer/Footer";


interface LayoutDefaultProps {
    children: ReactNode;
}
const LayoutDefault = ({ children }: LayoutDefaultProps) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            {/* <NavBar /> */}
            <main className="flex-grow">
                {children}
            </main>

            <Footer />
        </div>
    )
}

export default LayoutDefault
