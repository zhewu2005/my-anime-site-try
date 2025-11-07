import { Link } from "react-router-dom";

export default function Favorite() {
  // 📦 目前尚未有收藏系統，因此這裡暫時以空清單表示
  const favorites = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6 text-gray-800">
      {/* 頁面標題 */}
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        ❤️ 我的收藏清單
      </h1>

      {/* 若未來有資料，這裡會顯示收藏清單 */}
      {favorites.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {favorites.map((anime) => (
            <div
              key={anime.id}
              className="bg-white shadow-md rounded-xl hover:shadow-xl transition transform duration-200"
            >
              <img
                src={anime.img}
                alt={anime.title}
                className="rounded-t-xl h-60 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {anime.title}
                </h3>
                {anime.description && (
                  <p className="text-gray-600 text-sm mt-2">
                    {anime.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // ✅ 沒有收藏時顯示提示文字
        <div className="text-center text-gray-700 mt-20">
          <p className="text-lg mb-6">
            目前還沒有收藏任何動漫喔！💤
          </p>
          <Link
            to="/anime-list"
            className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
          >
            📚 前往動漫清單添加收藏
          </Link>
        </div>
      )}
    </div>
  );
}

