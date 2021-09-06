import { LOAN_PURPOSE, LEGAL_FORM } from '../../util/enums';

export const monthOptions = (maxMonths) => (
    [
        {
            value: 12, label: '12 Months',
        },
        {
            value: 24, label: '24 Months',
        },
        {
            value: 36, label: '36 Months',
        },
        {
            value: 48, label: '48 Months',
        },
        {
            value: 60, label: '60 Months',
        }
    ].filter(entry => entry.value <= maxMonths)
)

export const purposeOptions = () => [
    {
        value: LOAN_PURPOSE.MARKETING,
        label: LOAN_PURPOSE.MARKETING
    },
    {
        value: LOAN_PURPOSE.EQUIPMNET,
        label: LOAN_PURPOSE.EQUIPMNET
    },
];

export const formOptions = () => [
    {
        value: LEGAL_FORM.PRIVATE_LIMITED,
        label: LEGAL_FORM.PRIVATE_LIMITED
    },
    { 
        value: LEGAL_FORM.SOLE_PROPRIETORSHIP,
        label: LEGAL_FORM.SOLE_PROPRIETORSHIP
    },
];

// Gets the position between min and max value
// based on which month group is selected
export const calcInterestByMonths = (min, max, months) => {
        const half = (min + max) * 0.5;
        const quarter = (half + max) * 0.5;
        const threeQuarter = (half + min) * 0.5;
        switch(months / 12) {
            case 1: return max; // 12 months
            case 2: return quarter; // 24 months
            case 3: return half; // 36 months
            case 4: return threeQuarter; // 48 months
            case 5: return min; // 60 months
        }
}