import { useState } from "react";

const Review = () => {
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        img: "",
        star: "",
        details: "",
    });

    const [notes, setNotes] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [search, setSearch] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        if (
            !formData.name.trim() ||
            !formData.title.trim() ||
            !formData.img.trim() ||
            !formData.details.trim() ||
            !formData.star
        ) {
            alert("Please fill all fields");
            return;
        }

        if (editIndex === null) {
            setNotes((prev) => [...prev, formData]);
        } else {
            const updated = [...notes];
            updated[editIndex] = formData;
            setNotes(updated);
            setEditIndex(null);
        }

        setFormData({
            name: "",
            title: "",
            img: "",
            star: "",
            details: "",
        });
    };

    const Edit = (index) => {
        setFormData(notes[index]);
        setEditIndex(index);
    };

    const Delete = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
        if (editIndex === index) {
            setEditIndex(null);
            setFormData({
                name: "",
                title: "",
                img: "",
                star: "",
                details: "",
            });
        }
    };

    const filteredNotes = search
        ? notes.filter(
            (n) =>
                n.name.toLowerCase().includes(search.toLowerCase()) ||
                n.title.toLowerCase().includes(search.toLowerCase()) ||
                n.details.toLowerCase().includes(search.toLowerCase())
        )
        : notes;

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
            <div className="bg-white w-full max-w-6xl rounded-2xl shadow-xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* LEFT SIDE – FORM */}
                <div className="space-y-4">
                    <h1 className="text-2xl font-bold text-center">Review App</h1>

                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />

                    <input
                        type="text"
                        name="title"
                        placeholder="Your Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />

                    <input
                        type="text"
                        name="img"
                        placeholder="Profile Image URL"
                        value={formData.img}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    />

                    <select
                        name="star"
                        value={formData.star}
                        onChange={handleChange}
                        className="w-full px-w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                    >
                        <option value="">Select Rating</option>
                        <option value="1">⭐</option>
                        <option value="2">⭐⭐</option>
                        <option value="3">⭐⭐⭐</option>
                        <option value="4">⭐⭐⭐⭐</option>
                        <option value="5">⭐⭐⭐⭐⭐</option>
                    </select>

                    <textarea
                        name="details"
                        rows="3"
                        placeholder="Write your review..."
                        value={formData.details}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 resize-none"
                    />

                    <button
                        onClick={handleSave}
                        className={`w-full py-2 rounded-lg text-white font-semibold transition
                             ${editIndex === null
                                ? "bg-blue-500 hover:bg-blue-600"
                                : "bg-green-500 hover:bg-green-600"
                            }`}
                    >
                        {editIndex === null ? "Add Review" : "Update Review"}
                    </button>
                </div>

                {/* RIGHT SIDE – REVIEWS */}
                <div className="space-y-4">
                    {notes.length > 0 && (
                        <h1 className="text-2xl font-bold text-center">Review App</h1>
                    )}
                    {notes.length > 0 && (
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search reviews..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                        </div>
                    )}

                    <div className="space-y-4 max-h-130 overflow-y-auto">
                        {filteredNotes.map((note, index) => (
                            <div
                                key={index}
                                className="border rounded-2xl bg-white shadow-sm hover:shadow-lg transition overflow-hidden"
                            >
                                <img
                                    src={note.img}
                                    alt={note.name}
                                    className="w-full h-52 object-cover"
                                />

                                <div className="p-4">
                                    <h2 className="font-semibold">{note.name}</h2>
                                    <p className="text-sm text-gray-500 mb-1">{note.title}</p>

                                    <div className="text-yellow-400 mb-2">
                                        {"⭐".repeat(Number(note.star))}
                                    </div>

                                    <p className="text-sm text-gray-700 mb-3">
                                        {note.details}
                                    </p>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => Edit(index)}
                                            className="px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => Delete(index)}
                                            className="px-3 py-1 text-sm rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );

};

export default Review;
