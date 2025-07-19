"use client"
import { useState, useEffect } from "react"
import { toast, ToastContainer } from "react-toastify"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"

const PropertyRegistrationForm = () => {
  const [ownerStatus, setOwnerStatus] = useState(null)
  const [propertyTypes, setPropertyTypes] = useState([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    property_name: "",
    address: "",
    area_size: "",
    property_type: "",
    description: "",
  })

  // ✅ Check owner status on component mount
  useEffect(() => {
    checkOwnerStatus()
    loadPropertyTypes()
  }, [])

  const checkOwnerStatus = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/properties/my/owner-status", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setOwnerStatus(data.owner)
      } else {
        setOwnerStatus(null)
      }
    } catch (error) {
      console.error("Error checking owner status:", error)
      setOwnerStatus(null)
    } finally {
      setLoading(false)
    }
  }

  const loadPropertyTypes = async () => {
    try {
      const response = await fetch("/api/properties/property-types")
      const data = await response.json()

      if (response.ok) {
        setPropertyTypes(data.data || [])
      }
    } catch (error) {
      console.error("Error loading property types:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ✅ Validate form
    if (!formData.property_name.trim()) {
      toast.error("Property name is required")
      return
    }
    if (!formData.address.trim()) {
      toast.error("Address is required")
      return
    }
    if (!formData.area_size || formData.area_size <= 0) {
      toast.error("Valid area size is required")
      return
    }
    if (!formData.property_type) {
      toast.error("Property type is required")
      return
    }

    setSubmitting(true)

    try {
      const token = localStorage.getItem("token")
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          property_name: formData.property_name.trim(),
          address: formData.address.trim(),
          area_size: formData.area_size,
          property_type: formData.property_type,
          description: formData.description.trim(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success("✅ Property registered successfully! It's now pending admin approval.")

        // Reset form
        setFormData({
          property_name: "",
          address: "",
          area_size: "",
          property_type: "",
          description: "",
        })
      } else {
        if (data.needsOwnerRegistration) {
          toast.error("❌ Please register as owner first!")
        } else if (data.ownerStatus === "pending") {
          toast.error("❌ Your owner profile is pending admin approval!")
        } else {
          toast.error(`❌ ${data.message}`)
        }
      }
    } catch (error) {
      console.error("Registration failed:", error)
      toast.error("❌ Registration failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // ✅ Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking your owner status...</p>
        </div>
      </div>
    )
  }

  // ✅ No owner profile
  if (!ownerStatus) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Owner Registration Required</h2>
          <p className="text-gray-600 mb-6">You need to register as an owner before you can register properties.</p>
          <button
            onClick={() => (window.location.href = "/register-owner")}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
          >
            Register as Owner
          </button>
        </div>
      </div>
    )
  }

  // ✅ Owner pending approval
  if (!ownerStatus.isVerified) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-lg shadow max-w-md">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waiting for Admin Approval</h2>
          <p className="text-gray-600 mb-4">Your owner profile is currently being reviewed by our admin team.</p>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              <strong>Owner:</strong> {ownerStatus.fullName}
              <br />
              <strong>Status:</strong> <span className="text-yellow-600">Pending Approval</span>
              <br />
              <strong>Submitted:</strong> {new Date(ownerStatus.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You'll be able to register properties once your owner profile is approved.
          </p>
        </div>
      </div>
    )
  }

  // ✅ Owner verified - show property registration form
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Property</h1>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <p>
              Owner: <strong>{ownerStatus.fullName}</strong> - Verified ✅
            </p>
          </div>
          <p className="text-sm text-yellow-600 mt-2">📋 Properties require admin approval before becoming active</p>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Property Information */}
            <div className="border-b border-gray-200 pb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Property Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., Dalka Heights Apartments"
                    value={formData.property_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, property_name: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                  <select
                    value={formData.property_type}
                    onChange={(e) => setFormData((prev) => ({ ...prev, property_type: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map((type) => (
                      <option key={type._id} value={type._id}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
                <input
                  type="text"
                  placeholder="e.g., KM4, Mogadishu, Somalia"
                  value={formData.address}
                  onChange={(e) => setFormData((prev) => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Area Size (sqm) *</label>
                <input
                  type="number"
                  min="1"
                  placeholder="e.g., 120"
                  value={formData.area_size}
                  onChange={(e) => setFormData((prev) => ({ ...prev, area_size: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  placeholder="Describe the property features, amenities, etc."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Registering Property...
                  </>
                ) : (
                  "Register Property"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  )
}

export default PropertyRegistrationForm
