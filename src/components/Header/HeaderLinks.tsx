import { Button } from "@/components/ui/button";
import { LinkWithChannel } from "../LinkWithChannel";

export const HeaderLinks = () => {
    return (
        <Button variant="link" className="p-5" asChild>
            <LinkWithChannel to="/products">Products</LinkWithChannel>
        </Button>
    );
};
