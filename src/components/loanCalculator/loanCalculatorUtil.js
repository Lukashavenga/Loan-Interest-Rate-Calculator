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