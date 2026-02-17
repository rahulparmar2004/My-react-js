import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const API = "http://localhost:3000/users";

  // READ
  const getUsers = async () => {
    const res = await axios.get(API);
    setUsers(res.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  // CREATE & UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`${API}/${editId}`, { name, email });
      setEditId(null);
    } else {
      await axios.post(API, { name, email });
    }

    setName("");
    setEmail("");
    getUsers();
  };

  // DELETE
  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    getUsers();
  };

  // EDIT
  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditId(user.id);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">React CRUD App</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96 mb-6"
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-3 p-2 border rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600">
          {editId ? "Update User" : "Add User"}
        </button>
      </form>

      <div className="w-96">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 mb-3 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{user.name}</h2>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

