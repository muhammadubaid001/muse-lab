import React, { FC } from "react"

interface IProps {
    container?: string,
    onChange: any,
    value: string
    placeholder: string
    label: string,
    disabled?: boolean
}

export const Input: FC<IProps> = ({ container, onChange, value, placeholder, label, disabled }) => {
    return (
        <div className={container}>
            <label className="text-primary-charcol text-sm font-libre-sb tracking-wide">{label}</label>
            <input type="text"
                   onChange={e => onChange(e.target.value)}
                   value={value}
                   disabled={disabled}
                   className="block py-2.5 px-3.5 shadow-sm text-gray-900 mt-1 border border-[#d0d5dd] focus:ring-[3px] focus:ring-opacity-25 w-full focus:outline-none rounded-lg focus:ring-primary-gold focus:border-primary-gold"
                   placeholder={placeholder} />
        </div>
    )
}
