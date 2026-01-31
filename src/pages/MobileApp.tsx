import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function MobileApp() {
  const handleDownloadAPK = () => {
    // TODO: После сборки APK добавить ссылку на скачивание
    alert('APK-файл будет доступен после сборки приложения через Expo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6">
              <Icon name="Smartphone" size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Мобильное приложение
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Управляйте бухгалтерией прямо со смартфона: сканируйте документы, 
              ставьте задачи и отслеживайте сроки отчётов
            </p>
          </div>

          {/* Возможности */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Camera" size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Сканирование документов</h3>
              <p className="text-gray-600 text-sm">
                Фотографируйте чеки и счета камерой — они автоматически загружаются в облако
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="ListTodo" size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Задачи бухгалтеру</h3>
              <p className="text-gray-600 text-sm">
                Создавайте задачи для вашего бухгалтера: счета, отчёты, консультации
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Calendar" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Календарь отчётов ФНС</h3>
              <p className="text-gray-600 text-sm">
                Не пропускайте сроки подачи налоговых деклараций с напоминаниями
              </p>
            </div>
          </div>

          {/* Как установить */}
          <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Download" size={28} className="text-primary" />
              Как установить приложение
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Скачайте APK-файл</h3>
                  <p className="text-gray-600 mb-3">
                    Нажмите кнопку ниже и сохраните файл приложения на телефон
                  </p>
                  <Button onClick={handleDownloadAPK} className="gap-2">
                    <Icon name="Download" size={20} />
                    Скачать APK (Android)
                  </Button>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Разрешите установку</h3>
                  <p className="text-gray-600">
                    В настройках Android включите установку из неизвестных источников 
                    (Настройки → Безопасность → Неизвестные источники)
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Активируйте через личный кабинет</h3>
                  <p className="text-gray-600 mb-3">
                    После установки войдите в <a href="/dashboard" className="text-primary hover:underline">личный кабинет</a> на 
                    сайте, получите код активации и введите его в приложении
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Системные требования */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="Info" size={20} />
              Системные требования
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Android 8.0 и выше
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Камера для сканирования документов
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Подключение к интернету
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Примерно 50 МБ свободного места
              </li>
            </ul>
          </div>

          {/* Версия iOS */}
          <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Версия для iOS</h3>
                <p className="text-blue-800">
                  Приложение для iPhone находится в разработке. 
                  Пока вы можете использовать веб-версию личного кабинета 
                  со всеми основными функциями.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}