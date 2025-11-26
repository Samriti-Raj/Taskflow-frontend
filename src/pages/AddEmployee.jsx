import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    department: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(`${API_BASE_URL}/employees`, form)
      .then(() => {
        alert("Employee added successfully!");
        navigate("/employees");
      })
      .catch(() => alert("Something went wrong"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-green-100">
        <h1 className="text-4xl font-bold text-black mb-6">Add Employee</h1>

        <form className="grid gap-4" onSubmit={handleSubmit}>
          <input
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Role"
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          />

          <input
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Department"
            onChange={(e) => setForm({ ...form, department: e.target.value })}
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-semibold"
          >
            Add Employee
          </button>
        </form>

      </div>
    </div>
  );
}
