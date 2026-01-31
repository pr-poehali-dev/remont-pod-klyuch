import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

export default function MobileBuildGuide() {
  const navigate = useNavigate();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/mobile-app')}
            className="mb-6"
          >
            <Icon name="ArrowLeft" size={20} />
            Назад
          </Button>

          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-3xl mb-6">
              <Icon name="Hammer" size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Сборка APK-файла
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Следуйте инструкции, чтобы собрать мобильное приложение для Android
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-8 mb-8">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Установите EAS CLI</h3>
                  <p className="text-gray-600 mb-3">
                    Инструмент для сборки приложений Expo
                  </p>
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm pr-12">
                      npm install -g eas-cli
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('npm install -g eas-cli')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Войдите в Expo</h3>
                  <p className="text-gray-600 mb-3">
                    Создайте бесплатный аккаунт на{' '}
                    <a href="https://expo.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                      expo.dev
                    </a>
                    , если его нет
                  </p>
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm pr-12">
                      eas login
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('eas login')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Перейдите в папку mobile</h3>
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm pr-12">
                      cd mobile
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('cd mobile')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Настройте проект</h3>
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm pr-12">
                      eas build:configure
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('eas build:configure')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                  5
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2">Соберите APK</h3>
                  <p className="text-gray-600 mb-3">
                    Сборка займёт 5-10 минут. После завершения вы получите ссылку для скачивания APK
                  </p>
                  <div className="relative">
                    <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm pr-12">
                      eas build --platform android --profile preview
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2 text-gray-400 hover:text-white"
                      onClick={() => copyToClipboard('eas build --platform android --profile preview')}
                    >
                      <Icon name="Copy" size={16} />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex gap-3">
                  <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-green-800">
                      <strong>Готово!</strong> После завершения сборки вы получите ссылку на скачивание APK-файла. 
                      Откройте её на телефоне и установите приложение.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <div className="flex gap-3">
              <Icon name="Info" size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Важная информация</h3>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="flex-shrink-0 mt-1" />
                    <span>Сборка происходит на серверах Expo (бесплатно)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="flex-shrink-0 mt-1" />
                    <span>Вам не нужен Android Studio или мощный компьютер</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="flex-shrink-0 mt-1" />
                    <span>Всё собирается в облаке автоматически</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="flex-shrink-0 mt-1" />
                    <span>Процесс займёт около 5-10 минут</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Icon name="Smartphone" size={28} className="text-primary" />
              Установка на телефон
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Скачайте APK</h3>
                  <p className="text-gray-600">
                    Откройте ссылку из Expo на телефоне и сохраните APK-файл
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Разрешите установку</h3>
                  <p className="text-gray-600">
                    Настройки → Безопасность → Неизвестные источники
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Активируйте приложение</h3>
                  <p className="text-gray-600 mb-3">
                    Получите код активации в{' '}
                    <a href="/dashboard" className="text-primary hover:underline">
                      личном кабинете
                    </a>
                    {' '}и введите его в приложении
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
