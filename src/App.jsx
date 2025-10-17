import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import AnimeList from "./AnimeList";
import AnimeDetail from "./AnimeDetail";
import About from "./About";
import Favorite from "./Favorite";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 導覽列 */}
      <nav className="bg-purple-800 shadow-md sticky top-0 z-10 w-full">
        <div className="flex items-center text-white w-full">
          {/* 左邊 LOGO 可回首頁 */}
          <Link
            to="/"
            className="text-xl font-bold px-6 py-4 hover:text-yellow-300 transition"
          >
            🎬 我的動漫收藏
          </Link>

          {/* 導覽項目 */}
          <ul className="flex flex-1">
            <li className="flex-1">
              <Link
                to="/anime-list"
                className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition"
              >
                📚 動漫清單
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to="/favorite"
                className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition"
              >
                ⭐ 我的收藏
              </Link>
            </li>
            <li className="flex-1">
              <Link
                to="/about"
                className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition"
              >
                🙋 關於我
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* 路由區域 */}
      <div className="p-6">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime-list" element={<AnimeList />} />
          <Route path="/anime-detail/:id" element={<AnimeDetail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}













