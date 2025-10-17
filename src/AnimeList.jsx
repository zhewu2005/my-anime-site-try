import { useState, useEffect } from "react";

export default function AnimeList() {
  // 從 localStorage 載入資料
  const [animes, setAnimes] = useState(() => {
    const saved = localStorage.getItem("animes");
    return saved ? JSON.parse(saved) : [];
  });

  // 新增動漫輸入框狀態
  const [newAnime, setNewAnime] = useState({
    title: "",
    img: "",
    description: "",
  });

  // 同步更新 localStorage
  useEffect(() => {
    localStorage.setItem("animes", JSON.stringify(animes));
  }, [animes]);

  // 處理表單輸入
  const handleChange = (e) => {
    setNewAnime({ ...newAnime, [e.target.name]: e.target.value });
  };

  // 新增動漫
  const addAnime = (e) => {
    e.preventDefault();
    if (!newAnime.title || !newAnime.img) {
      alert("請輸入名稱與圖片連結！");
      return;
    }

    const newItem = {
      id: Date.now(),
      ...newAnime,
    };

    setAnimes([...animes, newItem]);
    setNewAnime({ title: "", img: "", description: "" });
  };

  // 刪除動漫
  const deleteAnime = (id) => {
    const updated = animes.filter((a) => a.id !== id);
    setAnimes(updated);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6">
      {/* 標題 */}
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        📚 我的動漫清單
      </h1>

      {/* 新增動漫表單 */}
      <form
        onSubmit={addAnime}
        className="bg-white shadow-md rounded-xl p-6 mb-10 max-w-2xl mx-auto"
      >
        <h2 className="text-2xl font-semibold text-purple-700 mb-4 text-center">
          ➕ 新增動漫
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="動漫名稱"
            value={newAnime.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="img"
            placeholder="圖片連結（URL）"
            value={newAnime.img}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="description"
            placeholder="簡短介紹（可選）"
            value={newAnime.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-purple-700 text-white py-3 rounded-lg hover:bg-purple-600 transition"
          >
            新增
          </button>
        </div>
      </form>

      {/* 動漫清單顯示 */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {animes.length > 0 ? (
          animes.map((anime) => (
            <div
              key={anime.id}
              className="bg-white shadow-md rounded-xl hover:shadow-xl transition transform duration-200 relative"
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
              <button
                onClick={() => deleteAnime(anime.id)}
                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
              >
                ✖
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-700 text-lg col-span-full">
            目前還沒有任何動漫，快新增一部吧！
          </p>
        )}
      </div>
    </div>
  );
}



  
  