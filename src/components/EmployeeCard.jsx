
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
        window.location.reload();
      })
      .catch(() => alert("Failed to delete employee"));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-green-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-2xl font-bold">
          {emp.name.charAt(0)}
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
          {emp.department}
        </span>
      </div>

      <h2 className="text-xl font-bold text-black mb-1">{emp.name}</h2>
      <p className="text-sm text-black mb-4">{emp.role}</p>

      <div className="flex items-center gap-2 text-sm text-black mb-4">
        <Mail className="w-4 h-4" />
        {emp.email}
      </div>

      <div className="flex gap-3 mt-4">

        <button
          onClick={handleDelete}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

        <button
          onClick={() => navigate(`/edit-employee/${emp._id}`)}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

      </div>
    </div>
  );
}
