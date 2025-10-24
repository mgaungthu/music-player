import { Home, Music, ListMusic, User, BarChart2, PlusCircle } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-linear-to-b from-white to-blue-50 flex flex-col justify-between">
      {/* Top Section */}
      <div className="p-6">
        {/* Profile */}
        <div className="flex items-center gap-3 mb-8">
          <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Joshua" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="font-semibold text-gray-800">Joshua</p>
            <span className="text-[10px] bg-gray-100 border border-gray-200 text-gray-600 px-2 py-[1px] rounded">
              PREMIUM
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1 text-sm">
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 font-medium text-gray-700 cursor-pointer">
            <Home size={18} /> Home
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer">
            <Music size={18} /> Songs
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer">
            <ListMusic size={18} /> Playlists
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer">
            <User size={18} /> Just for You
          </a>
          <a className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-600 cursor-pointer">
            <BarChart2 size={18} /> Top Charts
          </a>
        </nav>

        {/* Playlists */}
        <div className="mt-10  p-4 rounded-xl">
          <p className="uppercase text-xs font-semibold mb-3 text-gray-400">Your Playlists</p>
          <div className="space-y-2 text-sm text-gray-700">
            <p>Workout Mix</p>
            <p>Chillin’ at Home</p>
            <p>Booping at Adobe</p>
            <p>XD 4 Life</p>
          </div>

          <button className="flex items-center gap-2 mt-5 text-sm text-gray-500 hover:text-pinkGrad">
            <PlusCircle size={16} /> Add Playlist
          </button>
        </div>
      </div>
    </aside>
  );
}