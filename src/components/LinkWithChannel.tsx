import { use } from "react";
import { ChannelContext } from "./ChannelProvider";
import { Link, type LinkProps } from "react-router";

export const LinkWithChannel = ({ ...props }: LinkProps) => {
    const [channel] = use(ChannelContext);

    if (!props.to.toString().startsWith("/")) {
        return <Link {...props}></Link>;
    }

    const toWithChannel = `${channel}${props.to}`;

    return <Link {...props} to={toWithChannel}></Link>;
};
