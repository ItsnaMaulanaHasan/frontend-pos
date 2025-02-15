/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

interface AddCustomerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCustomerAdded: () => void;
}

const AddCustomerModal = ({ isOpen, onClose, onCustomerAdded }: AddCustomerModalProps) => {
  const [name, setName] = useState("");
  const [level, setLevel] = useState("Warga");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, level }),
      });

      if (!response.ok) throw new Error("Gagal menambahkan customer");

      setName("");
      setLevel("Warga");
      onCustomerAdded();
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Tambah Customer</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Nama Customer:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border rounded-lg p-2" required />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Level:</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} className="w-full border rounded-lg p-2">
              <option value="Warga">Warga</option>
              <option value="Juragan">Juragan</option>
              <option value="Sultan">Sultan</option>
              <option value="Konglomerat">Konglomerat</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
              Batal
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
              {loading ? "Menambahkan..." : "Tambah"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCustomerModal;
