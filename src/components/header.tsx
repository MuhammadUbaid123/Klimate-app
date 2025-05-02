import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <div>
        <Link to={'/'}>
            <img src="/logo.png" alt="Klimate logo" className='h-14'  />
        </Link>
      </div>
    </header>
  )
}

export default Header
