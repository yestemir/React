import React, {ChangeEvent, ReactElement} from 'react'

interface Props {
    label: string;
    type?: 'email' | 'password' | 'text';
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    required?: boolean;
}


export default function Field({label, onChange, type, required}: Props): ReactElement {

    let inputType = 'text';

    if (type) {
        inputType = type;
    }

    return (
        <div className="field">
            <span>{label}</span>
            <input type={inputType} onChange={onChange} required={required}/>
        </div>

    )
}
