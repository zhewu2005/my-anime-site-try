import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function AnimeList() {
  // 🔹 動漫清單狀態
  const [animes, setAnimes] = useState([]);

  // 🔹 從 Firestore 抓取資料
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "animes"));
        const animeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAnimes(animeData);
      } catch (error) {
        console.error("讀取資料失敗：", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 刪除動漫（保留此功能）
  const deleteAnime = async (id) => {
    if (confirm("確定要刪除此動漫嗎？")) {
      await deleteDoc(doc(db, "animes", id));
      setAnimes(animes.filter((a) => a.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6">
      {/* 頁面標題 */}
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        📚 我的動漫清單
      </h1>

      {/* 動漫清單顯示區 */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {animes.length > 0 ? (
          animes.map((anime) => (
            <div
              key={anime.id}
              className="bg-white shadow-md rounded-xl hover:shadow-xl transition transform duration-200 relative"
            >
              {/* 點擊圖片可進入詳細頁、圖片這樣能使firebase命名img、image都能夠讀取 */}
              <Link to={`/anime-detail/${anime.id}`}>
                <img
                  src={anime.img || anime.image}
                  alt={anime.title}
                  className="rounded-t-xl h-60 w-full object-cover hover:opacity-90 transition"
                />
              </Link>

              {/* 動漫資訊 */}
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

              {/* 刪除按鈕 */}
              <button
                onClick={() => deleteAnime(anime.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          // 🔸 若尚無資料
          <p className="text-center text-gray-700 text-lg col-span-full">
            尚未有任何動漫，請前往 Firebase 新增資料。
          </p>
        )}
      </div>
    </div>
  );
}






  
  