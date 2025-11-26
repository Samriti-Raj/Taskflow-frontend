
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
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-3 md:p-4 border border-green-100">

      <div className="flex justify-between items-start mb-3 gap-2">
        <h2 className="text-base md:text-lg font-bold text-black flex-1 min-w-0 break-words">{task.title}</h2>

        <span
          className={`px-2 py-1 text-xs font-medium rounded-full whitespace-nowrap flex-shrink-0 ${
            task.status === "completed"
              ? "bg-green-100 text-green-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-3">{task.description}</p>


      <div className="space-y-1.5 text-xs md:text-sm text-gray-600 mb-3">
        <div className="flex items-center gap-2">
          <Users className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">
            Assigned to:{" "}
            <span className="font-medium text-black">
              {employee ? employee.name : "Unknown"}
            </span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
          <span className="truncate">
            Deadline:{" "}
            <span className="font-medium text-black">{task.deadline}</span>
          </span>
        </div>
      </div>


      <div className="flex gap-18">

        <button
          onClick={() => navigate(`/edit-task/${task._id}`)}
          className="flex-1 flex items-center justify-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-lg hover:bg-blue-600 transition text-xs md:text-sm font-medium"
        >
          <Pencil className="w-3.5 h-3.5" />
          Edit
        </button>

        <button
          onClick={handleDelete}
          className="flex-1 flex items-center justify-center gap-1.5 bg-red-500 text-white px-3 py-1.5 rounded-lg hover:bg-red-600 transition text-xs md:text-sm font-medium"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </button>

      </div>

    </div>
  );
}