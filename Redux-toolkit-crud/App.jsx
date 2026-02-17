import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  deleteUser,
  updateUser,
} from "../src/components/userslice";

function App() {
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      dispatch(updateUser({ id: editId, name }));
      setEditId(null);
    } else {
      dispatch(addUser(name));
    }

    setName("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Redux CRUD</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow rounded w-80 mb-6"
      >
        <input
          type="text"
          placeholder="Enter name"
          className="w-full p-2 border rounded mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button className="bg-blue-500 text-white w-full p-2 rounded">
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <div className="w-80">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-3 mb-2 shadow rounded flex justify-between"
          >
            <span>{user.name}</span>

            <div className="space-x-2">
              <button
                onClick={() => {
                  setName(user.name);
                  setEditId(user.id);
                }}
                className="bg-yellow-400 px-2 py-1 rounded"
              >
                Edit
              </button>

              <button
                onClick={() => dispatch(deleteUser(user.id))}
                className="bg-red-500 text-white px-2 py-1 rounded"
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
