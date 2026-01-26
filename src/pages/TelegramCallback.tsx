import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function TelegramCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setErrorMessage("Токен не найден в URL");
      setTimeout(() => navigate("/telegram-test"), 3000);
      return;
    }

    const exchangeToken = async () => {
      try {
        const response = await fetch(
          "https://functions.poehali.dev/307cdc97-68e5-41cf-a3bc-7744698eb7c1?action=callback",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Ошибка авторизации");
        }

        localStorage.setItem("telegram_access_token", data.access_token);
        localStorage.setItem("telegram_refresh_token", data.refresh_token);

        setStatus("success");
        setTimeout(() => navigate("/telegram-test"), 2000);
      } catch (error) {
        setStatus("error");
        setErrorMessage(error instanceof Error ? error.message : "Неизвестная ошибка");
        setTimeout(() => navigate("/telegram-test"), 3000);
      }
    };

    exchangeToken();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        {status === "loading" && (
          <div>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Авторизация...
            </h2>
            <p className="text-gray-600">Обрабатываем ваш запрос</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-bold text-green-600 mb-2">
              Успешно!
            </h2>
            <p className="text-gray-600">Перенаправляем вас...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <div className="text-6xl mb-4">❌</div>
            <h2 className="text-2xl font-bold text-red-600 mb-2">
              Ошибка
            </h2>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <p className="text-sm text-gray-500">Перенаправляем обратно...</p>
          </div>
        )}
      </div>
    </div>
  );
}
