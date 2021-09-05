export const currencyFormatter = (number, max = null) => {
    if (number !== null && typeof number !== 'undefined') {
        let formatVal = number;
        if (max && formatVal > max) {
            formatVal = max;
        }
        return new Intl.NumberFormat("nl", {
            style: 'currency',
            currency: 'EUR',
            maximumFractionDigits: 0,
        }).format(formatVal);
    }
};

export const monthFormatter = (number) => {
    if (number !== null && typeof number !== 'undefined') {
        return `${number} months`;
    }
};
