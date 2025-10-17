import { useParams, Link } from "react-router-dom";

export default function AnimeDetail() {
  const { id } = useParams();
  const animeData = {
    1: {
      title: "進擊的巨人",
      description: "人類與巨人之間壯闊的戰鬥與真相探索。",
      img: "https://i.imgur.com/kEo4Eyt.jpg",
    },
    2: {
      title: "鬼滅之刃",
      description: "炭治郎為了拯救被詛咒的妹妹展開斬鬼之旅。",
      img: "https://i.imgur.com/jfHk3cQ.jpg",
    },
    3: {
      title: "咒術迴戰",
      description: "少年虎杖悠仁踏入咒術的世界，面對強敵與命運。",
      img: "https://i.imgur.com/5p4O4E7.jpg",
    },
  };

  const anime = animeData[id];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6 text-gray-800">
      {anime ? (
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          <img
            src={anime.img}
            alt={anime.title}
            className="rounded-xl mb-6 w-full h-80 object-cover"
          />
          <h1 className="text-4xl font-bold mb-4 text-purple-800">{anime.title}</h1>
          <p className="text-lg leading-relaxed mb-8">{anime.description}</p>
          <Link
            to="/anime-list"
            className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-600 transition"
          >
            ⬅ 返回動漫清單
          </Link>
        </div>
      ) : (
        <p className="text-center text-red-500">找不到該動漫資料。</p>
      )}
    </div>
  );
}
  