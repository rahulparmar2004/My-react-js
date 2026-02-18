
const Card = ({ users }) => {
  return (
    <div className="w-full max-w-sm bg-white rounded-3xl shadow-xl overflow-hidden">
      {/* TOP */}
      <div className="h-28 bg-blue-600 relative flex justify-center">
        <img
          src={users.img}
          className="h-24 w-24 rounded-full object-cover border-4 border-blue-800 absolute -bottom-12"
          alt="Profile"
        />
      </div>

      {/* CENTER */}
      <div className="pt-16 pb-6 flex flex-col items-center gap-2">
        <h1 className="text-xl font-semibold text-gray-800">{users.name}</h1>
        <p className="text-gray-500 text-sm">{users.role}</p>
        <p className="text-gray-400 text-xs">{users.tech}</p>

        <div className="flex gap-5 mt-3 text-gray-700">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-github text-xl hover:text-black transition-colors"></i>
          </a>
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin-in text-xl hover:text-blue-600 transition-colors"></i>
          </a>
          <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram text-xl hover:text-pink-500 transition-colors"></i>
          </a>
        </div>

        <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition shadow-md hover:shadow-lg">
          Message
        </button>
      </div>

      {/* BOTTOM */}
      <div className="border-t px-5 py-4 flex flex-col gap-1 text-xs text-gray-600">
        <p>📞 {users.phone}</p>
        <p>✉️ <a href={`mailto:${users.email}`} className="hover:text-blue-600 transition">{users.email}</a></p>
      </div>
    </div>
  );
};

export default Card;

// Data
// const users = [
//   {
//     id: 1,
//     img: "https://thumbs.dreamstime.com/b/profile-picture-caucasian-male-employee-posing-office-happy-young-worker-look-camera-workplace-headshot-portrait-smiling-190186649.jpg",
//     name: "Aman Sharma",
//     role: "Frontend Developer",
//     tech: "Tech Job-Seeker",
//     phone: "+91 98760 9876",
//     email: "amansharma07@gmail.com",
//   },
//   {
//     id: 2,
//     img: "https://www.perfocal.com/blog/content/images/size/w960/2021/01/Perfocal_17-11-2019_TYWFAQ_100_standard-3.jpg",
//     name: "Neha Verma",
//     role: "Backend Developer",
//     tech: "AI Enthusiast",
//     phone: "+91 91234 5678",
//     email: "nehaverma@example.com",
//   },
//   {
//     id: 3,
//     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQehQovf--u0vmtyRRjJLY10YQoLVhyGh6YPQW2DKXFlxB3Z4ZQC8fxR_nEqgxNanQd16E&usqp=CAU",
//     name: "Rohit Singh",
//     role: "Full Stack Developer",
//     tech: "Blockchain Developer",
//     phone: "+91 99887 6655",
//     email: "rohitsingh@example.com",
//   },
// ];

