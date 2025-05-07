import { globalConfiguration } from "src/config/global";
import { HeaderLinks } from "./HeaderLinks";
import { LinkWithChannel } from "../LinkWithChannel";

export const Header = () => {
    return (
        <header className="container mx-auto pb-6">
            <nav className="flex h-20 items-center justify-between border-b border-dashed border-neutral-300 px-8">
                <div className="hidden md:block">
                    <HeaderLinks />
                </div>
                <div>
                    <LinkWithChannel to="/">
                        <img
                            src="/logo.svg"
                            width={150}
                            height={25}
                            alt={globalConfiguration.STORE_NAME}
                        />
                    </LinkWithChannel>
                </div>
                <div>User icons</div>
            </nav>
        </header>
    );
};
