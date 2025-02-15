interface ButtonProps {
  text: string;
  primary?: boolean;
  onClick?: () => void; // Tambahkan onClick sebagai props opsional
}

const Button = ({ text, primary = false, onClick }: ButtonProps) => {
  return (
    <button
      onClick={onClick} // Pastikan onClick diteruskan
      className={`px-4 py-2 rounded-lg ${primary ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
    >
      {text}
    </button>
  );
};

export default Button;
