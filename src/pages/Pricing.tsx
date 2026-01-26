import { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Pricing = () => {
  const navigate = useNavigate();
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{name: string, price: string} | null>(null);

  const handlePayment = (planName: string, price: string) => {
    setSelectedPlan({name: planName, price});
    setShowPaymentModal(true);
  };

  const handlePaymentComplete = () => {
    toast.success('Оплата получена! Переходим к форме...');
    setShowPaymentModal(false);
    setTimeout(() => {
      navigate('/forecast-form');
    }, 1000);
  };

  const sbpPaymentUrl = useMemo(() => {
    if (!selectedPlan) return '';
    const amount = selectedPlan.price.replace(/\s/g, '');
    const phone = '79277486868';
    return `https://qr.nspk.ru/AS10003TMQCB68M0AJDV90NP9EMCR04C?type=01&bank=100000000111&sum=${amount}00&cur=RUB&payeeId=${phone}&lastName=Сбербанк&crc=9F55`;
  }, [selectedPlan]);
  const plans = [
    {
      name: 'АГРО',
      price: 'от 4 990',
      period: 'в месяц',
      description: 'Для сельхозпроизводителей и фермеров',
      badge: 'Популярный',
      features: [
        { text: 'ФГИС Зерно', included: true },
        { text: 'ФГИС Меркурий', included: true },
        { text: 'Отчёт в Росстат по форме 29-СХ', included: true },
        { text: 'Отчётность по субсидиям', included: true },
        { text: 'Единый налоговый счёт (ЕНС)', included: true },
        { text: 'Расчёт заработной платы', included: true },
        { text: 'Финансовый прогноз на год', included: true },
        { text: 'Оптимизация налогов', included: true },
        { text: 'Консультации агронома', included: false }
      ],
      cta: 'Оплатить',
      ctaLink: '/forecast-form',
      variant: 'default' as const,
      isPaid: true
    },
    {
      name: 'СТАРТ',
      price: 'от 2 990',
      period: 'в месяц',
      description: 'Для ИП и малого бизнеса',
      features: [
        { text: 'Единый налоговый счёт (ЕНС)', included: true },
        { text: 'Декларация по УСН', included: true },
        { text: 'Книга доходов и расходов', included: true },
        { text: 'Финансовый прогноз на год', included: true },
        { text: 'Расчёт зарплаты (до 5 чел)', included: false },
        { text: 'Помощь при проверках', included: false },
        { text: 'ФГИС Зерно', included: false },
        { text: 'ФГИС Меркурий', included: false }
      ],
      cta: 'Оплатить',
      ctaLink: '/forecast-form',
      variant: 'outline' as const,
      isPaid: true
    },
    {
      name: 'БИЗНЕС',
      price: 'от 5 990',
      period: 'в месяц',
      description: 'Для растущих компаний',
      features: [
        { text: 'Всё из тарифа СТАРТ', included: true },
        { text: 'Расчёт зарплаты (до 15 чел)', included: true },
        { text: 'Отчётность в ПФР, ФСС', included: true },
        { text: 'Помощь при проверках', included: true },
        { text: 'Оптимизация налогов', included: true },
        { text: 'Управленческий учёт', included: false },
        { text: 'ФГИС Зерно', included: false },
        { text: 'ФГИС Меркурий', included: false }
      ],
      cta: 'Оплатить',
      ctaLink: '/forecast-form',
      variant: 'outline' as const,
      isPaid: true
    },
    {
      name: 'ПРОФИ',
      price: 'от 9 990',
      period: 'в месяц',
      description: 'Для крупного бизнеса',
      features: [
        { text: 'Всё из тарифа БИЗНЕС', included: true },
        { text: 'Расчёт зарплаты (безлимит)', included: true },
        { text: 'Управленческий учёт', included: true },
        { text: 'Бюджетирование', included: true },
        { text: 'Финансовая аналитика', included: true },
        { text: 'Личный бухгалтер', included: true },
        { text: 'ФГИС Зерно', included: false },
        { text: 'ФГИС Меркурий', included: false }
      ],
      cta: 'Оплатить',
      ctaLink: '/forecast-form',
      variant: 'outline' as const,
      isPaid: true
    },
    {
      name: 'ТЕСТ-ДРАЙВ',
      price: '0',
      period: '14 дней бесплатно',
      description: 'Попробуйте перед покупкой',
      features: [
        { text: 'Прогноз на 3 месяца', included: true },
        { text: 'Базовая отчётность', included: true },
        { text: 'Техподдержка', included: true },
        { text: 'Расчёт зарплаты', included: false },
        { text: 'Оптимизация налогов', included: false },
        { text: 'ФГИС Зерно', included: false },
        { text: 'ФГИС Меркурий', included: false },
        { text: 'Помощь при проверках', included: false }
      ],
      cta: 'Начать бесплатно',
      ctaLink: '/forecast-form',
      variant: 'outline' as const,
      isPaid: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Тарифные планы</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Выберите оптимальный план для прогнозирования развития вашего бизнеса
            </p>
          </div>

          <div className="mb-16 max-w-5xl mx-auto">
            <Card className="border-2 border-accent bg-gradient-to-br from-accent/5 to-primary/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-accent/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Icon name="Rocket" size={36} className="text-accent" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-3">
                    <div className="flex items-center gap-3 justify-center md:justify-start">
                      <h2 className="text-3xl font-bold">Только планируете открыть бизнес?</h2>
                      <Badge className="bg-accent text-white">Специально для новичков</Badge>
                    </div>
                    <p className="text-lg text-muted-foreground">
                      Моделируем ваш будущий бизнес с нуля: финансовая модель, анализ рынка, прогноз окупаемости и рисков
                    </p>
                    <div className="flex items-center gap-2 text-2xl font-bold text-accent justify-center md:justify-start">
                      <Icon name="Sparkles" size={24} />
                      <span>От 15 990 ₽</span>
                      <span className="text-base font-normal text-muted-foreground">единоразово</span>
                    </div>
                  </div>
                  <Button size="lg" className="bg-accent hover:bg-accent/90" asChild>
                    <Link to="/contacts">
                      <Icon name="MessagesSquare" className="mr-2" />
                      Обсудить проект
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-muted-foreground">Тарифы для действующего бизнеса</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-[1600px] mx-auto">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`relative ${plan.badge === 'Популярный' ? 'border-2 border-primary shadow-xl scale-105' : ''}`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white px-4 py-1">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center space-y-4 pb-8">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div>
                    <div className="text-5xl font-bold">
                      {plan.price}
                      {plan.price !== '0' && <span className="text-2xl"> ₽</span>}
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.period}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Icon 
                          name={feature.included ? 'Check' : 'X'} 
                          size={20} 
                          className={feature.included ? 'text-accent mt-0.5' : 'text-muted-foreground mt-0.5'} 
                        />
                        <span className={feature.included ? 'text-foreground' : 'text-muted-foreground'}>
                          {feature.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {plan.isPaid ? (
                    <Button 
                      variant={plan.variant} 
                      size="lg" 
                      className="w-full text-lg"
                      onClick={() => handlePayment(plan.name, plan.price)}
                    >
                      {plan.cta}
                      <Icon name="CreditCard" className="ml-2" size={18} />
                    </Button>
                  ) : (
                    <Button 
                      variant={plan.variant} 
                      size="lg" 
                      className="w-full text-lg"
                      asChild
                    >
                      <Link to={plan.ctaLink}>
                        {plan.cta}
                        <Icon name="ArrowRight" className="ml-2" size={18} />
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-20 max-w-4xl mx-auto">
            <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="HelpCircle" size={32} className="text-primary" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-2">Не можете выбрать план?</h3>
                    <p className="text-muted-foreground">
                      Свяжитесь с нами, и мы поможем подобрать оптимальное решение для вашего бизнеса
                    </p>
                  </div>
                  <Button size="lg" asChild>
                    <Link to="/contacts">
                      <Icon name="MessageCircle" className="mr-2" />
                      Получить консультацию
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Оплата тарифа {selectedPlan?.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <p className="text-3xl font-bold">{selectedPlan?.price} ₽</p>
              <p className="text-muted-foreground">Оплата через Систему Быстрых Платежей (СБП)</p>
            </div>

            <div className="bg-secondary/20 p-6 rounded-lg space-y-4">
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-white p-4 rounded-lg flex items-center justify-center">
                  {sbpPaymentUrl && (
                    <QRCodeSVG 
                      value={sbpPaymentUrl}
                      size={224}
                      level="M"
                      includeMargin={false}
                    />
                  )}
                </div>
              </div>
              <div className="text-center space-y-2">
                <p className="font-semibold">Отсканируйте QR-код</p>
                <p className="text-sm text-muted-foreground">
                  Откройте приложение вашего банка и отсканируйте код для оплаты через СБП
                </p>
              </div>
            </div>

            <div className="bg-accent/10 p-4 rounded-lg space-y-2">
              <div className="flex items-start gap-2">
                <Icon name="Smartphone" size={20} className="text-accent mt-0.5" />
                <div className="flex-1 text-sm">
                  <p className="font-semibold">Получатель:</p>
                  <p className="text-muted-foreground">Сбербанк: +7 927 748-68-68</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Button 
                size="lg" 
                className="w-full"
                onClick={handlePaymentComplete}
              >
                <Icon name="CheckCircle" className="mr-2" />
                Я оплатил
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={() => setShowPaymentModal(false)}
              >
                Отмена
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              После оплаты вы перейдёте на страницу заполнения данных для прогноза
            </p>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Pricing;