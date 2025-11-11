// 引入 React Hook & Router
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

// 引入 Firebase Firestore 函式
import { db } from "./firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AnimeDetail() {
  // 抓取網址中的 id（例如 /anime-detail/abc123）
  const { id } = useParams();
  // 狀態管理：anime 存放單筆資料, loading 控制讀取狀態
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // 1. 增加 error 狀態

  // 進入頁面時：依照 id 從 Firestore 抓資料
  useEffect(() => {
    const fetchAnime = async () => {
      try {
        // 取得指定 id 的文件（對應 animes 集合中的一筆資料）
        const docRef = doc(db, "animes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          // 若找到該筆資料 → 存進狀態中
          setAnime({ id: docSnap.id, ...docSnap.data() });
        } else {
          // 若找不到 → 設為 null
          setAnime(null);
        }
      } catch (err) {
        console.error("抓取資料時出錯:", err);
        setError("資料讀取失敗，請稍後再試。"); // 2. 設定錯誤訊息
      } finally {
        // 結束載入狀態
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id]);

  // 畫面渲染部分
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        ⏳ 正在載入動漫資料...
      </div>
    );
  }

  // 3. 渲染錯誤畫面
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        ❌ {error}
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700">
        <p className="text-red-500 text-xl mb-6">❌ 找不到該動漫資料。</p>
        <Link
          to="/anime-list"
          className="bg-purple-700 text-white px-6 py-3 rounded-lg hover:bg-purple-600 transition"
        >
          ⬅ 返回動漫清單
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        {/* 圖片這樣能使firebase命名img、image都能夠讀取 */}
        <img
          src={anime.img || anime.image}
          alt={anime.title}
          className="rounded-xl mb-6 w-full h-80 object-cover"
        />

        {/* 標題 */}
        <h1 className="text-4xl font-bold mb-4 text-purple-800">
          {anime.title}
        </h1>

        {/* 簡介 */}
        {anime.description ? (
          <p className="text-lg leading-relaxed mb-8">{anime.description}</p>
        ) : (
          <p className="text-gray-500 mb-8">（此作品暫無介紹）</p>
        )}

        {/* 返回按鈕 */}
        <Link
          to="/anime-list"
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-600 transition"
        >
          ⬅ 返回動漫清單
        </Link>
      </div>
    </div>
  );
}

  