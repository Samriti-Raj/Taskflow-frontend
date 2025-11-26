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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-black mb-2">Dashboard</h1>
          <p className="text-lg text-black">Overview of your team and tasks</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all p-6 border border-green-100"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-base font-medium text-black mb-1">{stat.label}</h2>
              <p className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-2xl font-bold text-black mb-4">Recent Tasks</h2>

            <div className="space-y-3">
              {tasks.slice(0, 3).map((task) => (
                <div key={task._id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-green-50 transition">
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${
                      task.status === "completed" ? "bg-green-500" : "bg-amber-500"
                    }`}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-black">{task.title}</p>
                    <p className="text-base text-black">{task.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-green-100">
            <h2 className="text-2xl font-bold text-black mb-4">Team Members</h2>

            <div className="space-y-3">
              {employees.map((emp) => (
                <div key={emp._id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-green-50 transition">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-xl font-bold">
                    {emp.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-lg text-black">{emp.name}</p>
                    <p className="text-base text-black">{emp.role}</p>
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
