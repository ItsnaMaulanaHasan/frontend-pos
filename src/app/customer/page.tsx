"use client";

import { useState } from "react";
import CustomerTable from "@/components/CustomerTable";
import Button from "@/components/Button";
import AddCustomerModal from "@/components/AddCustomerModal";
import TransactionDetailModal from "@/components/TransactionDetailModal";
import DeleteCustomerModal from "@/components/DeleteCustomerModal";
import EditTransactionModal from "@/components/EditTransactionModal";

export default function Customer() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(null);
  const [selectedTransactionId, setSelectedTransactionId] = useState<number | null>(null);
  const [refreshData, setRefreshData] = useState(0);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customer</h1>
        <div className="flex space-x-2">
          <button onClick={() => setIsAddModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Add New Customer
          </button>
          <input type="text" placeholder="Search Customer" className="border p-2 rounded-lg" />
          <Button text="Search" />
          <Button text="Filter" />
          <Button text="Refresh" onClick={() => setRefreshData(refreshData + 1)} />
        </div>
      </div>

      {/* Modals */}
      <AddCustomerModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onCustomerAdded={() => setRefreshData(refreshData + 1)} />

      <TransactionDetailModal isOpen={isDetailModalOpen} customerId={selectedCustomerId} onClose={() => setIsDetailModalOpen(false)} />

      <DeleteCustomerModal isOpen={isDeleteModalOpen} customerId={selectedCustomerId} onClose={() => setIsDeleteModalOpen(false)} onDeleted={() => setRefreshData(refreshData + 1)} />

      <EditTransactionModal isOpen={isEditModalOpen} transactionId={selectedTransactionId} onClose={() => setIsEditModalOpen(false)} />

      {/* Tabel Customer */}
      <CustomerTable
        key={refreshData}
        onDetail={(customerId: number) => {
          setSelectedCustomerId(customerId);
          setIsDetailModalOpen(true);
        }}
        onDelete={(customerId: number) => {
          setSelectedCustomerId(customerId);
          setIsDeleteModalOpen(true);
        }}
        onEdit={(transactionId: number) => {
          setSelectedTransactionId(transactionId);
          setIsEditModalOpen(true);
        }}
      />
    </div>
  );
}
