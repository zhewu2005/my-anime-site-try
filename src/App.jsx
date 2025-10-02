export default function App() {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* 導覽列 */}
      <nav className="bg-purple-900 shadow-md sticky top-0 z-10 w-full">
        <div className="flex items-center text-white w-full">
          {/* 左邊 LOGO */}
          <h1 className="text-xl font-bold px-6 py-4">
            🎬 我的動漫收藏
          </h1>

          {/* 右邊四個選單 */}
          <ul className="flex flex-1">
            <li className="flex-1">
              <a href="#" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                🏠 首頁
              </a>
            </li>
            <li className="flex-1">
              <a href="#" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                📚 動漫清單
              </a>
            </li>
            <li className="flex-1">
              <a href="#" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                🔎 動漫詳細頁
              </a>
            </li>
            <li className="flex-1">
              <a href="#" className="block w-full text-center py-4 text-lg hover:bg-purple-700 transition">
                🙋 關於我
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}











