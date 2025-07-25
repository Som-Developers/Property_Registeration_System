"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import Sidebar from "@/components/Sidebar"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useRegisterOwnerMutation } from "@/redux/api/ownerApi"
import { useDispatch } from "react-redux"
import { setOwnerId } from "@/redux/slice/ownerSlice"
import { useGetCurrentUserQuery } from "@/redux/api/userApi"

const OwnerRegistrationPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    govIdProof: "",
  })

  const { data: currentUser } = useGetCurrentUserQuery()
  const [registerOwner, { isLoading }] = useRegisterOwnerMutation()
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await registerOwner(formData).unwrap()
      toast.success("Owner registered successfully")
      dispatch(setOwnerId(result.owner._id))
      setFormData({ fullName: "", phone: "", address: "", govIdProof: "" })
    } catch (error) {
      const message = error?.data?.message || error?.message || "Registration failed"
      toast.error(`❌ ${message}`)
    }
  }

  // Get initials for the avatar
  const initials = currentUser?.username
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Owner Registration</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">Register as a verified property owner</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">
                  {currentUser?.username || "Loading..."}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {currentUser?.role || "User"}
                </p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm sm:text-base">
                {initials || "U"}
              </div>
            </div>
          </div>
        </header>

        <main className="py-10 px-4">
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Owner Registration</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Government ID Proof</label>
                <input
                  type="text"
                  name="govIdProof"
                  value={formData.govIdProof}
                  onChange={handleChange}
                  placeholder="e.g., NIN123456"
                  className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? "Registering..." : "Register Owner"}
              </button>
            </form>
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </main>
      </div>
    </div>
  )
}

export default OwnerRegistrationPage
