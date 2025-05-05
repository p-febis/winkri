export const formatMoney = (currency?: string, value?: number) => {
    if (!value || !currency) {
        return '';
    }

    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency,
    }).format(value);
};
