import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
    route("/:channel", "./routes/home.tsx"),
    route("/:channel/products", "./routes/products.tsx"),
] satisfies RouteConfig;
