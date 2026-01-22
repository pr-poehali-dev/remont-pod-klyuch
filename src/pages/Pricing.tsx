import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Pricing = () => {
  const plans = [
    {
      name: 'Базовый',
      price: '0',
      period: 'бесплатно',
      description: 'Для первого знакомства с прогнозированием',
      badge: null,
      features: [
        { text: 'Прогноз на 1 месяц', included: true },
        { text: 'Базовая аналитика', included: true },
        { text: 'Экспорт в PDF', included: false },
        { text: 'Анализ рисков', included: false },
        { text: 'Рекомендации', included: false },
        { text: 'Сценарное моделирование', included: false },
        { text: 'Поддержка 24/7', included: false },
      ],
      cta: 'Попробовать',
      ctaLink: '/calculator',
      variant: 'outline' as const
    },
    {
      name: 'Профессиональный',
      price: '4 990',
      period: 'в месяц',
      description: 'Для растущего бизнеса и стартапов',
      badge: 'Популярный',
      features: [
        { text: 'Прогноз до 1 года', included: true },
        { text: 'Расширенная аналитика', included: true },
        { text: 'Экспорт в PDF и Excel', included: true },
        { text: 'Анализ рисков', included: true },
        { text: 'Базовые рекомендации', included: true },
        { text: 'До 3 сценариев', included: true },
        { text: 'Email поддержка', included: true },
      ],
      cta: 'Выбрать план',
      ctaLink: '/contacts',
      variant: 'default' as const
    },
    {
      name: 'Корпоративный',
      price: '19 990',
      period: 'в месяц',
      description: 'Для крупного бизнеса и холдингов',
      badge: 'Максимум',
      features: [
        { text: 'Прогноз до 5 лет', included: true },
        { text: 'Полная аналитика + AI', included: true },
        { text: 'Экспорт во все форматы', included: true },
        { text: 'Глубокий анализ рисков', included: true },
        { text: 'Персональные рекомендации', included: true },
        { text: 'Неограниченные сценарии', included: true },
        { text: 'Поддержка 24/7 + менеджер', included: true },
      ],
      cta: 'Связаться',
      ctaLink: '/contacts',
      variant: 'default' as const
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
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

      <Footer />
    </div>
  );
};

export default Pricing;
