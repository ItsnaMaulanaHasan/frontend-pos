/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

interface CustomerTableProps {
  onDetail: (customerId: number) => void;
  onDelete: (customerId: number) => void;
  onEdit: (transactionId: number) => void;
  onSearch: (searchValue: string, setCustomer: (data: any) => void) => void;
  isSearched: boolean;
}

const CustomerTable = ({ onDetail, onDelete, onEdit, onSearch, isSearched }: CustomerTableProps) => {
  const [customers, setCustomers] = useState([]) as any;
  const [filterCustomers, setFilterCustomers] = useState([]) as any;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) throw new Error("Gagal mengambil data");
      const data = await response.json();
      setCustomers(data);
      setFilterCustomers(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (isSearched) {
      onSearch(customers, setFilterCustomers);
    }
  }, [isSearched]);

  if (loading) return <p className="text-center p-4">Loading...</p>;
  if (error) return <p className="text-center p-4 text-red-500">Error: {error}</p>;

  return (
    <table className="w-full border-collapse border rounded-lg bg-white shadow-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-3 text-left border">Customer Name</th>
          <th className="p-3 text-left border">Level</th>
          <th className="p-3 text-left border">Favorite Menu</th>
          <th className="p-3 text-left border">Total Transaction</th>
          <th className="p-3 text-left border">Action</th>
        </tr>
      </thead>
      <tbody>
        {filterCustomers.map((customer: any) => (
          <tr key={customer.id} className="border-t">
            <td className="p-3 border">{customer.name}</td>
            <td className="p-3 border">{customer.level}</td>
            <td className="p-3 border">{customer.favoriteMenu || "N/A"}</td>
            <td className="p-3 border">IDR {customer.totalTransaction.toLocaleString()}</td>
            <td className="p-3 border">
              <button onClick={() => onDetail(customer.id)} className="text-blue-500">
                Detail
              </button>{" "}
              |
              <button onClick={() => onEdit(customer.id)} className="text-yellow-500">
                Edit
              </button>{" "}
              |
              <button onClick={() => onDelete(customer.id)} className="text-red-500">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomerTable;
