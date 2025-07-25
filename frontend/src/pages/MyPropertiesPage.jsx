import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar"; // ✅ Update the path if needed
import { FileText, CheckCircle, XCircle, Download } from "lucide-react";

const MyPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [ownerStatus, setOwnerStatus] = useState("");

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/properties/my/properties", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperties(res.data.data);
        setOwnerStatus(res.data.ownerStatus);
      } catch (error) {
        console.error("Failed to fetch", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <Sidebar isOpen={true} onToggle={() => {}} />

      {/* ✅ Content Area */}
      <div className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">🧾 My Properties</h1>
        <p className="mb-6 text-sm text-gray-600">
          <span className="font-semibold">Owner Status:</span>{" "}
          <span className={ownerStatus === "verified" ? "text-green-600" : "text-red-600"}>
            {ownerStatus}
          </span>
        </p>

        {properties.map((p) => (
          <div key={p._id} className="bg-white rounded-lg shadow-md p-6 mb-4 border">
            <h2 className="text-lg font-semibold mb-2">{p.property_name}</h2>
            <p><strong>Type:</strong> {p.property_type?.name}</p>
            <p><strong>Address:</strong> {p.address}</p>
            <p><strong>Area Size:</strong> {p.area_size} sqm</p>

            <p className="flex items-center mt-2">
              <strong className="mr-2">Approval:</strong>
              {p.is_approved ? (
                <CheckCircle className="text-green-600" size={18} />
              ) : (
                <XCircle className="text-red-600" size={18} />
              )}
            </p>

            {p.documents.length > 0 ? (
              <a
                href={`http://localhost:3000${p.documents[0].filePath}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center mt-3 text-blue-600 hover:underline"
              >
                <Download className="mr-2" size={16} />
                View Document
              </a>
            ) : (
              <p className="text-gray-500 mt-3">📄 No document uploaded</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyPropertiesPage;
