import { createContext, useState, type PropsWithChildren } from "react";

export const ChannelContext = createContext<
    [string, React.Dispatch<React.SetStateAction<string>>]
>(["default-channel", () => {}]);

export const ChannelProvider = ({ children }: PropsWithChildren) => {
    // TODO: Pull default value from Saleor or list

    const state = useState("default-channel");

    return (
        <ChannelContext.Provider value={state}>
            {children}
        </ChannelContext.Provider>
    );
};
