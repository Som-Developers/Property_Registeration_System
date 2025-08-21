"use client"
import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { AlertCircle, CheckCircle, Clock } from "lucide-react"
import "react-toastify/dist/ReactToastify.css"
import {
  useCreatePropertyMutation,
  useGetOwnerStatusQuery,
  useGetPropertyTypesQuery,
} from "@/redux/api/propertyApi"

const PropertyRegistrationForm = () => {
  const [formData, setFormData] = useState({
    property_name: "",
    address: "",
    area_size: "",
    property_type: "",
    description: "",
  })

  const [selectedFile, setSelectedFile] = useState(null)

  const {
    data: ownerStatusData,
    isLoading: loadingOwner,
    error: ownerError,
  } = useGetOwnerStatusQuery()

  const {
    data: propertyTypes = [],
    isLoading: loadingTypes,
    error: propertyTypeError,
  } = useGetPropertyTypesQuery()

  const [createProperty, { isLoading: submitting }] = useCreatePropertyMutation()

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { property_name, address, area_size, property_type, description } = formData

    if (!property_name.trim()) return toast.error("Property name is required")
    if (!address.trim()) return toast.error("Address is required")
    if (!area_size || area_size <= 0) return toast.error("Valid area size is required")
    if (!property_type) return toast.error("Property type is required")

    try {
      const form = new FormData()
      form.append("property_name", property_name.trim())
      form.append("address", address.trim())
      form.append("area_size", area_size)
      form.append("property_type", property_type)
      form.append("description", description.trim())

      if (selectedFile) {
        form.append("document", selectedFile)
      }

      await createProperty(form).unwrap()

      toast.success("✅ Property registered successfully! It's now pending admin approval.")
      setFormData({
        property_name: "",
        address: "",
        area_size: "",
        property_type: "",
        description: "",
      })
      setSelectedFile(null)
    } catch (error) {
      if (error?.data?.needsOwnerRegistration) {
        toast.error("❌ Please register as owner first!")
      } else if (error?.data?.ownerStatus === "pending") {
        toast.error("❌ Your owner profile is pending admin approval!")
      } else {
        toast.error(`❌ ${error?.data?.message || "Something went wrong"}`)
      }
    }
  }

  // Loading screen
  if (loadingOwner || loadingTypes) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Checking your owner status...</p>
        </div>
      </div>
    )
  }

  // Not registered as owner
  if (ownerError || ownerStatusData?.hasProfile === false) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Owner Registration Required</h2>
          <p className="text-gray-600 mb-6">
            You need to register as an owner before you can register properties.
          </p>
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

  const owner = ownerStatusData?.owner

  // Not verified yet
  if (!owner?.isVerified) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow text-center max-w-md">
          <Clock className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Waiting for Admin Approval</h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4 text-sm text-yellow-800">
            <p>
              <strong>Owner:</strong> {owner.fullName}
              <br />
              <strong>Status:</strong> Pending Approval
              <br />
              <strong>Submitted:</strong> {new Date(owner.createdAt).toLocaleDateString()}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            You'll be able to register properties once your owner profile is approved.
          </p>
        </div>
      </div>
    )
  }

  // Main Form
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Register New Property</h1>
          <div className="flex items-center justify-center space-x-2 text-green-600">
            <CheckCircle className="w-5 h-5" />
            <p>
              Owner: <strong>{owner.fullName}</strong> - Verified ✅
            </p>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Name *</label>
                <input
                  type="text"
                  value={formData.property_name}
                  onChange={(e) => setFormData({ ...formData, property_name: e.target.value })}
                  placeholder="e.g., Dalka Heights"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Property Type *</label>
                <select
                  value={formData.property_type}
                  onChange={(e) => setFormData({ ...formData, property_type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  {propertyTypes.map((type) => (
                    <option key={type._id} value={type._id}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g., KM4, Mogadishu"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Area Size (sqm) *</label>
              <input
                type="number"
                min="1"
                value={formData.area_size}
                onChange={(e) => setFormData({ ...formData, area_size: e.target.value })}
                placeholder="e.g., 120"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Details about the property..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document (optional)</label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full"
              />
            </div>

            <div className="flex justify-end pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center"
              >
                {submitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-b-2 border-white mr-2 rounded-full"></div>
                    Registering...
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
