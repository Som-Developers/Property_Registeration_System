"use client"
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, Download } from "lucide-react"
import { useGetAllOwnersAdminQuery, useGetAllPropertiesAdminQuery } from "../redux/api/adminApi"
import CustomDataTable from "@/components/customTable"

function PendingTables() {
  // ✅ State for owners table
  const [ownersSearch, setOwnersSearch] = useState("")
  const [ownersPage, setOwnersPage] = useState(1)
  const [ownersLimit, setOwnersLimit] = useState(10)

  // ✅ State for properties table
  const [propertiesSearch, setPropertiesSearch] = useState("")
  const [propertiesPage, setPropertiesPage] = useState(1)
  const [propertiesLimit, setPropertiesLimit] = useState(10)

  // ✅ Owners API with full pagination and search
  const {
    data: owners,
    isLoading: ownersLoading,
    isError: ownersError,
    error: ownersErrorData,
    refetch: refetchOwners,
    isFetching: ownersFetching,
  } = useGetAllOwnersAdminQuery({
    page: ownersPage,
    limit: ownersLimit,
    search: ownersSearch,
    sort: "-createdAt",
    searchFields: "fullName,phone",
  })

  // ✅ Properties API with full pagination and search
  const {
    data: properties,
    isLoading: propertiesLoading,
    isError: propertiesError,
    error: propertiesErrorData,
    refetch: refetchProperties,
    isFetching: propertiesFetching,
  } = useGetAllPropertiesAdminQuery({
    page: propertiesPage,
    limit: propertiesLimit,
    search: propertiesSearch,
    sort: "-created_at",
    searchFields: "property_name,address",
  })

  // ✅ View Details handlers (read-only)
  const handleViewPropertyDetails = (property) => {
    alert(`Property Details:
Name: ${property.property_name}
Address: ${property.address}
Area Size: ${property.area_size}
Type: ${property.property_type?.name || "N/A"}
Owner: ${property.owner?.fullName || "N/A"}
Status: ${property.is_approved ? "Approved" : "Pending"}`)
  }

  const handleViewOwnerDetails = (owner) => {
    alert(`Owner Details:
Name: ${owner.fullName}
Phone: ${owner.phone}
Email: ${owner.userId?.email || "N/A"}
Address: ${owner.address || "N/A"}
Gov ID: ${owner.govIdProof || "N/A"}
Status: ${owner.isVerified ? "Verified" : "Pending"}`)
  }

  // ✅ Filter pending owners and create proper data structure
  const createPendingOwnersData = () => {
    if (!owners || !owners.docs) {
      return {
        docs: [],
        total: 0,
        page: ownersPage,
        limit: ownersLimit,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }

    // Filter only unverified owners
    const pendingOwners = owners.docs.filter((owner) => !owner.isVerified)
    const pendingTotal = pendingOwners.length

    return {
      docs: pendingOwners,
      total: pendingTotal,
      page: ownersPage,
      limit: ownersLimit,
      totalPages: Math.ceil(pendingTotal / ownersLimit),
      hasNextPage: ownersPage < Math.ceil(pendingTotal / ownersLimit),
      hasPrevPage: ownersPage > 1,
    }
  }

  // ✅ Filter pending properties and create proper data structure
  const createPendingPropertiesData = () => {
    if (!properties || !properties.docs) {
      return {
        docs: [],
        total: 0,
        page: propertiesPage,
        limit: propertiesLimit,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false,
      }
    }

    // Filter only non-approved properties
    const pendingProperties = properties.docs.filter((property) => !property.is_approved)
    const pendingTotal = pendingProperties.length

    return {
      docs: pendingProperties,
      total: pendingTotal,
      page: propertiesPage,
      limit: propertiesLimit,
      totalPages: Math.ceil(pendingTotal / propertiesLimit),
      hasNextPage: propertiesPage < Math.ceil(pendingTotal / propertiesLimit),
      hasPrevPage: propertiesPage > 1,
    }
  }

  // ✅ Define columns for pending owners (VIEW ONLY)
  const ownerColumns = [
    {
      accessorKey: "ownerInfo",
      header: "Owner Info",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.fullName}</div>
          <div className="text-sm text-gray-500">{row.original.phone}</div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <span>{row.original.phone}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span>{row.original.userId?.email || "N/A"}</span>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span>{row.original.address || "N/A"}</span>,
    },
    {
      accessorKey: "govIdProof",
      header: "Gov ID",
      cell: ({ row }) => <span>{row.original.govIdProof || "N/A"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: () => <Badge variant="destructive">Pending Verification</Badge>,
    },
    {
      accessorKey: "createdAt",
      header: "Registration Date",
      cell: ({ row }) => (
        <div className="text-sm">
          <div className="text-gray-900">{new Date(row.original.createdAt).toLocaleDateString()}</div>
          <div className="text-gray-500">
            {new Date(row.original.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
        </div>
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex space-x-2">
          <Button size="sm" variant="outline" onClick={() => handleViewOwnerDetails(row.original)} title="View Details">
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  // ✅ Define columns for pending properties (VIEW ONLY)
  const propertyColumns = [
    {
      accessorKey: "propertyInfo",
      header: "Property Info",
      cell: ({ row }) => (
        <div>
          <div className="font-medium">{row.original.property_name}</div>
          <div className="text-sm text-gray-500">{row.original.address}</div>
        </div>
      ),
    },
    {
      accessorKey: "property_name",
      header: "Property Name",
      cell: ({ row }) => <span>{row.original.property_name}</span>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span>{row.original.address}</span>,
    },
    {
      accessorKey: "area_size",
      header: "Area Size",
      cell: ({ row }) => <span>{row.original.area_size || "N/A"}</span>,
    },
    {
      accessorKey: "property_type",
      header: "Type",
      cell: ({ row }) => <span>{row.original.property_type?.name || "N/A"}</span>,
    },
    {
      accessorKey: "owner",
      header: "Owner",
      cell: ({ row }) => <span>{row.original.owner?.fullName || "N/A"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: () => <Badge variant="destructive">Pending</Badge>,
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
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewPropertyDetails(row.original)}
            title="View Details"
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      ),
    },
  ]

  if (ownersLoading || propertiesLoading) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading properties...</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p>Loading owners...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (ownersError || propertiesError) {
    return (
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <p className="text-center py-8 text-red-500">
              Failed to load data:{" "}
              {ownersErrorData?.data?.message ||
                ownersErrorData?.message ||
                propertiesErrorData?.data?.message ||
                propertiesErrorData?.message}
            </p>
            <div className="text-center">
              <Button
                onClick={() => {
                  refetchOwners()
                  refetchProperties()
                }}
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const pendingOwnersData = createPendingOwnersData()
  const pendingPropertiesData = createPendingPropertiesData()

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* ✅ Properties Table - FULL FEATURED CustomDataTable */}
      <Card>
        <CardContent className="p-0">
          <CustomDataTable
            title={`Pending Property Registrations (${pendingPropertiesData.total})`}
            columns={propertyColumns}
            data={pendingPropertiesData}
            currentPage={propertiesPage}
            setCurrentPage={setPropertiesPage}
            rowsPerPage={propertiesLimit}
            setRowsPerPage={setPropertiesLimit}
            search={propertiesSearch}
            setSearch={setPropertiesSearch}
            isLoading={propertiesLoading}
            isFetching={propertiesFetching}
            emptyMessage="No pending properties found"
            showRefresh={true}
            onRefresh={refetchProperties}
            showButton={false}
            searchable={true} // ✅ Enable search
            sortable={true} // ✅ Enable sorting
            Subject={
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            }
          />
        </CardContent>
      </Card>

      {/* ✅ Owners Table - FULL FEATURED CustomDataTable */}
      <Card>
        <CardContent className="p-0">
          <CustomDataTable
            title={`Pending Owner Verifications (${pendingOwnersData.total})`}
            columns={ownerColumns}
            data={pendingOwnersData}
            currentPage={ownersPage}
            setCurrentPage={setOwnersPage}
            rowsPerPage={ownersLimit}
            setRowsPerPage={setOwnersLimit}
            search={ownersSearch}
            setSearch={setOwnersSearch}
            isLoading={ownersLoading}
            isFetching={ownersFetching}
            emptyMessage="No pending owners found"
            showRefresh={true}
            onRefresh={refetchOwners}
            showButton={false}
            searchable={true} // ✅ Enable search
            sortable={true} // ✅ Enable sorting
          />
        </CardContent>
      </Card>
    </div>
  )
}

export default PendingTables
