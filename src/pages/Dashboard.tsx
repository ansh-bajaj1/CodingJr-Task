import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";

function Dashboard() {
  const userContext = useContext(UserContext);
  const [search, setSearch] = useState("");

  if (!userContext)
    return <p className="p-4 text-red-500">UserContext not found</p>;

  const { users, loading, error } = userContext;

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.address.city.toLowerCase().includes(search.toLowerCase())
  );

  if (loading)
    return <p className="p-6 text-lg text-blue-600">Loading users...</p>;
  if (error)
    return <p className="p-6 text-lg text-red-500">Failed to load users.</p>;

  return (
    <div
      className="min-h-screen bg-gray-50 py-10 px-6"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/abstract-big-data-digital-technology-background-design_1017-22920.jpg?semt=ais_items_boosted&w=740')",
        width: "100%",
      }}
    >
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          User Dashboard
        </h1>

        <input
          type="text"
          placeholder="Search by name or city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse text-sm md:text-base">
            <thead>
              <tr className="bg-blue-100 text-left text-gray-700">
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Email</th>
                <th className="p-3 border">Street</th>
                <th className="p-3 border">City</th>
                <th className="p-3 border">ZipCode</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50 transition-colors duration-200"
                >
                  <td className="p-3 border">{user.name}</td>
                  <td className="p-3 border">{user.email}</td>
                  <td className="p-3 border">{user.address.street ?? "N/A"}</td>
                  <td className="p-3 border">{user.address.city}</td>
                  <td className="p-3 border">{user.address.zipCode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-right">
          <Link
            to="/dashboard/add"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add User
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
