import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { id } = useParams();
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

  useEffect(() => {
    axios.get(`${API_BASE_URL}/tasks/${id}`).then((res) => {
      const t = res.data;

      setForm({
        title: t.title,
        description: t.description,
        assignedTo: t.assignedTo?._id || t.assignedTo,   
        deadline: t.deadline?.substring(0, 10),           
        status: t.status
      });
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_BASE_URL}/tasks/${id}`, form)
      .then(() => {
        alert("Task updated!");
        navigate("/tasks");
      })
      .catch(() => alert("Update failed"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-100">

        <h1 className="text-4xl font-bold text-black mb-6">Edit Task</h1>

        <form className="grid gap-4" onSubmit={handleSubmit}>

          <input
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="p-3 rounded-xl border border-green-300"
          />

          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="p-3 rounded-xl border border-green-300"
          />

          <select
            value={form.assignedTo}
            onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
            className="p-3 rounded-xl border border-green-300"
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e._id} value={e._id}>
                {e.name}
              </option>
            ))}
          </select>

          <input
            type="date"
            value={form.deadline}
            onChange={(e) => setForm({ ...form, deadline: e.target.value })}
            className="p-3 rounded-xl border border-green-300"
          />

          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
            className="p-3 rounded-xl border border-green-300"
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-semibold">
            Save Changes
          </button>

        </form>
      </div>
    </div>
  );
}
