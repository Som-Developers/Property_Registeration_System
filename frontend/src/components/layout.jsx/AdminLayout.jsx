"use client"

import { useState } from "react"
import { Bell, ChevronDown, Search, User } from "lucide-react"
import AdminSidebar from "./AdminSidebare"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useNavigate, Outlet } from "react-router-dom"
import { useGetCurrentUserQuery } from "@/redux/api/userApi"

function AdminLayout({ children }) {
  // ✅ Accept children prop
  const [notifications] = useState(3)
  const navigate = useNavigate()
  const { data: user, isLoading } = useGetCurrentUserQuery()

  const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <AdminSidebar />
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-semibold text-gray-900">Property Registration Admin</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input placeholder="Search..." className="pl-10 w-64" />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs flex items-center justify-center">
                    {notifications}
                  </Badge>
                )}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-sm font-medium">
                      {isLoading ? "Loading..." : user?.username || user?.email || "Admin"}
                    </span>
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Profile Settings</DropdownMenuItem>
                  <DropdownMenuItem>System Settings</DropdownMenuItem>
                  <DropdownMenuItem>Activity Log</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600" onClick={handleLogout}>
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* ✅ Main content - render children if provided, otherwise use Outlet */}
        <main className="flex-1 p-6">{children || <Outlet />}</main>
      </div>
    </div>
  )
}

export default AdminLayout
