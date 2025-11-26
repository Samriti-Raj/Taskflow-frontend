
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Users, Calendar, Trash2, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, employee }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    axios
      .delete(`${API_BASE_URL}/tasks/${task._id}`)
      .then(() => {
        alert("Task deleted successfully!");
        navigate(0);
      })
      .catch(() => alert("Failed to delete task"));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 sm:p-6 border border-green-100">

      <div className="flex justify-between items-start mb-4 gap-2">
        <h2 className="text-lg sm:text-xl font-bold text-black flex-1 min-w-0 break-words">{task.title}</h2>

        <span
          className={`px-3 py-1 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-sm sm:text-base text-black mb-4 line-clamp-3">{task.description}</p>


      <div className="space-y-2 text-xs sm:text-sm text-black mb-4">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            Assigned to:{" "}
            <span className="font-medium text-black">
              {employee ? employee.name : "Unknown"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">
            Deadline:{" "}
            <span className="font-medium text-black">{task.deadline}</span>
          </span>
        </div>
      </div>


      <div className="flex flex-col xs:flex-row gap-3 mt-5">

        <button
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 transition text-sm sm:text-base"
        >
          <Pencil className="w-4 h-4" />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 transition text-sm sm:text-base"
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </button>

      </div>

    </div>
  );
}