import axios from "axios";
import { API_BASE_URL } from "../config";
import { Mail, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function EmployeeCard({ emp }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    axios
      .delete(`${API_BASE_URL}/employees/${emp._id}`)
      .then(() => {
        alert("Employee deleted successfully!");
        navigate(0);
      })
      .catch(() => alert("Failed to delete employee"));
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-3 md:p-4 border border-green-100">
      <div className="flex items-start justify-between mb-3">
        <div className="w-11 h-11 md:w-12 md:h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
          {emp.name.charAt(0)}
        </div>
        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {emp.department}
        </span>
      </div>

      <h2 className="text-base md:text-lg font-bold text-black mb-1 truncate">{emp.name}</h2>
      <p className="text-xs md:text-sm text-gray-600 mb-3 truncate">{emp.role}</p>

      <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600 mb-3 overflow-hidden">
        <Mail className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
        <span className="truncate">{emp.email}</span>
      </div>

      <div className="flex gap-16">

        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition text-xs md:text-sm font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>

        <button
          onClick={() => navigate(`/edit-employee/${emp._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition text-xs md:text-sm font-medium"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>

      </div>
    </div>
  );
}