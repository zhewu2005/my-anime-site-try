import { useState, useEffect } from "react";
import { rtdb } from "./firebaseConfig";
import { ref, onValue, off } from "firebase/database";
import AnimeCard from "./AnimeCard";

export default function AnimeList() {
  const [animes, setAnimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // 你不確定資料路徑時，先用常見路徑逐一嘗試
    const candidatePaths = ["animes", "anime", "animeList", "動漫", "動漫清單"];

    const unsubscribers = [];
    let resolved = false;

    const normalizeToArray = (val) => {
      if (!val) return [];
      if (Array.isArray(val)) {
        return val
          .filter(Boolean)
          .map((item, idx) => ({ id: item?.id ?? String(idx), ...item }));
      }
      if (typeof val === "object") {
        return Object.entries(val).map(([key, item]) => ({ id: key, ...(item || {}) }));
      }
      return [];
    };

    setLoading(true);
    setError(null);

    candidatePaths.forEach((path) => {
      const r = ref(rtdb, path);

      const handler = (snapshot) => {
        if (resolved) return;

        const val = snapshot.val();
        const list = normalizeToArray(val);

        // 找到有資料的路徑就採用
        if (list.length > 0) {
          resolved = true;
          console.log("Realtime DB path matched:", path);
          console.log("Fetched animes:", list);
          setAnimes(list);
          setLoading(false);

          // 取消其餘監聽
          unsubscribers.forEach((u) => u());
        }
      };

      const errorHandler = (err) => {
        console.error("Realtime DB read error:", err);
        setError(err?.message || "讀取資料失敗");
        setLoading(false);
      };

      onValue(r, handler, errorHandler);
      unsubscribers.push(() => off(r, "value", handler));
    });

    // 如果所有路徑都沒有資料，5 秒後結束 loading，顯示提示
    const timeoutId = setTimeout(() => {
      if (!resolved) {
        setLoading(false);
      }
    }, 5000);

    return () => {
      clearTimeout(timeoutId);
      unsubscribers.forEach((u) => u());
    };
  }, []);

  const filteredAnimes = animes.filter((anime) =>
    (anime.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        📚 我的動漫清單
      </h1>

      <div className="max-w-xl mx-auto mb-10">
        <input
          type="text"
          placeholder="🔍 搜尋動漫標題..."
          className="w-full px-5 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-purple-600"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && (
        <p className="text-center text-red-600 text-sm mb-6">❌ {error}</p>
      )}

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {loading ? (
          <p className="text-center text-gray-700 text-lg col-span-full">
            ⏳ 正在載入動漫資料...
          </p>
        ) : filteredAnimes.length > 0 ? (
          filteredAnimes.map((anime) => (
            <AnimeCard
              key={anime.id}
              anime={anime}
              // Realtime DB 刪除尚未接上，先避免按鈕報錯
              onDelete={() => alert("刪除功能尚未接到 Realtime Database")}
            />
          ))
        ) : (
          <div className="text-center text-gray-700 text-lg col-span-full space-y-2">
            <p>沒有讀到任何動漫資料。</p>
            <p className="text-sm text-gray-600">
              請打開瀏覽器 Console，看是否有輸出「Realtime DB path matched: ...」。
              若沒有，代表資料不在 animes/anime/animeList 等路徑，或是讀取權限被拒。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}







