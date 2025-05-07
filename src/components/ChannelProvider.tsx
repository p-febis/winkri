import { createContext, useState, type PropsWithChildren } from "react";
import { useParams } from "react-router";

export const ChannelContext = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>]
>(["", () => {}]);

export const ChannelProvider = ({ children }: PropsWithChildren) => {
    const { channel } = useParams();
    const state = useState(channel ?? "default-channel");

    return (
        <ChannelContext.Provider value={state}>
            {children}
        </ChannelContext.Provider>
    );
};
