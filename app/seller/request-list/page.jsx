"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Client, Databases } from "appwrite";

// 🔑 Environment variables
const PROJECT_ID = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_USER_REQUEST_COLLECTION_ID;

// 🔗 Appwrite client setup
const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject(PROJECT_ID);

const databases = new Databases(client);

export default function RequestList() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [dateFilter, setDateFilter] = useState("");
  const [monthFilter, setMonthFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // ✅ Fetch all requests
  useEffect(() => {
    (async () => {
      try {
        const res = await databases.listDocuments(DATABASE_ID, COLLECTION_ID);
        setRequests(res.documents);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load requests");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ Update status
  const handleStatusChange = async (id, newStatus) => {
    try {
      const updated = await databases.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id,
        { status: newStatus }
      );

      // update UI immediately
      setRequests((prev) =>
        prev.map((req) => (req.$id === id ? updated : req))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  // ✅ Apply combined filters including status
  const filteredRequests = requests.filter((req) => {
    const created = new Date(req.$createdAt);

    if (dateFilter) {
      const filterDate = new Date(dateFilter);
      if (
        created.getFullYear() !== filterDate.getFullYear() ||
        created.getMonth() !== filterDate.getMonth() ||
        created.getDate() !== filterDate.getDate()
      )
        return false;
    }

    if (monthFilter) {
      const [year, month] = monthFilter.split("-");
      if (
        created.getFullYear() !== parseInt(year) ||
        created.getMonth() !== parseInt(month) - 1
      )
        return false;
    }

    if (yearFilter && created.getFullYear() !== parseInt(yearFilter)) {
      return false;
    }

    if (statusFilter && statusFilter !== "") {
      // Filter by status field in document data
      if ((req.status || "").toLowerCase() !== statusFilter.toLowerCase()) {
        return false;
      }
    }

    return true;
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-blue-700 mb-8 text-center"
      >
        My Requests
      </motion.h1>

      {/* Filters */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-wrap gap-4 justify-center">
        <FilterInput
          id="dateFilter"
          label="Filter by Date"
          type="date"
          value={dateFilter}
          onChange={setDateFilter}
        />
        <FilterInput
          id="monthFilter"
          label="Filter by Month"
          type="month"
          value={monthFilter}
          onChange={setMonthFilter}
        />
        <FilterInput
          id="yearFilter"
          label="Filter by Year"
          type="number"
          value={yearFilter}
          min="2000"
          max={new Date().getFullYear()}
          placeholder="Year"
          onChange={setYearFilter}
        />
        <FilterSelect
          id="statusFilter"
          label="Filter by Status"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "", label: "All Statuses" },
            { value: "new", label: "New Received" },
            { value: "read", label: "Already Read" },
            { value: "follow-up", label: "Follow Up" },
          ]}
        />
      </div>

      {loading && <p className="text-center text-gray-600">Loading requests...</p>}
      {error && <p className="text-center text-red-600">{error}</p>}
      {!loading && !error && filteredRequests.length === 0 && (
        <p className="text-center text-gray-700">No requests found.</p>
      )}

      {/* Requests List */}
      <div className="max-w-4xl mx-auto grid gap-6">
        {filteredRequests.map((req) => (
          <motion.div
            key={req.$id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow border border-blue-200"
          >
            <RequestCard data={req} onStatusChange={handleStatusChange} />
          </motion.div>
        ))}
      </div>
    </main>
  );
}

/* ------------------- 🔹 Reusable Components ------------------- */
function FilterInput({ id, label, type, value, onChange, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-blue-600 block mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
        {...props}
      />
    </div>
  );
}

function FilterSelect({ id, label, value, onChange, options }) {
  return (
    <div>
      <label htmlFor={id} className="font-semibold text-blue-600 block mb-1">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

function RequestCard({ data, onStatusChange }) {
  return (
    <>
      <p>
        <span className="font-semibold text-blue-600">Name:</span> {data.name || "N/A"}
      </p>
      <p>
        <span className="font-semibold text-blue-600">Email:</span> {data.email || "N/A"}
      </p>
      <p>
        <span className="font-semibold text-blue-600">Phone:</span> {data.phone || "N/A"}
      </p>
      <p className="mt-2">
        <span className="font-semibold text-blue-600">Message:</span>
      </p>
      <p className="whitespace-pre-wrap mt-1 text-gray-800">{data.message || "N/A"}</p>
      <p className="mt-2 text-sm text-gray-500">
        Created: {new Date(data.$createdAt).toLocaleString()}
      </p>

      {/* 🔹 Status Dropdown */}
      <div className="mt-4">
        <label className="font-semibold text-blue-600 mr-2">Status:</label>
        <select
          value={data.status || ""}
          onChange={(e) => onStatusChange(data.$id, e.target.value)}
          className="border border-gray-300 rounded px-3 py-1"
        >
          <option value="">-- Select --</option>
          <option value="new">New Received</option>
          <option value="read">Already Read</option>
          <option value="follow-up">Follow Up</option>
        </select>
      </div>
    </>
  );
}
