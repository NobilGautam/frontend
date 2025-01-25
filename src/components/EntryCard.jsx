import React from 'react'

const EntryCard = ({title, content}) => {
  return (
    <div className='flex flex-col w-[25%] h-[200px] justify-between bg-slate-500 p-4 pb-6 gap-4 rounded-lg'>
        <div>
          <h1 className='text-[1.5rem] font-semibold'>{title}</h1>
          <p className='text-[1.1rem]'>{content}</p>
        </div>
        <div className='w-full flex justify-end'>
          <p className=' hover:cursor-pointer'>Read more</p>
        </div>
    </div>
  )
}

export default EntryCard