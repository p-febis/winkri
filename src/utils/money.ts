import type { Product } from "src/types/adapter.types";

export const formatMoney = (currency?: string, value?: number) => {
    if (!value || !currency) {
        return "";
    }

    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
    }).format(value);
};

export const collapsePrice = (pricing: Product["pricing"]) => {
    const { min, max } = pricing;
    if (min === max) {
        return min;
    }

    return `${min} - ${max}`;
};
