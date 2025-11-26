
import { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${API_BASE_URL}/employees`).then((res) => setEmployees(res.data));
  }, []);

  const filtered = employees.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.department.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 md:mb-6 gap-3">
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-1">Employees</h1>
            <p className="text-sm md:text-base text-gray-600">Manage your team members</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">

            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-9 pr-3 py-2 w-full text-sm border border-green-300 rounded-lg 
                           focus:ring-2 focus:ring-green-500 focus:outline-none text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => navigate("/add-employee")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 
                         text-white px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap hover:shadow-md transition"
            >
              + Add Employee
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {filtered.map((emp) => (
            <EmployeeCard key={emp._id} emp={emp} />
          ))}
        </div>

      </div>
    </div>
  );
}

