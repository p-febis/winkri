import { globalEnvironmentVariables } from "src/config/global"

export const Header = () => {
    return (
        <div className="container mx-auto">
            <div className="h-20 flex items-center justify-between px-8 border-b border-dashed border-neutral-300">
                <div className="hidden md:block">
                    Links
                </div>
                <div className="">
                    <img src="logo.png" alt={globalEnvironmentVariables.STORE_NAME} />
                </div>
                <div className="">
                    User files
                </div>
            </div>
        </div>
    )
}
