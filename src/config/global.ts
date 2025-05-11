type GlobalConfiguration = {
    STORE_NAME: string;
    ACCENT_COLOR: string;
    PRODUCT_COUNT: number;
};

/*
 * COLORS:
 * F5F231
 * BB396B
 * C84287
 * D7CF24
 * */

export const globalConfiguration: GlobalConfiguration = {
    STORE_NAME: import.meta.env.VITE_STORE_NAME ?? "Winkri",
    ACCENT_COLOR: import.meta.env.VITE_ACCENT_COLOR ?? "#3b82f6",
    PRODUCT_COUNT: import.meta.env.VITE_PRODUCT_COUNT ?? 20
};
