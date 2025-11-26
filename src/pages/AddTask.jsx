import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    title: "",
    description: "",
    assignedTo: "",
    deadline: "",
    status: "pending"
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/employees`).then((res) => setEmployees(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting Task:", form);

    axios.post(`${API_BASE_URL}/tasks`, form)
      .then(() => {
        alert("Task added!");
        navigate("/tasks");
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-100">
        <h1 className="text-4xl font-bold mb-6 text-black">Add Task</h1>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-xl border border-green-300"
            placeholder="Task Title"
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />

          <textarea
            className="p-3 rounded-xl border border-green-300"
            placeholder="Description"
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />

          <select
            className="p-3 rounded-xl border border-green-300"
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>{e.name}</option>
            ))}
          </select>

          <input
            type="date"
            className="p-3 rounded-xl border border-green-300"
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
          />

          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-semibold">
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}
