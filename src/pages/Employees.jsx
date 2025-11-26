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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2">Employees</h1>
            <p className="text-base sm:text-lg text-black">Manage your team members</p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-green-500" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-3 w-full border border-green-300 rounded-xl 
                           focus:ring-2 focus:ring-green-500 text-black"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <button
              onClick={() => navigate("/add-employee")}
              className="bg-gradient-to-r from-green-500 to-emerald-600 
                         text-white px-6 py-3 rounded-xl whitespace-nowrap"
            >
              + Add Employee
            </button>

          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filtered.map((emp) => (
            <EmployeeCard key={emp._id} emp={emp} />
          ))}
        </div>

      </div>
    </div>
  );
}

