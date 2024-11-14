import React from 'react'
import { Link } from 'react-router-dom'

export const NavItem = ({ icon: Icon, label, goTo, isCollapsed, isMobile }) => {
  return (
    <li className={`
      flex items-center 
      ${isMobile ? 'px-2' : 'px-4 py-3'} 
      hover:bg-[#B50D12] transition-colors
    `}>
      <Link 
        to={goTo} 
        className={`
          flex items-center text-white w-full 
          ${isCollapsed ? 'justify-center' : ''} 
          ${isMobile ? 'flex-col text-xs' : ''}
        `}
      >
        <Icon className="text-white w-6 h-6 flex-shrink-0" />
        {(!isCollapsed || isMobile) && (
          <span className={`
            whitespace-nowrap
            ${isMobile ? 'mt-1 text-center' : 'ml-3'}
          `}>
            {label}
          </span>
        )}
      </Link>
    </li>
  )
}