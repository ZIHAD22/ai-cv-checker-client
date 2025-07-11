const OnHoverCard = ({children}) => {
  return (
    <div className='absolute left-[50%] -translate-x-[50%]  mt-1 w-[60vw] bg-[#070C10FC] rounded-lg shadow-lg p-6 md:py-20 md:px-16 z-30'>
        {children}
    </div>
  )
}

export default OnHoverCard