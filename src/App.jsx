// src/App.jsx
import { Routes, Route, Link, useNavigate } from "react-router-dom"; // 引入 useNavigate
import Home from "./Home";
import AnimeList from "./AnimeList";
import AnimeDetail from "./AnimeDetail";
import About from "./About";
import Favorite from "./Favorite";
import Login from "./Login";

// 引入 useAuth (我們的「接收器」) 和 Firebase 相關功能
import { useAuth } from "./useAuth.js";
import { auth } from "./firebaseConfig";
import { signOut } from "firebase/auth";

export default function App() {
  // 使用 useAuth() 來「接收」廣播內容 (currentUser)
  const { currentUser } = useAuth();
  const navigate = useNavigate(); // 準備好跳轉功能

  // 建立一個「登出」函式
  const handleLogout = async () => {
    try {
      await signOut(auth); // 呼叫 Firebase 的登出函式
      navigate("/"); // 登出成功後，導向首頁
      console.log("登出成功！");
    } catch (error) {
      console.error("登出失敗:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* 導覽列 */}
      <nav className="bg-purple-800 shadow-md sticky top-0 z-10 w-full">
        <div className="flex items-center text-white w-full">
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
            
            {/* *** 這裡是修改的重點 ***
                使用「三元運算子」來判斷
                如果 currentUser 存在 (已登入) -> 顯示「登出」按鈕
                如果 currentUser 不存在 (未登入) -> 顯示「登入」按鈕
            */}
            {currentUser ? (
              // 「已登入」時顯示：
              <li className="flex-1 bg-red-500">
                <button
                  onClick={handleLogout} // 點擊按鈕時觸發登出
                  className="block w-full text-center py-4 text-lg font-bold hover:bg-red-400 transition"
                >
                  🚪 登出
                </button>
              </li>
            ) : (
              // 「未登入」時顯示 (跟你原本的一樣)：
              <li className="flex-1 bg-yellow-500">
                <Link
                  to="/login"
                  className="block w-full text-center py-4 text-lg font-bold hover:bg-yellow-400 transition"
                >
                  🔑 登入
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      {/* 路由區域 (這裡不需要變) */}
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/anime-list" element={<AnimeList />} />
          <Route path="/anime-detail/:id" element={<AnimeDetail />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
}













