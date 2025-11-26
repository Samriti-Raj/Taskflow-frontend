
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
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 sm:p-6 border border-green-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl sm:text-2xl font-bold flex-shrink-0">
          {emp.name.charAt(0)}
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {emp.department}
        </span>
      </div>

      <h2 className="text-lg sm:text-xl font-bold text-black mb-1 truncate">{emp.name}</h2>
      <p className="text-sm text-black mb-4 truncate">{emp.role}</p>

      <div className="flex items-center gap-2 text-xs sm:text-sm text-black mb-4 overflow-hidden">
        <Mail className="w-4 h-4 flex-shrink-0" />
        <span className="truncate">{emp.email}</span>
      </div>

      <div className="flex flex-col xs:flex-row gap-3 mt-4">

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm sm:text-base"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <button
          onClick={() => navigate(`/edit-employee/${emp._id}`)}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition text-sm sm:text-base"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

      </div>
    </div>
  );
}