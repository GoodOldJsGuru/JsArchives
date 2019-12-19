import React, { useEffect, useRef } from "react";
import M from 'materialize-css';
import moment from 'moment';

interface DatePickerProps {
    value: string;
    format: string;
    className?: string;
    onChange?: (newVal: string) => void
}

const DatePicker: React.FunctionComponent<DatePickerProps> = ({ value, className = '', format , onChange}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const pickerInstance = useRef<M.Datepicker>();
    const momentValue = moment(value, format);

    useEffect(() => {
        const elem = inputRef.current;
        let currentDate = momentValue.toDate()
        const options: Partial<M.DatepickerOptions> = {
            defaultDate: currentDate,
            setDefaultDate: true,
            format: format.toLocaleLowerCase(),
            showClearBtn: true,
            container: document.body,
            onClose: () => {
                if (!inputRef.current) {
                    return;
                }

                if (!onChange) {
                    return;
                }

                const inputVal = inputRef.current.value;
                const isChanged = inputVal !== momentValue.format(format);
                isChanged && onChange(inputVal);
            },
        };

        if (!pickerInstance.current) {
            console.log('init date')
            pickerInstance.current = M.Datepicker.init(elem as Element, options);
        }

        (window as any).dateInstance = pickerInstance.current;
        return () => {
            pickerInstance.current && pickerInstance.current.destroy();
            pickerInstance.current = undefined;
            console.log('destroying date')
        };
    }, [momentValue, format, onChange]);

    return <>
    <div className="input-field">
        <input ref={inputRef} type="text" className={`datepicker ${className}`}

        ></input>
        <label htmlFor="first_name">Starting from</label>
    </div>
    </>
}

export default DatePicker;