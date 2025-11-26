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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-base sm:text-lg text-black">Overview of your team and tasks</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-4 sm:p-6 border border-green-100"
            >
              <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3 sm:mb-4`}>
                <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              <h2 className="text-sm sm:text-base font-medium text-black mb-1">{stat.label}</h2>
              <p className={`text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-green-100">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">Recent Tasks</h2>
            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      task.status === "completed" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg text-black truncate">{task.title}</p>
                    <p className="text-sm sm:text-base text-black line-clamp-2">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-green-100">
            <h2 className="text-xl sm:text-2xl font-bold text-black mb-4">Team Members</h2>
            <div className="space-y-3">
              {employees.slice(0, 5).map((emp) => (
                <div key={emp._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-lg sm:text-xl font-bold flex-shrink-0">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-base sm:text-lg text-black truncate">{emp.name}</p>
                    <p className="text-sm sm:text-base text-black truncate">{emp.role}</p>
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