import { useState } from "react";
// 引入 Firebase Auth 相關函式和我們設定好的 auth
import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword, // 註冊
  signInWithEmailAndPassword,     // 登入
} from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 處理「註冊」的函式
  const handleRegister = async () => {
    if (!email || !password) {
      setError("Email 和密碼皆為必填");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // 呼叫 Firebase 的「建立帳號」函式
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("註冊成功:", userCredential.user);
      navigate("/"); // 註冊成功後，導向首頁
    } catch (err) {
      console.error(err);
      setError("註冊失敗：" + err.message); // 顯示 Firebase 傳回的錯誤
    }
    setLoading(false);
  };

  // 處理「登入」的函式
  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email 和密碼皆為必填");
      return;
    }
    setLoading(true);
    setError("");
    try {
      // 呼叫 Firebase 的「登入」函式
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("登入成功:", userCredential.user);
      navigate("/"); // 登入成功後，導向首頁
    } catch (err) {
      console.error(err);
      if (err.code === "auth/invalid-credential") {
        setError("登入失敗：Email 或密碼錯誤。");
      } else {
        setError("登入失敗：" + err.message);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-200 py-12 px-6 flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          管理員登入 / 註冊
        </h1>
        <div className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="admin@example.com"
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">
              密碼
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="******"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex space-x-4">
            <button
              onClick={handleLogin}
              disabled={loading}
              className="flex-1 bg-purple-700 text-white py-3 rounded-lg text-lg font-semibold hover:bg-purple-600 transition disabled:bg-gray-400"
            >
              {loading ? "處理中..." : "登入"}
            </button>
            <button
              onClick={handleRegister}
              disabled={loading}
              className="flex-1 bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-500 transition disabled:bg-gray-400"
            >
              {loading ? "處理中..." : "註冊"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}