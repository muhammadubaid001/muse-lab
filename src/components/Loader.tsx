export const Loader = () => {
    return (
        <div className='flex space-x-2 justify-center items-center bg-white h-screen'>
            <span className='sr-only'>Loading...</span>
            <div className='h-6 w-6 bg-primary-gold rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-6 w-6 bg-primary-blue rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-6 w-6 bg-primary-charcol rounded-full animate-bounce'></div>
        </div>

    )
}
