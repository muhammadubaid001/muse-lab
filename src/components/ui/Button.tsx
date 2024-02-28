import { FC } from 'react'
import classNames from 'classnames'
import { signIn } from 'next-auth/react'

interface ButtonProps {
    label: string,
    container?: string
    className?: string,
    type: 'button' | 'submit'
    onClick: any
}

export const SecondaryButton: FC<ButtonProps> = ({ label, container, className, type = 'button', onClick }) => {
    return (
        <div className={container}>
            <button
                type={type}
                onClick={onClick}
                className={classNames('border-2 font-libre-sb border-primary-blue rounded-lg bg-transparent text-primary-blue c-shadow',
                    [className],
                )}>{label}</button>
        </div>
    )
}


export const PrimaryButton: FC<ButtonProps> = ({ container , onClick, label, className, type = "button" }) => {
    return (
        <div className={container}>
            <button
                type={type}
                className={classNames('text-white font-libre-sb rounded-lg bg-primary-gold hover:shadow-[3px_3px_0px_0px_#fffff] shadow-[4px_4px_0px_0px_#ffc60a]', [className])}
                onClick={onClick}>{label}
            </button>
        </div>
    )
}

