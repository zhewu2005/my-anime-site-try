import { useState, useEffect } from "react";
import { db } from "./firebaseConfig";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { Link } from "react-router-dom";
import AnimeCard from "./AnimeCard"; // 匯入 AnimeCard 元件

export default function AnimeList() {
  // 動漫清單狀態
  const [animes, setAnimes] = useState([]);
  // 讀取狀態（建議加入，參照之前的建議）
  const [loading, setLoading] = useState(true);
  // 新增：搜尋關鍵字狀態
  const [searchTerm, setSearchTerm] = useState("");

  // 🔹 從 Firestore 抓取資料
  useEffect(() => {
    // 監聽 animes 集合
  const unsubscribe = onSnapshot(collection(db, "animes"), (querySnapshot) => {
    const animeData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setAnimes(animeData);
    setLoading(false); // 資料載入完成
  });
  return () => unsubscribe(); // 當 component 卸載時，取消監聽
}, []); // 依賴項是空的，所以只在 mount 時執行一次

  // 刪除動漫（保留此功能）
  const deleteAnime = async (id) => {
    if (confirm("確定要刪除此動漫嗎？")) {
      try {
        await deleteDoc(doc(db, "animes", id));
      }catch (error) {
        console.error("刪除失敗:", error);
      }
    };
  }

  // 新增：過濾動漫清單
  //    根據 searchTerm 過濾 animes 陣列
  const filteredAnimes = animes.filter((anime) =>
    anime.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6">
      {/* 頁面標題 */}
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        📚 我的動漫清單
      </h1>

      {/* 新增：搜尋框 UI */}
      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 搜尋動漫標題..."
          className="w-full px-5 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* 動漫清單顯示區 */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading ? (
          // 讀取中
          <p className="text-center text-gray-700 text-lg col-span-full">
            ⏳ 正在載入動漫資料...
          </p>
        ) : filteredAnimes.length > 0 ? ( //修改：改用 filteredAnimes
          // 在 map 中使用 AnimeCard 元件
          filteredAnimes.map((anime) => (
            <AnimeCard 
              key={anime.id} 
              anime={anime} 
              onDelete={deleteAnime} 
            />
          ))
        ) : (
          //若尚無資料
          <p className="text-center text-gray-700 text-lg col-span-full">
            尚未有任何動漫，請前往 Firebase 新增資料。
          </p>
        )}
      </div>
    </div>
  );
}






  
  