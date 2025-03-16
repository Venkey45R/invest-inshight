import React from 'react'

function Footer() {
  return (
    <div className='w-full bg-[#004D40] text-[#ffffff]'>
            <h3 className='relative pb-6 text-2xl font-bold text-center top-6'>Let's build wealth together</h3>
            <div className='flex items-center justify-center gap-20 py-10 text-white'>
                <i class="fa-brands fa-linkedin text-4xl font-light"></i>
                <i class="fa-brands fa-square-x-twitter text-4xl font-light"></i>
                <i class="fa-brands fa-square-whatsapp text-4xl font-light"></i>
                <i class="fa-brands fa-square-instagram text-4xl font-light"></i>
            </div>
            <p className='pb-6 text-center'>&copy; Insight Invest - 2025</p>
        </div>
  )
}

export default Footer;