

import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tasks`).then((r) => setTasks(r.data));
    axios.get(`${API_BASE_URL}/employees`).then((r) => setEmployees(r.data));
  }, []);

  const normalizeId = (id) => {
    if (!id) return "";
    if (typeof id === "object" && id.$oid) return id.$oid.toString();
    if (typeof id === "object" && id._id) return id._id.toString();
    return id.toString();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1">Tasks</h1>
            <p className="text-sm md:text-base text-gray-600">Track and manage all tasks</p>
          </div>

          <button
            onClick={() => navigate("/add-task")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                       px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap self-start sm:self-auto hover:shadow-md transition"
          >
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {tasks.map((task) => {

            const emp = employees.find(
              (e) => normalizeId(e._id) === normalizeId(task.assignedTo)
            );

            return (
              <TaskCard 
                key={task._id} 
                task={task} 
                employee={emp} 
              />
            );
          })}
        </div>

      </div>
    </div>
  );
}