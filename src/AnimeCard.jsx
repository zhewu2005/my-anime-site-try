// 建立新檔案：src/AnimeCard.jsx
import { Link } from "react-router-dom";

export default function AnimeCard({ anime, onDelete }) {
  return (
    <div className="bg-white shadow-md rounded-xl hover:shadow-xl transition transform duration-200 relative">
      <Link to={`/anime-detail/${anime.id}`}>
        <img
          src={anime.img || anime.image}
          alt={anime.title}
          className="rounded-t-xl h-60 w-full object-cover hover:opacity-90 transition"
        />
      </Link>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{anime.title}</h3>
        {/* 也可以考慮只顯示部分簡介 */}
        {anime.description && (
          <p className="text-gray-600 text-sm mt-2 truncate">
            {anime.description}
          </p>
        )}
      </div>
      {/* 將刪除功能傳遞進來 */}
      <button
        onClick={() => onDelete(anime.id)}
        className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-lg"
      >
        ✖
      </button>
    </div>
  );
}