export const currencyFormatter = (number, max = null) => {
    if (number !== null && typeof number !== 'undefined') {
        let formatVal = number;
        if (max && formatVal > max) {
            formatVal = max;
        }
        try {
            return new Intl.NumberFormat("nl", {
                style: 'currency',
                currency: 'EUR',
                maximumFractionDigits: 0,
                minimumFractionDigits: 0,
            }).format(formatVal);
        } catch (err) {
            console.log('Conversion failed: ', err);
            return formatVal;
        }
    }
};

export const monthFormatter = (number) => {
    if (number !== null && typeof number !== 'undefined') {
        return `${number} months`;
    }
};
