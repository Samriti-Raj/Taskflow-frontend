import { useEffect, useState } from "react";
import axios from "axios";
import { Users, ClipboardList, Calendar } from "lucide-react";
import { API_BASE_URL } from "../config";

export default function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get(`${API_BASE_URL}/employees`).then(res => setEmployees(res.data));
    axios.get(`${API_BASE_URL}/tasks`).then(res => setTasks(res.data));
  }, []);

  const stats = [
    {
      label: "Total Employees",
      value: employees.length,
      icon: Users,
      color: "from-green-500 to-emerald-500"
    },
    {
      label: "Total Tasks",
      value: tasks.length,
      icon: ClipboardList,
      color: "from-emerald-500 to-teal-500"
    },
    {
      label: "Completed Tasks",
      value: tasks.filter((t) => t.status === "completed").length,
      icon: Calendar,
      color: "from-teal-500 to-cyan-500"
    },
    {
      label: "Pending Tasks",
      value: tasks.filter((t) => t.status === "pending").length,
      icon: ClipboardList,
      color: "from-lime-500 to-green-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1">Dashboard</h1>
          <p className="text-sm md:text-base text-gray-600">Overview of your team and tasks</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-3 md:p-4 border border-green-100"
            >
              <div className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center mb-2 md:mb-3`}>
                <stat.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
              </div>
              <h2 className="text-xs md:text-sm font-medium text-gray-600 mb-1">{stat.label}</h2>
              <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
          <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border border-green-100">
            <h2 className="text-lg md:text-xl font-bold text-black mb-3">Recent Tasks</h2>
            <div className="space-y-2">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id} className="flex items-start gap-2 p-2 rounded-lg hover:bg-green-50 transition">
                  <div
                    className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                      task.status === "completed" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm md:text-base text-black truncate">{task.title}</p>
                    <p className="text-xs md:text-sm text-gray-600 line-clamp-2">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-3 md:p-4 border border-green-100">
            <h2 className="text-lg md:text-xl font-bold text-black mb-3">Team Members</h2>
            <div className="space-y-2">
              {employees.slice(0, 5).map((emp) => (
                <div key={emp._id} className="flex items-center gap-2 p-2 rounded-lg hover:bg-green-50 transition">
                  <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm md:text-base font-bold flex-shrink-0">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm md:text-base text-black truncate">{emp.name}</p>
                    <p className="text-xs md:text-sm text-gray-600 truncate">{emp.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}