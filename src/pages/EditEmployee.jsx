
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useNavigate, useParams } from "react-router-dom";

export default function EditEmployee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    role: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    axios.get(`${API_BASE_URL}/employees/${id}`).then((res) => {
      setForm(res.data);
    });
  }, [id]);


  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`${API_BASE_URL}/employees/${id}`, form)
      .then(() => {
        alert("Employee updated successfully!");
        navigate("/employees");
      })
      .catch(() => alert("Error updating employee"));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-8">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg border border-green-100 p-8">

        <h1 className="text-4xl font-bold text-black mb-6">Edit Employee</h1>

        <form className="grid gap-4" onSubmit={handleSubmit}>

          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Name"
          />

          <input
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Role"
          />

          <input
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Email"
          />

          <input
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="p-3 rounded-xl border border-green-300 text-black"
            placeholder="Department"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-3 rounded-xl font-semibold"
          >
            Save Changes
          </button>
        </form>

      </div>
    </div>
  );
}

