import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const AppDownload = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadAPK = () => {
    setIsDownloading(true);
    toast.success('Загрузка APK началась');
    
    setTimeout(() => {
      toast.info('Демо-режим: файл APK недоступен. В продакшене здесь будет ссылка на реальный файл.');
      setIsDownloading(false);
    }, 2000);
  };

  const features = [
    {
      icon: 'Scan',
      title: 'Сканер документов',
      description: 'Быстрая обработка накладных и счетов-фактур прямо с камеры телефона'
    },
    {
      icon: 'FileText',
      title: 'Учет операций',
      description: 'Автоматическое отслеживание доходов и расходов в режиме реального времени'
    },
    {
      icon: 'Bell',
      title: 'Уведомления',
      description: 'Своевременные напоминания о сроках отчетности и налоговых платежах'
    },
    {
      icon: 'Bot',
      title: 'ИИ-помощник',
      description: 'Персональный бухгалтерский консультант на базе YandexGPT'
    },
    {
      icon: 'TrendingUp',
      title: 'Аналитика',
      description: 'Прогнозы и аналитика для принятия бизнес-решений'
    },
    {
      icon: 'Cloud',
      title: 'Облачное хранилище',
      description: 'Безопасное хранение всех документов с доступом из любой точки'
    }
  ];

  const systemRequirements = [
    { label: 'Операционная система', value: 'Android 6.0 и выше' },
    { label: 'Свободное место', value: 'Минимум 50 МБ' },
    { label: 'Интернет', value: 'Требуется для работы' },
    { label: 'Версия', value: '1.0.0 (beta)' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center space-y-6 mb-16">
              <Badge className="bg-accent text-white px-4 py-1">
                Бета-версия
              </Badge>
              <h1 className="text-4xl md:text-5xl font-bold">
                Мобильное приложение БухКонтроль
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Управляйте бухгалтерией вашего бизнеса прямо со смартфона
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 border-primary">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                    <Icon name="Smartphone" size={48} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Android</h2>
                    <p className="text-muted-foreground mb-6">
                      Скачайте APK-файл для установки на Android устройство
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleDownloadAPK}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <>
                        <Icon name="Loader2" size={20} className="mr-2 animate-spin" />
                        Загрузка...
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={20} className="mr-2" />
                        Скачать APK
                      </>
                    )}
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Версия 1.0.0 (beta) • 45 МБ
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-8 text-center space-y-6">
                  <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                    <Icon name="Apple" size={48} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-2">iOS</h2>
                    <p className="text-muted-foreground mb-6">
                      Версия для iPhone и iPad в разработке
                    </p>
                  </div>
                  <Button 
                    size="lg" 
                    className="w-full"
                    variant="outline"
                    disabled
                  >
                    <Icon name="Clock" size={20} className="mr-2" />
                    Скоро
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Ожидайте в 2026 году
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-12 bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Icon name="Info" size={24} className="text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">Инструкция по установке APK</h3>
                    <ol className="space-y-2 text-sm text-muted-foreground">
                      <li>1. Скачайте APK-файл на Android устройство</li>
                      <li>2. В настройках разрешите установку из неизвестных источников</li>
                      <li>3. Откройте загруженный файл и следуйте инструкциям установщика</li>
                      <li>4. После установки войдите используя телефон и СМС-код от администратора</li>
                    </ol>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Возможности приложения</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 space-y-3">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon name={feature.icon} size={28} className="text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">Системные требования</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {systemRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-accent rounded-lg">
                      <span className="font-medium">{req.label}:</span>
                      <span className="text-muted-foreground">{req.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8 text-center space-y-4">
                <Icon name="HelpCircle" size={48} className="mx-auto text-primary" />
                <h3 className="text-2xl font-bold">Нужна помощь?</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Свяжитесь с нашей поддержкой для получения помощи по установке или использованию приложения
                </p>
                <Button size="lg" asChild>
                  <a href="tel:+79370768680">
                    <Icon name="Phone" size={20} className="mr-2" />
                    +7 (937) 076-86-80
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AppDownload;
