import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const MobileLogin = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [phone, setPhone] = useState('');
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendCode = async () => {
    if (phone.length < 11) {
      toast.error('Введите корректный номер телефона');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/send-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      if (response.ok) {
        toast.success('Код отправлен на ваш телефон');
        setStep('code');
      } else {
        toast.error('Ошибка отправки кода');
      }
    } catch (error) {
      toast.error('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 4) {
      toast.error('Введите 4-значный код');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('https://functions.poehali.dev/verify-sms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code })
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user_token', data.token);
        localStorage.setItem('user_phone', phone);
        localStorage.setItem('agent_id', data.agent_id);
        toast.success('Вход выполнен успешно!');
        navigate('/mobile-app');
      } else {
        toast.error('Неверный код');
      }
    } catch (error) {
      toast.error('Ошибка соединения');
    } finally {
      setIsLoading(false);
    }
  };

  const formatPhone = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length === 0) return '';
    if (cleaned.length <= 1) return `+7`;
    if (cleaned.length <= 4) return `+7 (${cleaned.slice(1)}`;
    if (cleaned.length <= 7) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4)}`;
    if (cleaned.length <= 9) return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
    return `+7 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7, 9)}-${cleaned.slice(9, 11)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
            <Icon name="Smartphone" size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Вход в приложение</h1>
          <p className="text-muted-foreground">
            {step === 'phone' 
              ? 'Введите номер телефона для получения кода' 
              : 'Введите код из SMS'}
          </p>
        </div>

        {step === 'phone' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Номер телефона</label>
              <Input
                type="tel"
                placeholder="+7 (___) ___-__-__"
                value={formatPhone(phone)}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={18}
                className="text-lg"
              />
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleSendCode}
              disabled={isLoading || phone.length < 11}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                  Отправка...
                </>
              ) : (
                <>
                  <Icon name="Send" size={20} className="mr-2" />
                  Получить код
                </>
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground mt-4">
              <Icon name="Shield" size={16} className="inline mr-1" />
              Ваши данные защищены и не передаются третьим лицам
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Код из SMS</label>
              <Input
                type="text"
                placeholder="____"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                className="text-2xl text-center tracking-widest"
              />
            </div>

            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleVerifyCode}
              disabled={isLoading || code.length !== 4}
            >
              {isLoading ? (
                <>
                  <Icon name="Loader" size={20} className="mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="Check" size={20} className="mr-2" />
                  Войти
                </>
              )}
            </Button>

            <Button 
              variant="ghost" 
              className="w-full"
              onClick={() => setStep('phone')}
            >
              <Icon name="ArrowLeft" size={18} className="mr-2" />
              Изменить номер
            </Button>

            <div className="text-center">
              <button 
                className="text-sm text-primary hover:underline"
                onClick={handleSendCode}
              >
                Отправить код повторно
              </button>
            </div>
          </div>
        )}

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <div className="flex gap-3">
            <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-1">К вашему номеру будет привязан личный ИИ-помощник</p>
              <p className="text-blue-700">
                Он запомнит все ваши операции, документы и предпочтения для персонализированной работы
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default MobileLogin;
