export default function About() {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-12 px-6">
        {/* 標題 */}
        <h1 className="text-4xl font-bold text-center text-purple-800 mb-10">
          關於我 🙋
        </h1>
  
        <div className="max-w-4xl mx-auto space-y-12">
          {/* 作者介紹 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">👤 作者介紹</h2>
            <p className="text-gray-700 leading-relaxed">
              大家好！我是這個網站的作者，一位熱愛動漫與程式設計的學生。
              建立這個「我的動漫收藏」網站的初衷，是想結合興趣與學習，紀錄並分享我喜歡的作品
            </p>
          </section>
  
          {/* 技術棧 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">💻 技術棧</h2>
            <div className="flex space-x-6 text-lg">
              <span className="px-4 py-2 bg-purple-200 rounded-lg">⚡ Vite</span>
              <span className="px-4 py-2 bg-blue-200 rounded-lg">⚛️ React</span>
              <span className="px-4 py-2 bg-pink-200 rounded-lg">🎨 TailwindCSS</span>
              <span className="px-4 py-2 bg-gray-200 rounded-lg">📂 GitHub</span>
            </div>
          </section>
  
          {/* 推薦動漫 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">📚 最愛動漫推薦</h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <li className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-bold text-lg">進擊的巨人</h3>
                <p className="text-gray-600 text-sm mt-1">劇情緊湊，世界觀龐大。</p>
              </li>
              <li className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-bold text-lg">鬼滅之刃</h3>
                <p className="text-gray-600 text-sm mt-1">畫面精美，角色魅力十足。</p>
              </li>
              <li className="p-4 bg-purple-50 rounded-lg shadow hover:shadow-md transition">
                <h3 className="font-bold text-lg">咒術迴戰</h3>
                <p className="text-gray-600 text-sm mt-1">戰鬥場面精彩，劇情緊湊。</p>
              </li>
            </ul>
          </section>
  
          {/* 聯絡方式 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">📬 聯絡方式</h2>
            <ul className="text-gray-700 space-y-2">
              <li>📧 Email: <a href="mailto:example@email.com" className="text-purple-600 hover:underline">example@email.com</a></li>
              <li>💼 GitHub: <a href="https://github.com/your-username" target="_blank" className="text-purple-600 hover:underline">github.com/your-username</a></li>
            </ul>
          </section>
  
          {/* 未來規劃 */}
          <section className="bg-white shadow-md rounded-xl p-8">
            <h2 className="text-2xl font-semibold text-purple-700 mb-4">🚀 未來規劃</h2>
            <p className="text-gray-700 leading-relaxed">
              未來會加入更多功能，例如：  
              🔍 搜尋動漫、⭐ 收藏清單、📝 使用者留言系統。
            </p>
          </section>
        </div>
      </div>
    );
  }
  