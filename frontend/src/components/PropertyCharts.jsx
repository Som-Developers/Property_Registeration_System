import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { useGetPropertyTypesQuery } from "../redux/api/propertyTypeApi"

const barData = [
  { month: "Jan", properties: 45 },
  { month: "Feb", properties: 52 },
  { month: "Mar", properties: 48 },
  { month: "Apr", properties: 61 },
  { month: "May", properties: 55 },
  { month: "Jun", properties: 67 },
]

// Colors for different property types
const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#F97316", "#06B6D4", "#84CC16"]

function PropertiesChart() {
  // ✅ Fetch property types from API
  const {
    data: propertyTypesData,
    isLoading: propertyTypesLoading,
    isError: propertyTypesError,
    error: propertyTypesErrorData,
  } = useGetPropertyTypesQuery({
    page: 1,
    limit: 50, // Get all property types
  })

  console.log("Property Types Data:", propertyTypesData)

  // ✅ Transform API data for pie chart
  const createPieData = () => {
    if (!propertyTypesData || !propertyTypesData.docs) {
      // Fallback to static data if API fails
      return [
        { name: "Residential", value: 1247, color: "#3B82F6" },
        { name: "Commercial", value: 856, color: "#10B981" },
        { name: "Industrial", value: 432, color: "#F59E0B" },
        { name: "Agricultural", value: 312, color: "#EF4444" },
      ]
    }

    // Transform property types to pie chart format
    return propertyTypesData.docs.map((propertyType, index) => ({
      name: propertyType.name,
      // ✅ For now, using mock values - you can replace this with real property counts later
      value: Math.floor(Math.random() * 1000) + 200, // Random value between 200-1200
      color: colors[index % colors.length], // Cycle through colors
    }))
  }

  const pieData = createPieData()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Monthly Registrations</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="properties" fill="#3B82F6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Pie Chart - Now Dynamic */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Properties by Type
            {propertyTypesLoading && <span className="text-sm text-gray-500 ml-2">(Loading...)</span>}
            {propertyTypesError && <span className="text-sm text-red-500 ml-2">(Error loading types)</span>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {propertyTypesLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : propertyTypesError ? (
            <div className="flex items-center justify-center h-[300px] text-red-500">
              <div className="text-center">
                <p>Failed to load property types</p>
                <p className="text-sm mt-1">
                  {propertyTypesErrorData?.data?.message || propertyTypesErrorData?.message || "Unknown error"}
                </p>
              </div>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default PropertiesChart
