import type { PropsWithChildren } from "react";
import { ChannelProvider } from "src/components/ChannelProvider";

export const MainLayout = ({ children }: PropsWithChildren) => {
    return <ChannelProvider>{children}</ChannelProvider>;
};
