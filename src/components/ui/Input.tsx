import React from "react"

export const Input = ({ container, onChange, value, placeholder, label }) => {
    return (
        <div className={container}>
            <label className="text-gray-700 text-sm font-libre-m">{label}</label>
            <input type="text"
                   onChange={e => onChange(e.target.value)}
                   value={value}
                   className="block p-2.5 shadow-sm text-sm text-gray-900 border border-gray-200 focus:ring-2 focus:ring-opacity-25 w-full focus:outline-none rounded-lg focus:ring-primary-gold focus:border-primary-gold"
                   placeholder={placeholder} />
        </div>
    )
}
