import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

export default function MobileApp() {
  const [isAndroid] = useState(() => /android/i.test(navigator.userAgent));
  const [isIOS] = useState(() => /iphone|ipad|ipod/i.test(navigator.userAgent));
  const [isInstalled] = useState(() => window.matchMedia('(display-mode: standalone)').matches);

  const handleInstallAndroid = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-4xl mx-auto">
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

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Zap" size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Быстрый доступ</h3>
              <p className="text-gray-600 text-sm">
                Приложение запускается мгновенно с главного экрана — как обычное приложение
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="WifiOff" size={24} className="text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Работа офлайн</h3>
              <p className="text-gray-600 text-sm">
                Открывайте сохранённые данные даже без подключения к интернету
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                <Icon name="Bell" size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Push-уведомления</h3>
              <p className="text-gray-600 text-sm">
                Получайте напоминания о важных сроках и новых задачах
              </p>
            </div>
          </div>

          {isInstalled ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center mb-8">
              <Icon name="CheckCircle2" size={48} className="mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">
                Приложение уже установлено!
              </h2>
              <p className="text-green-800">
                Вы используете БухКонтроль как приложение. Можете закрыть эту вкладку и открывать сайт через иконку на главном экране.
              </p>
            </div>
          ) : (
            <>
              {isAndroid && (
                <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl shadow-lg p-8 mb-8 text-white">
                  <Icon name="Smartphone" size={48} className="mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Установить на Android
                  </h2>
                  <p className="text-white/90 mb-6 text-center max-w-xl mx-auto">
                    Нажмите кнопку «Установить» в верхней части экрана или выберите в меню браузера «Установить приложение»
                  </p>
                  <div className="bg-white/20 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Info" size={20} />
                      Пошаговая инструкция:
                    </h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">1</span>
                        <span>Нажмите на кнопку "Установить приложение" в верхней части страницы</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">2</span>
                        <span>Или откройте меню Chrome (три точки справа) → "Установить приложение"</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-primary rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">3</span>
                        <span>Подтвердите установку — иконка БухКонтроль появится на главном экране</span>
                      </li>
                    </ol>
                  </div>
                  <Button 
                    size="lg" 
                    onClick={handleInstallAndroid}
                    className="bg-white text-primary hover:bg-gray-100 gap-2 mx-auto block"
                  >
                    <Icon name="ArrowUp" size={20} />
                    Показать кнопку установки
                  </Button>
                </div>
              )}

              {isIOS && (
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-8 mb-8 text-white">
                  <Icon name="Smartphone" size={48} className="mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4 text-center">
                    Установить на iPhone
                  </h2>
                  <p className="text-white/90 mb-6 text-center max-w-xl mx-auto">
                    Добавьте БухКонтроль на главный экран через Safari
                  </p>
                  <div className="bg-white/20 rounded-xl p-6">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Icon name="Info" size={20} />
                      Пошаговая инструкция:
                    </h3>
                    <ol className="space-y-3 text-sm">
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">1</span>
                        <span>Нажмите кнопку "Поделиться" внизу экрана (квадрат со стрелкой вверх)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">2</span>
                        <span>Прокрутите список и выберите "На экран «Домой»"</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="bg-white text-blue-600 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-semibold text-xs">3</span>
                        <span>Нажмите "Добавить" — иконка БухКонтроль появится на главном экране</span>
                      </li>
                    </ol>
                  </div>
                </div>
              )}

              {!isAndroid && !isIOS && (
                <div className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl shadow-lg p-8 mb-8 text-white text-center">
                  <Icon name="Monitor" size={48} className="mx-auto mb-4" />
                  <h2 className="text-3xl font-bold mb-4">
                    Откройте на телефоне
                  </h2>
                  <p className="text-white/90 mb-6 max-w-xl mx-auto">
                    Для установки мобильного приложения откройте эту страницу на смартфоне Android или iPhone
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 inline-block">
                    <p className="text-sm font-mono">{window.location.href}</p>
                  </div>
                </div>
              )}
            </>
          )}

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Icon name="Info" size={20} />
              Преимущества PWA-приложения
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Не требует скачивания из магазина приложений
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Автоматически обновляется до последней версии
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Работает на Android и iOS одинаково
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Занимает минимум места на телефоне
              </li>
              <li className="flex items-center gap-2">
                <Icon name="Check" size={16} className="text-green-600" />
                Безопасно — работает через защищённое HTTPS соединение
              </li>
            </ul>
          </div>

          <div className="p-6 bg-blue-50 border border-blue-200 rounded-xl">
            <div className="flex items-start gap-3">
              <Icon name="HelpCircle" size={24} className="text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Что такое PWA?</h3>
                <p className="text-blue-800 text-sm">
                  Progressive Web App — это современная технология, которая превращает веб-сайт в полноценное мобильное приложение. 
                  Вы получаете все преимущества обычного приложения без необходимости скачивания из App Store или Google Play.
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
