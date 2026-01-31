import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mobileAPI } from '@/lib/api';

export default function MobileApp() {
  const { toast } = useToast();
  const [apkUrl, setApkUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    mobileAPI.getDownloadUrl()
      .then(data => {
        if (data.success && data.downloadUrl) {
          setApkUrl(data.downloadUrl);
        }
      })
      .catch(error => {
        console.error('Ошибка загрузки APK URL:', error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleDownloadAPK = () => {
    if (!apkUrl) {
      toast({
        title: "Ошибка",
        description: "APK файл еще не загружен. Обратитесь к администратору.",
        variant: "destructive"
      });
      return;
    }
    
    // Открываем в новой вкладке для скачивания
    window.open(apkUrl, '_blank');
    
    toast({
      title: "Скачивание началось",
      description: "Приложение скачивается на ваше устройство",
    });
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

          {/* Кнопка скачивания */}
          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-8 mb-8 text-white text-center">
            <Icon name="Download" size={48} className="mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              Скачать приложение
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Готовое мобильное приложение для Android. 
              Нажмите кнопку и установите APK на ваш телефон!
            </p>
            <Button 
              size="lg" 
              onClick={handleDownloadAPK}
              className="bg-white text-primary hover:bg-gray-100 gap-2"
              disabled={isLoading || !apkUrl}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" size={20} className="animate-spin" />
                  Загрузка...
                </>
              ) : apkUrl ? (
                <>
                  <Icon name="Download" size={20} />
                  Скачать приложение
                </>
              ) : (
                <>
                  <Icon name="AlertCircle" size={20} />
                  Приложение недоступно
                </>
              )}
            </Button>
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

          {/* Инструкция по сборке для разработчиков */}
          <div className="mt-8 p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Icon name="Code2" size={24} className="text-gray-700 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">📖 Для разработчиков</h3>
                <p className="text-gray-700 mb-3">
                  Исходный код React Native приложения находится в папке <code className="bg-white px-2 py-1 rounded text-sm">mobile-app/</code>
                </p>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                      <Icon name="Github" size={16} className="mr-2" />
                      GitHub
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    navigator.clipboard.writeText('cd mobile-app && npm install && cd android && ./gradlew assembleRelease');
                    toast({ title: 'Команда скопирована' });
                  }}>
                    <Icon name="Terminal" size={16} className="mr-2" />
                    Собрать APK
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Версия iOS */}
          <div className="mt-4 p-6 bg-blue-50 border border-blue-200 rounded-xl">
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