"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
// Try using the @ alias instead of relative paths
import Sidebar from "@/components/Sidebar"
import PropertyRegistrationForm from "@/components/PropertyRegistrationForm"

const RegisterProperty = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <div className="relative flex min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div className="flex-1 transition-all duration-300 ease-in-out">
        <header className="bg-white shadow-sm border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-600 hover:text-gray-900 mr-3 sm:mr-4 p-1"
                aria-label="Toggle menu"
              >
                <Menu size={24} />
              </button>
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Register Property</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Add a new property to the system</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">John Doe</p>
                <p className="text-xs text-gray-500">Property Administrator</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                JD
              </div>
            </div>
          </div>
        </header>

        <main className="p-0">
          <PropertyRegistrationForm />
        </main>
      </div>
    </div>
  )
}

export default RegisterProperty
