"use client";

interface DeleteCustomerModalProps {
  isOpen: boolean;
  customerId: number | null;
  onClose: () => void;
  onDeleted: () => void;
}

const DeleteCustomerModal = ({ isOpen, customerId, onClose, onDeleted }: DeleteCustomerModalProps) => {
  const handleDelete = async () => {
    if (!customerId) return;

    try {
      const response = await fetch(`/api/customers/${customerId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete customer");

      onDeleted();
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Konfirmasi Hapus</h2>
        <p>Apakah Anda yakin ingin menghapus customer ini?</p>
        <div className="flex justify-end space-x-2 mt-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded-lg">
            Batal
          </button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg">
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCustomerModal;
