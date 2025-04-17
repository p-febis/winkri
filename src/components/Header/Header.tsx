import { Link } from "react-router"
import { globalConfiguration } from "src/config/global"
import { HeaderLinks } from "./HeaderLinks"

export const Header = () => {
    return (
        <header className="container mx-auto">
            <nav className="h-20 flex items-center justify-between px-8 border-b border-dashed border-neutral-300">
                <div className="hidden md:block">
                    <HeaderLinks />
                </div>
                <div>
                    <Link to="/"> 
                        <img src="/logo.svg" width={150} height={25} alt={globalConfiguration.STORE_NAME} />
                    </Link>
                </div>
                <div>
                    User files
                </div>
            </nav>
        </header>
    )
}
