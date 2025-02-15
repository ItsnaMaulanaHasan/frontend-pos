/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

interface TransactionDetailModalProps {
  isOpen: boolean;
  customerId: number | null;
  onClose: () => void;
}

const TransactionDetailModal = ({ isOpen, customerId, onClose }: TransactionDetailModalProps) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!customerId) return;

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/customer/${customerId}`);
        if (!response.ok) throw new Error("Failed to fetch transactions");

        const data = await response.json();
        setTransactions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [customerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <ul>
          {transactions.map((transaction: any) => (
            <li key={transaction.id} className="border-b p-2">
              <p>Total: IDR {transaction.total_price}</p>
              <p>Tanggal: {new Date(transaction.transaction_date).toLocaleDateString()}</p>
              <ul>
                {transaction.TransactionDetails.map((detail: any) => (
                  <li key={detail.id} className="ml-4 text-gray-700">
                    {detail.Product.name} (x{detail.quantity}) - IDR {detail.subtotal}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <button onClick={onClose} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-lg">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
