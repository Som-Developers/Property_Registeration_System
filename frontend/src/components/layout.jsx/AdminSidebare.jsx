
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  Building2,
  CheckCircle,
  FileCheck,
  Home,
  Shield,
  Users,
  FileText,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/admin-dashboard",
    icon: Home,
  },
  {
    title: "Manage Property Types",
    href: "/admin/property-types",
    icon: Building2,
  },
  {
    title: "Approve Properties",
    href: "/admin/approve-properties",
    icon: CheckCircle,
  },
  {
    title: "Verify Owners",
    href: "/admin/verify-owners",
    icon: Shield,
  },
  {
    title: "Reports",
    href: "/admin/reports",
    icon: BarChart3,
  },
  {
    title: "Audit Logs",
    href: "/admin/audit-logs",
    icon: FileText,
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
  },
];

function AdminSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Admin Panel</h2>
              <p className="text-sm text-gray-500">Property Management</p>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <ChevronRight className={cn(
              "h-4 w-4 transition-transform",
              collapsed ? "rotate-0" : "rotate-180"
            )} />
          </button>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;
          
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("h-5 w-5", collapsed ? "mx-auto" : "mr-3")} />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}

export default AdminSidebar;