
import AdminLayout from "@/components/layout.jsx/AdminLayout";
import StatsCards from "@/components/StatsCards";
import PropertiesChart from "@/components/PropertyCharts";
import PendingTables from "@/components/PendingTable";
import ReportPanel from "@/components/ReportPanel";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your property registration system.</p>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>

        {/* Statistics Cards */}
        <StatsCards />

        {/* Charts Section */}
        <PropertiesChart />

        {/* Pending Tables */}
        <PendingTables />

        {/* Report Generation Panel */}
        <ReportPanel />
      </div>
    </AdminLayout>
  );
}
