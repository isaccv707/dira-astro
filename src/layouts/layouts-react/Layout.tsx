import type { ReactNode } from "react"
import Footer from "../../sections/layout/Footer";
import Header from "../../sections/layout/Header";


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
