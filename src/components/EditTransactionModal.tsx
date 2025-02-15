/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";

interface EditTransactionModalProps {
  isOpen: boolean;
  transactionId: number | null;
  onClose: () => void;
}

const EditTransactionModal = ({ isOpen, transactionId, onClose }: EditTransactionModalProps) => {
  const [products, setProducts] = useState<{ product_id: number; name: string; quantity: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!transactionId) return;

    const fetchTransactionDetails = async () => {
      try {
        const response = await fetch(`/api/transactions/edit/${transactionId}`);
        if (!response.ok) throw new Error("Failed to fetch transaction details");

        const data = await response.json();

        const formattedProducts = data[0].TransactionDetails.map((detail: any) => ({
          product_id: detail.Product.id,
          name: detail.Product.name,
          quantity: detail.quantity,
        }));

        setProducts(formattedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionDetails();
  }, [transactionId]);

  const handleQuantityChange = (index: number, quantity: number) => {
    const updatedProducts = [...products];
    updatedProducts[index].quantity = quantity;
    setProducts(updatedProducts);
  };

  const handleSubmit = async () => {
    if (!transactionId) return;

    const updatedData = { products };

    try {
      const response = await fetch(`/api/transactions/edit/${transactionId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });

      if (!response.ok) throw new Error("Failed to update transaction");

      onClose();
    } catch (error) {
      console.error(error);
      setError("Failed to update transaction");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Edit Transaksi</h2>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={product.product_id} className="flex justify-between items-center">
              <span>{product.name}</span>
              <input type="number" min="1" value={product.quantity} onChange={(e) => handleQuantityChange(index, parseInt(e.target.value, 10))} className="border p-2 rounded w-16 text-center" />
            </div>
          ))}
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Batal
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 text-white rounded-lg">
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTransactionModal;
