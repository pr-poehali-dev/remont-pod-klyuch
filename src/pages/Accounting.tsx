import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Accounting = () => {
  const services = [
    {
      title: 'Бухгалтерское обслуживание',
      icon: 'Calculator',
      items: [
        'Абонентское бухгалтерское обслуживание',
        'Ведение бухгалтерского учета для малого и среднего бизнеса',
        'Расчёт и начисление заработной платы',
        'Восстановление бухгалтерского и налогового учета',
        'Проверка правильности ведения бухучета',
        'Консультации по бухгалтерскому учету',
      ]
    },
    {
      title: 'Сдача отчетности',
      icon: 'FileText',
      items: [
        'Отчётность в ИФНС, ПФР, ФСС',
        'Нулевая отчетность',
        'Сдача отчетности через интернет',
        'Подготовка и сдача алкогольных деклараций',
        'Формы 2-НДФЛ',
        'Бухгалтерский аудит',
        'Подготовка финансовой отчётности',
      ]
    },
    {
      title: 'Налоговый консалтинг',
      icon: 'Scale',
      items: [
        'Сопровождение налоговых проверок',
        'Подготовка и сопровождение на допрос в ИФНС',
        'Налоговое планирование',
        'Консультации налогового юриста',
        'Судебное представительство по налоговым делам',
        'Возврат НДС',
        'Разработка схем оптимизации налогообложения',
      ]
    },
    {
      title: 'Управленческий учет',
      icon: 'TrendingUp',
      items: [
        'Внедрение управленческого учёта',
        'Финансовая модель бизнеса',
        'Внедрение системы управления финансами',
      ]
    },
    {
      title: 'Кадровые услуги',
      icon: 'Users',
      items: [
        'Ведение кадрового учета',
        'Оформление приема и увольнения сотрудников',
        'Подготовка кадровых документов',
        'Консультации по трудовому законодательству',
      ]
    },
    {
      title: 'Регистрация и ликвидация',
      icon: 'Building',
      items: [
        'Регистрация ООО и ИП',
        'Ликвидация и реорганизация бизнеса',
        'Внесение изменений в учредительные документы',
        'Получение лицензий',
      ]
    }
  ];

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
      name: 'Нулевая отчётность',
      price: 'от 1 500',
      period: 'в месяц',
      description: 'Для компаний без хозяйственной деятельности',
      features: [
        'Сдача нулевой отчётности в ИФНС',
        'Сдача отчётности в ПФР и ФСС',
        'Консультации по телефону',
        'Представление интересов в налоговых органах'
      ],
      badge: null,
      variant: 'outline' as const
    },
    {
      name: 'Базовый',
      price: 'от 5 000',
      period: 'в месяц',
      description: 'Для ИП и малых предприятий',
      features: [
        'Ведение бухгалтерского учета',
        'Расчёт заработной платы (до 5 человек)',
        'Подготовка и сдача всей отчётности',
        'Консультации бухгалтера',
        'Сопровождение проверок'
      ],
      badge: 'Популярный',
      variant: 'default' as const
    },
    {
      name: 'Стандарт',
      price: 'от 15 000',
      period: 'в месяц',
      description: 'Для среднего бизнеса',
      features: [
        'Полное бухгалтерское обслуживание',
        'Расчёт зарплаты (до 20 человек)',
        'Управленческий учёт',
        'Налоговое планирование',
        'Кадровый учёт',
        'Персональный менеджер'
      ],
      badge: null,
      variant: 'outline' as const
    },
    {
      name: 'Индивидуальный',
      price: 'По запросу',
      period: '',
      description: 'Для крупного бизнеса и холдингов',
      features: [
        'Комплексное обслуживание',
        'Аудит и консалтинг',
        'Юридическое сопровождение',
        'Автоматизация учёта',
        'Выделенная команда специалистов'
      ],
      badge: null,
      variant: 'outline' as const
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary text-white text-lg px-6 py-2">
              <Icon name="FileCheck" size={18} className="mr-2" />
              БК - Бухгалтерский Контроль
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Бухгалтерское обслуживание бизнеса
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Профессиональные бухгалтерские услуги для малого и среднего бизнеса. 
              Полный спектр услуг от ведения учёта до налогового консалтинга.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contacts">
                  <Icon name="Phone" className="mr-2" />
                  Получить консультацию
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

          {/* Services Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accounting;