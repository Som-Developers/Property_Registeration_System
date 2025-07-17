
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    title: "Total Registered Properties",
    value: "2,847",
    change: "+12.5%",
    icon: Building2,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Owners Pending Verification",
    value: "156",
    change: "-8.2%",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "Properties Pending Approval",
    value: "89",
    change: "+5.1%",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Approved This Month",
    value: "234",
    change: "+18.3%",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
];

function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <p className={`text-xs ${
                stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default StatsCards;