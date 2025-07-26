"use client"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Eye, RefreshCw, User, UserCheck, Clock } from "lucide-react"
import { toast } from "react-hot-toast"
import { useGetAllOwnersAdminQuery, useApproveOwnerMutation } from "../redux/api/adminApi"
import CustomDataTable from "@/components/customTable"

function VerifyOwners() {
  // ✅ State for pagination and search (required by CustomDataTable)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [search, setSearch] = useState("")

  // ✅ API calls (keeping existing functionality)
  const {
    data: ownersData,
    isLoading,
    isError,
    error,
    refetch,
    isFetching,
  } = useGetAllOwnersAdminQuery({
    page,
    limit,
    search,
    sort: "-createdAt",
    searchFields: "fullName,phone",
  })

  const [approveOwnerMutation, { isLoading: isApproving }] = useApproveOwnerMutation()

  console.log("API Data:", ownersData)

  // ✅ Keep all existing handlers - NO CHANGES
  const handleApprove = async (ownerId, ownerName) => {
    console.log("Approving:", ownerId, ownerName)

    if (!confirm(`Are you sure you want to approve ${ownerName}?`)) {
      return
    }

    try {
      const result = await approveOwnerMutation(ownerId).unwrap()
      console.log("Approval result:", result)
      toast.success(`${ownerName} approved successfully!`)
      refetch() // Refresh the data
    } catch (error) {
      console.error("Approval error:", error)
      toast.error("Failed to approve owner")
    }
  }

  const handleReject = (ownerId, ownerName) => {
    toast.error(`Reject functionality for ${ownerName} - not implemented yet`)
  }

  const handleViewDetails = (owner) => {
    alert(`Owner Details:\nName: ${owner.fullName}\nPhone: ${owner.phone}\nEmail: ${owner.userId?.email}`)
  }

  // ✅ Define columns for CustomDataTable (HIDING OBJECT ID)
  const columns = [
    {
      accessorKey: "ownerInfo",
      header: "Owner Info",
      cell: ({ row }) => (
        <div>
          <div className="font-medium text-gray-900">{row.original.fullName}</div>
          {/* ✅ REMOVED: Object ID is now hidden */}
          <div className="text-sm text-gray-500">{row.original.phone}</div>
        </div>
      ),
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <span className="text-gray-900">{row.original.phone}</span>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <span className="text-gray-600">{row.original.userId?.email || "N/A"}</span>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <span className="text-gray-600">{row.original.address || "N/A"}</span>,
    },
    {
      accessorKey: "govIdProof",
      header: "Gov ID",
      cell: ({ row }) => <span className="text-gray-600">{row.original.govIdProof || "N/A"}</span>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <Badge variant={row.original.isVerified ? "default" : "destructive"}>
          {row.original.isVerified ? "Verified" : "Pending"}
        </Badge>
      ),
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
          <Button size="sm" variant="outline" onClick={() => handleViewDetails(row.original)} title="View Details">
            <Eye className="h-3 w-3" />
          </Button>
          {!row.original.isVerified && (
            <>
              <Button
                size="sm"
                onClick={() => handleApprove(row.original._id, row.original.fullName)}
                disabled={isApproving}
                className="bg-green-600 hover:bg-green-700 text-white"
                title="Approve Owner"
              >
                <CheckCircle className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleReject(row.original._id, row.original.fullName)}
                title="Reject Owner"
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
              <p>Loading owners...</p>
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
              <p className="mb-4">Error loading owners:</p>
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

  // ✅ Handle empty state
  if (!ownersData || !ownersData.docs || ownersData.docs.length === 0) {
    return (
      <div className="p-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="mb-4">No owners found</p>
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
              <CardTitle className="text-2xl font-bold">Owner Verification</CardTitle>
              <p className="text-gray-600 mt-1">
                Manage and verify property owner registrations ({ownersData?.total || 0} total owners)
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
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Owners</p>
                <p className="text-2xl font-bold text-gray-900">{ownersData?.total || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Verified</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ownersData?.docs?.filter((owner) => owner.isVerified).length || 0}
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
                  {ownersData?.docs?.filter((owner) => !owner.isVerified).length || 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Eye className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Page</p>
                <p className="text-2xl font-bold text-gray-900">{ownersData?.docs?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ✅ CustomDataTable with all functionality */}
      <Card>
        <CardContent className="p-0">
          <CustomDataTable
            title="All Registered Owners"
            columns={columns}
            data={ownersData}
            currentPage={page}
            setCurrentPage={setPage}
            rowsPerPage={limit}
            setRowsPerPage={setLimit}
            search={search}
            setSearch={setSearch}
            isLoading={isLoading}
            isFetching={isFetching}
            emptyMessage="No owners found"
            showRefresh={true}
            onRefresh={refetch}
            showButton={false} // Hide add button since this is for verification
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
              <p>Processing approval...</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default VerifyOwners
