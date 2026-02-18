import { useState, useEffect } from "react";

const Notes = () => {

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    details: ""
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value


    }));
  };

  // const [notes, setNotes] = useState([]);
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem("notes");
    return savedNotes ? JSON.parse(savedNotes) : [];
  });


  // useEffect(() => {
  //   const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
  //   if (savedNotes) {
  //     setNotes(savedNotes);
  //   }
  // }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleSave = () => {
    if (
      !formData.name.trim() ||
      !formData.title.trim() ||
      !formData.details.trim()
    ) {
      alert("Please fill all fields before saving the note.");
      return;
    }

    if (editIndex === null) {
      // New
      setNotes(prev => [...prev, formData]);
    } else {
      // UPDATE EXISTING
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = formData;
      setNotes(updatedNotes);
      setEditIndex(null);
    }

    // clear form after save
    setFormData({
      name: "",
      title: "",
      details: ""
    });
  };

  const [editIndex, setEditIndex] = useState(null);

  const Edit = (value) => {
    setFormData(notes[value])
    setEditIndex(value)
  }

  // Delete Element
  const Delete = (value) => {
    // const newNotes = [...notes];
    // newNotes.splice(value, 1);
    // setNotes(newNotes);
    setNotes(notes.filter((_, i) => i !== value));

    if (editIndex === value) {
      setEditIndex(null);
      setFormData({
        name: "",
        title: "",
        details: ""
      });
    }

  };

  const [search, setSearch] = useState("");

  const filteredNotes = search
    ? notes.filter(note =>
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.details.toLowerCase().includes(search.toLowerCase()) ||
      note.name.toLowerCase().includes(search.toLowerCase())
    )
    : notes;







  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-5">
      <div className="bg-white shadow-xl w-full max-w-md p-6 flex flex-col gap-6 rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Notes App
        </h1>

        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />

        <input
          type="text"
          placeholder="Enter Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
        />

        <textarea
          placeholder="Details....."
          name="details"
          rows={4}
          value={formData.details}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
        ></textarea>

        <button
          onClick={handleSave}
          className={`px-4 py-2 text-white rounded-md transition duration-200
                 ${editIndex === null
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-green-500 hover:bg-green-600"
            }`}
        >
          {editIndex === null ? "Save Note" : "Update Note"}
        </button>



        {/* Show Notes */}
        {notes.length > 0 && (
          <>
            <h1 className="text-lg font-semibold text-center text-gray-700 mt-2">
              Saved Notes
            </h1>


            {/* Search Bar */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search notes..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </>
        )}


        <div className="w-full max-h-60 grid overflow-y-auto grid-cols-1 gap-4">
          {filteredNotes.map((note, index) => (
            <div
              key={index}
              className="rounded-xl border border-gray-200 from-white to-gray-50 p-5 shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-800">
                  {note.title || "Untitled Note"}
                </h2>
                <span className="text-xs text-gray-400">
                  #{index + 1}
                </span>
              </div>

              {/* Details */}
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {note.details}
                </p>

                <div className="flex gap-3">
                  <button onClick={() => Edit(index)} className="px-3  py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200">
                    Edit
                  </button>
                  <button onClick={() => Delete(index)} className="px-2 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition duration-200">
                    Delete
                  </button>

                </div>

              </div>

              {/* Footer */}
              <div className="text-xs text-gray-500 border-t pt-2">
                Created by <span className="font-medium text-gray-700">
                  {note.name || "Anonymous"}
                </span>
              </div>
            </div>
          ))}
        </div>



      </div>


    </div>
  );
};

export default Notes;
