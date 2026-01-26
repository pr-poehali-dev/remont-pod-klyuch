import { TelegramLoginButton } from "@/components/extensions/telegram-bot/TelegramLoginButton";
import { useTelegramAuth } from "@/components/extensions/telegram-bot/useTelegramAuth";
import { Button } from "@/components/ui/button";

export default function TelegramTest() {
  const { user, isLoading, login, logout } = useTelegramAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Тест Telegram Авторизации
          </h1>
          <p className="text-gray-600">
            Проверка работы бота и авторизации
          </p>
        </div>

        {!user ? (
          <div className="space-y-4">
            <TelegramLoginButton
              onClick={login}
              isLoading={isLoading}
              className="w-full"
            />
            <div className="text-sm text-gray-500 text-center">
              После нажатия откроется Telegram бот
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-4">
                {user.avatar_url && (
                  <img
                    src={user.avatar_url}
                    alt={user.name}
                    className="w-16 h-16 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-lg text-gray-900">
                    {user.name}
                  </div>
                  <div className="text-sm text-gray-600">
                    Telegram ID: {user.telegram_id}
                  </div>
                </div>
              </div>
              <div className="text-sm text-green-700">
                ✅ Авторизация успешна!
              </div>
            </div>

            <Button
              onClick={logout}
              variant="outline"
              className="w-full"
            >
              Выйти
            </Button>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <div className="text-xs font-mono text-gray-600">
            <div className="font-semibold mb-2">Статус:</div>
            <div>Загрузка: {isLoading ? "Да" : "Нет"}</div>
            <div>Пользователь: {user ? "Авторизован" : "Не авторизован"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
