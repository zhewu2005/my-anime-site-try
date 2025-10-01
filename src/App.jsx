export default function App() {
  const animes = [
    { id: 1, title: "進擊的巨人" },
    { id: 2, title: "鬼滅之刃" },
    { id: 3, title: "咒術迴戰" },
    { id: 4, title: "海賊王" },
    { id: 5, title: "名偵探柯南" },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 導覽列 */}
      <nav className="bg-blue-600 p-4 text-white">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">我的動漫收藏</h1>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-yellow-300">首頁</a></li>
            <li><a href="#" className="hover:text-yellow-300">動漫清單</a></li>
            <li><a href="#" className="hover:text-yellow-300">關於我</a></li>
          </ul>
        </div>
      </nav>

      {/* 動漫清單 */}
      <main className="container mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-6">推薦動漫</h2>
        <ul className="space-y-4">
          {animes.map(anime => (
            <li key={anime.id} className="p-4 bg-white rounded shadow hover:shadow-md transition">
              {anime.title}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


