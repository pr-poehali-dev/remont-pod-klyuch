import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const AccountingAdvantages = () => {
  const advantages = [
    {
      icon: 'Award',
      title: 'Профессионализм',
      description: 'Команда опытных специалистов в бухгалтерском учёте'
    },
    {
      icon: 'Shield',
      title: 'Полная ответственность',
      description: 'Мы несем материальную ответственность за качество наших услуг'
    },
    {
      icon: 'Users',
      title: 'Квалифицированные специалисты',
      description: 'Команда опытных бухгалтеров, аудиторов и налоговых консультантов'
    },
    {
      icon: 'Clock',
      title: 'Экономия времени',
      description: 'Вы получаете больше времени для развития своего бизнеса'
    },
    {
      icon: 'PiggyBank',
      title: 'Снижение затрат',
      description: 'Дешевле, чем содержать штатного бухгалтера'
    },
    {
      icon: 'Lock',
      title: 'Конфиденциальность',
      description: 'Гарантируем полную конфиденциальность информации'
    }
  ];

  const pricingPlans = [
    {
      name: 'АГРО',
      price: '4 990',
      period: 'в месяц',
      description: 'Для сельхозпроизводителей и фермеров',
      features: [
        'ФГИС Зерно и Меркурий',
        'Отчёт в Росстат по форме 29-СХ',
        'Отчётность по субсидиям',
        'Единый налоговый счёт (ЕНС)',
        'Расчёт заработной платы',
        'Финансовый прогноз на год',
        'Оптимизация налогов'
      ],
      badge: 'Популярный',
      variant: 'default' as const
    },
    {
      name: 'СТАРТ',
      price: '2 990',
      period: 'в месяц',
      description: 'Для ИП и малого бизнеса',
      features: [
        'Единый налоговый счёт (ЕНС)',
        'Декларация по УСН',
        'Книга доходов и расходов',
        'Финансовый прогноз на год',
        'Консультации бухгалтера'
      ],
      badge: null,
      variant: 'outline' as const
    },
    {
      name: 'БИЗНЕС',
      price: '5 990',
      period: 'в месяц',
      description: 'Для растущих компаний',
      features: [
        'Всё из тарифа СТАРТ',
        'Расчёт зарплаты (до 15 чел)',
        'Отчётность в ПФР, ФСС',
        'Помощь при проверках',
        'Оптимизация налогов'
      ],
      badge: null,
      variant: 'outline' as const
    },
    {
      name: 'ПРОФИ',
      price: '9 990',
      period: 'в месяц',
      description: 'Для крупного бизнеса',
      features: [
        'Всё из тарифа БИЗНЕС',
        'Расчёт зарплаты (безлимит)',
        'Управленческий учёт',
        'Бюджетирование',
        'Финансовая аналитика',
        'Личный бухгалтер'
      ],
      badge: null,
      variant: 'outline' as const
    }
  ];

  return (
    <>
      {/* Advantages Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-12">Почему выбирают нас</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-8 pb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={advantage.icon as any} size={32} className="text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
                <p className="text-muted-foreground">{advantage.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Pricing Section */}
      <div className="mb-20">
        <h2 className="text-3xl font-bold text-center mb-4">Тарифы и цены</h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Выберите подходящий тариф или закажите индивидуальный расчёт стоимости под ваш бизнес
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index}
              className={`relative ${plan.badge ? 'border-2 border-primary shadow-lg' : ''}`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-white px-4 py-1">
                    {plan.badge}
                  </Badge>
                </div>
              )}
              <CardHeader className="text-center space-y-4 pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div>
                  <div className="text-4xl font-bold">
                    {plan.price}
                    {plan.price !== 'По запросу' && <span className="text-xl"> ₽</span>}
                  </div>
                  {plan.period && (
                    <p className="text-muted-foreground mt-1">{plan.period}</p>
                  )}
                </div>
                <CardDescription className="min-h-[40px]">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  variant={plan.variant}
                  size="lg" 
                  className="w-full"
                  asChild
                >
                  <Link to="/contacts">
                    Заказать
                    <Icon name="ArrowRight" className="ml-2" size={18} />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
        <CardContent className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Icon name="MessageCircle" size={40} className="text-primary" />
            </div>
            <div className="flex-1 text-center md:text-left space-y-2">
              <h2 className="text-3xl font-bold">Готовы начать работу?</h2>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с нами для бесплатной консультации и расчёта стоимости обслуживания
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" asChild>
                <Link to="/contacts">
                  <Icon name="Phone" className="mr-2" />
                  Связаться с нами
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/calculator">
                  <Icon name="LineChart" className="mr-2" />
                  Калькулятор
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default AccountingAdvantages;