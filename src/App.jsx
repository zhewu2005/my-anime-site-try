import { Routes, Route, Link } from "react-router-dom";
import About from "./About";       // 關於我
import AnimeList from "./AnimeList"; // 動漫清單
import AnimeDetail from "./AnimeDetail"; // 動漫詳細頁
import Home from "./Home"; // 首頁

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 導覽列 */}
      <nav className="bg-purple-900 shadow-md sticky top-0 z-10 w-full">
        <div className="flex items-center text-white w-full">
          {/* 左邊 LOGO */}
          <Link to="/" className="text-xl font-bold px-6 py-4">
            🎬 我的動漫收藏
          </Link>

          {/* 右邊四個選單 */}
          <ul className="flex flex-1">
            <li className="flex-1">
              <Link to="/anime-list" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                📚 動漫清單
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/anime-detail" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                🔎 動漫詳細頁
              </Link>
            </li>
            <li className="flex-1">
              <Link to="/about" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                🙋 關於我
              </Link>
            </li>
          </ul>
        </div>
      </nav>

       {/* 路由區域 */}
      <div className="p-6">
        <Routes>
          {/* 預設首頁 (一進來顯示) */}
          <Route path="/" element={<Home />} />

          {/* 其他頁面 */}
          <Route path="/anime-list" element={<AnimeList />} />
          <Route path="/anime-detail" element={<AnimeDetail />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </div>
  );
}











