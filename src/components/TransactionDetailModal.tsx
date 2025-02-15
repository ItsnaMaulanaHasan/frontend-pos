/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

interface TransactionDetailModalProps {
  isOpen: boolean;
  customerId: number | null;
  onClose: () => void;
}

const TransactionDetailModal = ({ isOpen, customerId, onClose }: TransactionDetailModalProps) => {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [noTransactions, setNoTransactions] = useState(false);

  useEffect(() => {
    if (!customerId) return;

    setLoading(true);
    setTransactions([]);
    setError("");
    setNoTransactions(false);

    const fetchTransactions = async () => {
      try {
        const response = await fetch(`/api/transactions/customer/${customerId}`);
        const data = await response.json();

        if (data.length === 0) {
          setNoTransactions(true);
        } else {
          setTransactions(data);
        }
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
        <h2 className="text-xl font-bold mb-4 text-blue-700">Detail Transaksi</h2>

        {loading && <p className="text-center text-gray-500">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {noTransactions && <p className="text-center text-gray-500">Tidak ada transaksi untuk customer ini.</p>}

        {transactions.map((transaction) => (
          <div key={transaction.id} className="mb-4">
            <p className="text-blue-600 font-semibold">Total: IDR {parseInt(transaction.total_price).toLocaleString()}</p>
            <p className="text-blue-600">Tanggal: {new Date(transaction.transaction_date).toLocaleDateString()}</p>

            <ul className="mt-2">
              {transaction.TransactionDetails.map((detail: any) => (
                <li key={detail.id} className="ml-4 text-gray-700">
                  {detail.Product.name} (x{detail.quantity}) - IDR {parseInt(detail.subtotal).toLocaleString()}
                </li>
              ))}
            </ul>
          </div>
        ))}

        <button onClick={onClose} className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-lg w-full">
          Tutup
        </button>
      </div>
    </div>
  );
};

export default TransactionDetailModal;
