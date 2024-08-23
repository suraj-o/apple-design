import React from 'react'
import { appleImg, bagImg, searchImg } from '../utils'
import { navLists } from '../constant'

const Navbar = () => {
  return (
    <header className='w-full py-4 sm:px-16 px-5 flex justify-between items-center'>
        <nav className='flex w-full screen-max-width'>
            <img src={appleImg} alt='iphone' width={14} height={18}/>

            <div className='flex flex-1 justify-center max-sm:hidden'>
                {
                    navLists.map((content)=>(
                        <div key={content} className='px-5 text-gray-100 hover:text-white transition-all cursor-pointer'>
                            {content}
                        </div>
                    ))
                }
            </div>

            <div className='flex items-baseline max-sm:justify-end max-sm:flex-1 gap-5'>
                <img src={searchImg} alt='search' width={14} height={18}/>
                <img src={bagImg} alt='bag' width={14} height={18}/>
            </div>

        </nav>
    </header>
  )
}

export default Navbar
