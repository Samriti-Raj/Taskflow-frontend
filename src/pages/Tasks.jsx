

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">Tasks</h1>
            <p className="text-base sm:text-lg text-black">Track and manage all tasks</p>
          </div>

          <button
            onClick={() => navigate("/add-task")}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white 
                       px-6 py-3 rounded-xl whitespace-nowrap self-start sm:self-auto"
          >
            + Add Task
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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