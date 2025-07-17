import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, XCircle, Eye, Download } from "lucide-react";

const pendingProperties = [
  {
    id: "PR001",
    propertyType: "Residential",
    owner: "John Smith",
    location: "Downtown District",
    submittedDate: "2024-01-15",
    status: "Under Review"
  },
  {
    id: "PR002",
    propertyType: "Commercial",
    owner: "ABC Corp",
    location: "Business Center",
    submittedDate: "2024-01-14",
    status: "Documents Pending"
  },
  {
    id: "PR003",
    propertyType: "Industrial",
    owner: "XYZ Industries",
    location: "Industrial Zone",
    submittedDate: "2024-01-13",
    status: "Under Review"
  },
];

const pendingOwners = [
  {
    id: "OW001",
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phoneNumber: "+1-555-0123",
    submittedDate: "2024-01-16",
    verificationStatus: "ID Verification Pending"
  },
  {
    id: "OW002", 
    name: "Michael Brown",
    email: "m.brown@email.com",
    phoneNumber: "+1-555-0124",
    submittedDate: "2024-01-15",
    verificationStatus: "Address Verification Pending"
  },
  {
    id: "OW003",
    name: "Emily Davis", 
    email: "emily.davis@email.com",
    phoneNumber: "+1-555-0125",
    submittedDate: "2024-01-14",
    verificationStatus: "Complete - Awaiting Approval"
  },
];

function PendingTables() {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
      {/* Pending Property Registrations */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Pending Property Registrations</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingProperties.map((property) => (
                <TableRow key={property.id}>
                  <TableCell className="font-medium">{property.id}</TableCell>
                  <TableCell>{property.propertyType}</TableCell>
                  <TableCell>{property.owner}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{property.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="default">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pending Owner Verifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Pending Owner Verifications</CardTitle>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingOwners.map((owner) => (
                <TableRow key={owner.id}>
                  <TableCell className="font-medium">{owner.id}</TableCell>
                  <TableCell>{owner.name}</TableCell>
                  <TableCell>{owner.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{owner.verificationStatus}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="default">
                        <CheckCircle className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <XCircle className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default PendingTables;
