import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-in slide-in-from-bottom duration-500">
      <Card className="max-w-4xl mx-auto shadow-2xl border-2 border-accent/20">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <Icon name="Cookie" size={24} className="text-accent" />
              </div>
            </div>
            
            <div className="flex-1 space-y-3">
              <h3 className="text-lg font-bold">Мы используем cookies</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Этот сайт использует файлы cookies и сервисы аналитики (Яндекс.Метрика) для улучшения работы 
                и анализа посещаемости. Продолжая использовать сайт, вы соглашаетесь с обработкой ваших 
                персональных данных в соответствии с{' '}
                <Link to="/privacy" className="text-primary hover:underline font-medium">
                  Политикой конфиденциальности
                </Link>
                {' '}и Федеральным законом № 152-ФЗ.
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="ShieldCheck" size={14} className="text-accent" />
                <span>Ваши данные защищены и не передаются третьим лицам</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button
                onClick={handleAccept}
                className="bg-accent hover:bg-accent/90 whitespace-nowrap"
                size="lg"
              >
                <Icon name="Check" className="mr-2" size={18} />
                Принять
              </Button>
              <Button
                onClick={handleDecline}
                variant="outline"
                className="whitespace-nowrap"
                size="lg"
              >
                Отклонить
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CookieConsent;
