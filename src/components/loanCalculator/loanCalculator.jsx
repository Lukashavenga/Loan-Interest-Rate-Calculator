import React, {
    Fragment,
    useState,
    useRef,
    useEffect,
} from 'react';
import Select from 'react-select';
import Slider from 'rc-slider';
import './loanCalculator.scss';
import 'rc-slider/assets/index.css';
import { LEGAL_FORM, LOAN_PURPOSE } from '../../util/enums';
import { currencyFormatter } from '../../util/formatter';
import {
    monthOptions,
    purposeOptions,
    formOptions,
    calcInterestByMonths,
} from './loanCalculatorUtil';

const LoanCalculator = () => {
    const [financeAmout, setFinanceAmount] = useState(5000);
    const [duration, setDuration] = useState(60);
    const [inputFocus, setInputFocus] = useState(false);
    const [maxDuration, setMaxDuration] = useState(60);
    const [maxAmount, setMaxAmount] = useState(500000);
    const [purpose, setPurpose] = useState(null);
    const [form, setForm] = useState(null);
    const [interest, setInterest] = useState(null);
    const financeInputRef = useRef();

    useEffect(() => {
        if (purpose && form) {
            if (purpose === LOAN_PURPOSE.MARKETING) {
                if ( form === LEGAL_FORM.PRIVATE_LIMITED
                    || form === LEGAL_FORM.SOLE_PROPRIETORSHIP) {
                    setMaxAmount(250000);
                    setMaxDuration(36);
                }
            }
            if(purpose === LOAN_PURPOSE.EQUIPMNET) {
                if (form === LEGAL_FORM.PRIVATE_LIMITED) {
                    setMaxAmount(500000);
                    setMaxDuration(60);
                }
                if (form === LEGAL_FORM.SOLE_PROPRIETORSHIP) {
                    setMaxAmount(250000);
                    setMaxDuration(60);
                }
            }
        }
    }, [purpose, form])
    
    useEffect(() => {
        if (financeAmout < 50000) {
            setInterest(calcInterestByMonths(6, 8, duration));
        }
        if (financeAmout >= 50000 && financeAmout <= 149999) {
            setInterest(calcInterestByMonths(5, 7, duration));
        }
        if (financeAmout >= 150000 && financeAmout <= 500000) {
            setInterest(calcInterestByMonths(4, 6, duration));
        }
    }, [financeAmout, duration])

    const handleSelectChange = (selectedOption, handler) => {
        if (selectedOption.value) {
            handler(selectedOption.value);
        }
    }

    const handleFinanceValueChange = (event) => {
        const value = event?.target?.value;
        if (value) {
            setFinanceAmount(value < maxAmount ? value : maxAmount);
        }
    }

    return (
        <Fragment>
            <div className="row header">
                Compile your business financing
            </div>
            <div className="row">
                <div>
                    <label className="selectLabel">Purpose</label>
                    <Select
                        placeholder="Choose a purpose"
                        onChange={event => handleSelectChange(event, setPurpose)}
                        options={purposeOptions()}
                        classNamePrefix="loanDropdown"
                    />
                </div>
                <div>
                    <label className="selectLabel">Legal Form</label>
                    <Select
                        placeholder="Choose a form"
                        onChange={event => handleSelectChange(event, setForm)}
                        options={formOptions()}
                        classNamePrefix="loanDropdown"
                    />
                </div>
            </div>
            <div className="row">
                <div className="rowLabel">
                    <label>Financing</label>
                </div>
                <div>
                    <input
                        id="financeAmountInput"
                        ref={financeInputRef}
                        type={inputFocus ? "number" : "text"}
                        step={1000}
                        value={inputFocus ? financeAmout : currencyFormatter(financeAmout, maxAmount)}
                        onFocus={() => setInputFocus(true)}
                        onBlur={() => {setInputFocus(false)}}
                        onChange={event => handleFinanceValueChange(event)}
                        max={maxAmount}
                    />
                </div>
            </div>
            <div className="row">
                <Slider
                min={5000}
                step={1000}
                max={maxAmount}
                className="slider"
                value={financeAmout}
                onChange={amount => setFinanceAmount(amount)}/>
            </div>
            <div className="row">
                <div className="rowLabel">
                    <label>Duration</label>
                </div>
                <div>
                <Select
                    value={{value: duration, label: `${duration} Months`}}
                    onChange={selectedValue => setDuration(selectedValue.value)}
                    options={monthOptions(maxDuration)}
                    classNamePrefix="loanDropdown"
                />
                </div>
            </div>
            <div className="row">
                <Slider
                    min={12}
                    step={12}
                    value={duration}
                    max={maxDuration}
                    className="slider"
                    onChange={amount => setDuration(amount)}
                />
            </div>
            <div className="row interest">
                <label>{interest && `Interest: ${interest}%`}</label>
            </div>
            <div className="row">
                <div>
                    <a href="" >Check if you qualify</a>
                </div>
                <div>
                    <button className="button">
                        Let's get started
                    </button>
                </div>
            </div>
        </Fragment>
    )
}

export default LoanCalculator;

