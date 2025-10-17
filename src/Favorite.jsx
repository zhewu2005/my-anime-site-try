import { Link } from "react-router-dom";

export default function Favorite() {
  const favorites = [
    {
      id: 1,
      title: "進擊的巨人",
      img: "https://i.imgur.com/kEo4Eyt.jpg",
      comment: "劇情緊湊、世界觀超級龐大！",
    },
    {
      id: 2,
      title: "鬼滅之刃",
      img: "https://i.imgur.com/jfHk3cQ.jpg",
      comment: "音樂、畫面與角色都太經典了！",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6">
      <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
        ⭐ 我的收藏
      </h1>

      {favorites.length > 0 ? (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {favorites.map((anime) => (
            <div
              key={anime.id}
              className="bg-white shadow-md rounded-xl hover:shadow-xl hover:-translate-y-1 transition transform duration-200"
            >
              <img
                src={anime.img}
                alt={anime.title}
                className="rounded-t-xl h-60 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">{anime.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{anime.comment}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-700 text-lg">
          尚未收藏任何動漫，快去
          <Link to="/anime-list" className="text-purple-700 hover:underline">
            動漫清單
          </Link>
          加入吧！
        </p>
      )}
    </div>
  );
}
