
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Filter } from "lucide-react";

function ReportPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <FileText className="h-5 w-5 mr-2" />
          Report Generation & Data Export
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Report Generation */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Generate Reports</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Report Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="properties">Properties Report</SelectItem>
                <SelectItem value="owners">Owners Report</SelectItem>
                <SelectItem value="verification">Verification Status</SelectItem>
                <SelectItem value="audit">Audit Report</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
            
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
              </SelectContent>
            </Select>
            
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Generate
            </Button>
          </div>
        </div>

        {/* Quick Export Options */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Export</h3>
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              All Properties (CSV)
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Pending Verifications (PDF)
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Monthly Summary (Excel)
            </Button>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Report
            </Button>
          </div>
        </div>

        {/* Recent Reports */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Reports</h3>
          <div className="space-y-2">
            {[
              { name: "Properties_Summary_Jan2024.pdf", date: "2 hours ago", status: "Ready" },
              { name: "Owner_Verification_Report.csv", date: "1 day ago", status: "Ready" },
              { name: "Audit_Log_Weekly.xlsx", date: "3 days ago", status: "Processing" },
            ].map((report, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{report.name}</p>
                    <p className="text-xs text-gray-500">{report.date}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={report.status === "Ready" ? "default" : "secondary"}>
                    {report.status}
                  </Badge>
                  {report.status === "Ready" && (
                    <Button size="sm" variant="ghost">
                      <Download className="h-3 w-3" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ReportPanel;
