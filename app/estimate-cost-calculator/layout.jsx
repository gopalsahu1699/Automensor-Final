'use client'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className=''>
        {children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout