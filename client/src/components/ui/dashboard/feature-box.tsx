import Image from 'next/image';
import React, { FC } from 'react'

interface Props {
    image: string;
    title: string;
    description: string;
}

const FeatureBox:FC<Props> = ({image, title, description}) => {
  return (
    <div className='flex mr-3 last:mr-0 justify-between items-center w-[32.5%] rounded-lg bg-white px-3.5 py-5'>
        <Image src={`/${image}`} alt='' width={77} height={61}/>
        <div className='flex flex-col items-start justify-center ml-3.5'>
            <p className='text-[#757575] text-base font-semibold'>Introducing tags</p>
            <p className='text-[#868686] text-sm font-normal'>Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
        </div>
    </div>
  )
}

export default FeatureBox
