import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function MobileApp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAPK = async () => {
    setIsDownloading(true);
    
    try {
      const response = await fetch('https://functions.poehali.dev/ec98b28e-c289-4356-a70e-323afa6e2fd7');
      const data = await response.json();

      if (data.success && data.downloadUrl) {
        // Прямое скачивание APK
        window.location.href = data.downloadUrl;
        
        toast({
          title: "Скачивание началось",
          description: `Файл ${data.fileName} (${(data.fileSize / 1024 / 1024).toFixed(1)} МБ) начал скачиваться`,
        });
      } else {
        // APK ещё не собран - перенаправляем на инструкцию
        toast({
          title: "APK ещё не готов",
          description: "Следуйте инструкции для сборки приложения",
          variant: "destructive"
        });
        navigate('/mobile-build-guide');
      }
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить APK. Попробуйте позже.",
        variant: "destructive"
      });
      console.error('Download error:', error);
    } finally {
      setIsDownloading(false);
    }
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
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Button 
                size="lg" 
                onClick={handleDownloadAPK}
                disabled={isDownloading}
                className="bg-white text-primary hover:bg-gray-100 gap-2"
              >
                {isDownloading ? (
                  <>
                    <Icon name="Loader2" size={20} className="animate-spin" />
                    Загрузка...
                  </>
                ) : (
                  <>
                    <Icon name="Download" size={20} />
                    Скачать APK
                  </>
                )}
              </Button>
              
              <Button 
                size="lg"
                variant="outline"
                onClick={() => navigate('/mobile-build-guide')}
                className="bg-white/10 text-white border-white/30 hover:bg-white/20"
              >
                <Icon name="BookOpen" size={20} />
                Инструкция по сборке
              </Button>
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