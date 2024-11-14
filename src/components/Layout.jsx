import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {RetiroCursosIcon, ReducerNavside,DashboardIcon,DocumentIcon,GradesIcon} from './IconNavside'
import { NavItem } from './NavItem'

const menuOptions = [
  { icon: RetiroCursosIcon, label: "Weekly Reports", to: "/ViewReportForm" },
  { icon: DocumentIcon, label: "Progress Report", to: "/ViewToddler" },
  { icon: DashboardIcon, label: "Other", to: "/ViewReportForm" },
]

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  const toggleNav = () => setIsCollapsed(!isCollapsed)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000)
    }
    
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <aside 
          className={`${
            isCollapsed ? 'w-16' : 'w-64'
          } transition-all duration-300 flex flex-col fixed h-screen bg-[#8B0000]`}
        >
          <div className="h-24 bg-[#002D74] flex items-center justify-between px-4">
            {!isCollapsed && <div className="text-white font-bold text-xl"><img src="https://cloudpot2.s3.us-east-1.amazonaws.com/kpaa_logo.png"/></div>}
            <button 
              onClick={toggleNav} 
              className="text-white p-2 hover:bg-[#002D74] rounded-lg transition-colors"
            >
              <ReducerNavside />
            </button>
          </div>
          <nav className="flex-1 bg-[#001B44] text-white">
            <ul className="py-4">
              {menuOptions.map((option) => (
                <NavItem
                  key={option.label}
                  icon={option.icon}
                  label={option.label}
                  goTo={option.to}
                  isCollapsed={isCollapsed}
                />
              ))}
            </ul>
          </nav>
        </aside>
        
      )
      }

      {/* Mobile Bottom Navigation */}
      {isMobile && (
        <nav className="fixed bottom-0 left-0 right-0 bg-[#002D74] h-16 z-50">
          <ul className="h-full flex justify-around items-center px-4">
            {menuOptions.map((option) => (
              <NavItem
                key={option.label}
                icon={option.icon}
                label={option.label}
                goTo={option.to}
                isCollapsed={true}
                isMobile={true}
              />
            ))}
          </ul>
        </nav>
      )}

      {/* Main Content */}
      <main 
        className={`flex-1 ${
          !isMobile ? `${isCollapsed ? 'ml-16' : 'ml-64'}` : 'mb-16'
        } transition-all duration-300 bg-white`}
      >
        <div className="p-4">
          <Outlet />
        </div>
      </main>
    </div>
  )
}