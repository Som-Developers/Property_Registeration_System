"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, RefreshCw, Building, Home, Clock } from "lucide-react"
import { toast } from "react-hot-toast"
import { useGetAllPropertiesAdminQuery, useApprovePropertyMutation } from "../redux/api/adminApi"
import CustomDataTable from "@/components/customTable"

function ApproveProperties() {
  // ✅ State for pagination and search (required by CustomDataTable)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")

  // ✅ API calls (keeping existing functionality)
  const {
    data: propertiesData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllPropertiesAdminQuery({
    page,
    limit,
    search,
    sort: "-created_at",
    searchFields: "property_name,address",
  })

  const [approvePropertyMutation, { isLoading: isApproving }] = useApprovePropertyMutation()

  const handleApprove = async (propertyId, propertyName) => {
    if (!propertyId) {
      toast.error("No property ID provided")
      return
    }

    if (!confirm(`Are you sure you want to approve "${propertyName}"?`)) {
      return
    }

    try {
      const result = await approvePropertyMutation(propertyId).unwrap()
      toast.success(`${propertyName} approved successfully!`)
      refetch()
    } catch (error) {
      console.error("Property approval failed:", error)
      toast.error(`Failed to approve property: ${error?.data?.message || error?.message || "Unknown error"}`)
    }
  }

  const handleReject = (propertyId, propertyName) => {
    console.log("Reject clicked for:", propertyId, propertyName)
    toast.error(`Reject functionality for "${propertyName}" - not implemented yet`)
  }

  const handleViewDetails = (property) => {
    console.log("View details for:", property)
    alert(`Property Details:
Name: ${property.property_name}
Address: ${property.address}
Area Size: ${property.area_size}
Type: ${property.property_type?.name || "N/A"}
Owner: ${property.owner?.fullName || "N/A"}
Status: ${property.is_approved ? "Approved" : "Pending"}`)
  }

  // ✅ Define columns for CustomDataTable (HIDING OBJECT ID)
  const columns = [
    {
      accessorKey: "propertyInfo",
      header: "Property Info",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.property_name}</div>
          {/* ✅ REMOVED: Object ID is now hidden */}
          <div className="text-sm text-gray-500">{row.original.address}</div>
        </div>
      ),
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span className="text-gray-900">{row.original.address}</span>,
    },
    {
      accessorKey: "area_size",
      header: "Area Size",
      cell: ({ row }) => <span className="text-gray-600">{row.original.area_size || "N/A"}</span>,
    },
    {
      accessorKey: "property_type",
      header: "Type",
      cell: ({ row }) => <span className="text-gray-600">{row.original.property_type?.name || "N/A"}</span>,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => <span className="text-gray-600">{row.original.owner?.fullName || "N/A"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.is_approved ? "default" : "destructive"}>
          {row.original.is_approved ? "Approved" : "Pending"}
        </Badge>
      ),
    },
    {
      accessorKey: "created_at",
      header: "Registration Date",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="text-gray-900">
            {row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : "N/A"}
          </div>
          <div className="text-gray-500">
            {row.original.created_at
              ? new Date(row.original.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : ""}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewDetails(row.original)} title="View Details">
            <Eye className="h-3 w-3" />
          </Button>

          {!row.original.is_approved && (
            <>
              <Button
                size="sm"
                onClick={() => {
                  console.log("🔘 Approve button clicked!")
                  handleApprove(row.original._id, row.original.property_name)
                }}
                disabled={isApproving}
                className="bg-green-600 hover:bg-green-700 text-white"
                title="Approve Property"
              >
                <CheckCircle className="h-3 w-3" />
                {isApproving ? " ..." : ""}
              </Button>

              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReject(row.original._id, row.original.property_name)}
                title="Reject Property"
              >
                <XCircle className="h-3 w-3" />
              </Button>
            </>
          )}
        </div>
      ),
    },
  ]

  // ✅ Handle loading state
  if (isLoading) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading properties...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ Handle error state
  if (isError) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-500">
              <p className="mb-4">Error loading properties:</p>
              <p className="text-sm mb-4">{error?.data?.message || error?.message || "Unknown error"}</p>
              <Button onClick={refetch}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const properties = propertiesData?.docs || []

  // ✅ Handle empty state
  if (properties.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="mb-4">No properties found</p>
              <Button onClick={refetch}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // ✅ Main render with CustomDataTable
  return (
    <div className="p-6 space-y-6">
      {/* ✅ Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Property Approval</CardTitle>
              <p className="text-gray-600 mt-1">
                Manage and approve property registrations ({propertiesData?.total || 0} total properties)
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={refetch} disabled={isFetching}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isFetching ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* ✅ Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Building className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Properties</p>
                <p className="text-2xl font-bold text-gray-900">{propertiesData?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {properties.filter((property) => property.is_approved).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {properties.filter((property) => !property.is_approved).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Home className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Page</p>
                <p className="text-2xl font-bold text-gray-900">{properties.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ CustomDataTable with all functionality */}
      <Card>
        <CardContent className="p-0">
          <CustomDataTable
            title="All Registered Properties"
            columns={columns}
            data={propertiesData}
            currentPage={page}
            setCurrentPage={setPage}
            rowsPerPage={limit}
            setRowsPerPage={setLimit}
            search={search}
            setSearch={setSearch}
            isLoading={isLoading}
            isFetching={isFetching}
            emptyMessage="No properties found"
            showRefresh={true}
            onRefresh={refetch}
            showButton={false} // Hide add button since this is for approval
            searchable={true}
            sortable={true}
          />
        </CardContent>
      </Card>

      {/* ✅ Processing indicator */}
      {isApproving && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-center text-blue-800">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
              <p>🔄 Processing property approval...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default ApproveProperties
