import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const services = [
    {
      icon: 'Wheat',
      title: 'Учёт для агросектора',
      description: 'Специализированное бухгалтерское обслуживание сельхозпроизводителей и фермеров',
      features: [
        'ФГИС Зерно и Меркурий',
        'Отчётность по субсидиям',
        'Форма 29-СХ в Росстат',
        'Оптимизация налогов для ЕСХН'
      ],
      badge: 'Специализация'
    },
    {
      icon: 'Calculator',
      title: 'Бухгалтерское обслуживание',
      description: 'Полное ведение бухгалтерского и налогового учёта для вашего бизнеса',
      features: [
        'Расчёт заработной платы',
        'Сдача отчётности в ИФНС, ПФР, ФСС',
        'Консультации по учёту',
        'Восстановление учёта'
      ]
    },
    {
      icon: 'FileText',
      title: 'Налоговый консалтинг',
      description: 'Оптимизация налогообложения и сопровождение проверок',
      features: [
        'Налоговое планирование',
        'Сопровождение проверок',
        'Возврат НДС',
        'Судебное представительство'
      ]
    },
    {
      icon: 'Users',
      title: 'Кадровые услуги',
      description: 'Ведение кадрового учёта и документооборота',
      features: [
        'Оформление приёма/увольнения',
        'Кадровые документы',
        'Консультации по ТК РФ',
        'Воинский учёт'
      ]
    },
    {
      icon: 'TrendingUp',
      title: 'Управленческий учёт',
      description: 'Внедрение системы управления финансами бизнеса',
      features: [
        'Финансовая модель',
        'Бюджетирование',
        'KPI и метрики',
        'Управленческая отчётность'
      ]
    },
    {
      icon: 'Scale',
      title: 'Аудит и проверки',
      description: 'Независимая проверка учёта и отчётности',
      features: [
        'Аудит бухучёта',
        'Анализ налоговых рисков',
        'Проверка контрагентов',
        'Подготовка к проверкам'
      ]
    }
  ];

  const advantages = [
    {
      icon: 'Award',
      title: 'Профессионализм',
      value: 'Высокий',
      description: 'квалифицированные специалисты'
    },
    {
      icon: 'Users',
      title: 'Обслуживаем',
      value: '300+ клиентов',
      description: 'от ИП до крупных компаний'
    },
    {
      icon: 'Shield',
      title: 'Полная ответственность',
      value: '100%',
      description: 'гарантия качества услуг'
    },
    {
      icon: 'PiggyBank',
      title: 'Экономия',
      value: 'до 60%',
      description: 'по сравнению со штатным бухгалтером'
    }
  ];

  const pricingHighlights = [
    {
      name: 'АГРО',
      price: 'от 4 990 ₽',
      period: 'в месяц',
      icon: 'Wheat',
      description: 'Для сельхозпроизводителей',
      badge: 'Популярный'
    },
    {
      name: 'СТАРТ',
      price: 'от 2 990 ₽',
      period: 'в месяц',
      icon: 'Briefcase',
      description: 'Для ИП и малого бизнеса'
    },
    {
      name: 'БИЗНЕС',
      price: 'от 5 990 ₽',
      period: 'в месяц',
      icon: 'Building2',
      description: 'Для растущих компаний'
    }
  ];

  const testimonials = [
    {
      name: 'Сергей Иванович',
      position: 'КФХ "Золотое поле", Ставропольский край',
      text: 'Наконец-то нашёл бухгалтера, который разбирается в ФГИС Зерно! Все субсидии оформили правильно, отчёты сдали вовремя. Рекомендую фермерам!',
      rating: 5
    },
    {
      name: 'Наталья Петрова',
      position: 'ИП Глава КФХ, Краснодарский край',
      text: 'Работаю с БК уже 2 года. Помогли разобраться с Меркурием и отчётностью по субсидиям. Очень довольна! Знают специфику сельского хозяйства.',
      rating: 5
    },
    {
      name: 'Дмитрий Соколов',
      position: 'ООО "АгроПродукт"',
      text: 'Перешли на аутсорсинг — и не пожалели. Тариф АГРО включает всё что нужно: ФГИС, 29-СХ, субсидии. Экономим на штатном бухгалтере.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <Badge className="bg-primary text-white text-lg px-6 py-2">
                <Icon name="Wheat" size={18} className="mr-2" />
                Специализация: Агросектор
              </Badge>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Бухгалтерия для фермеров
                <span className="block text-primary mt-2">и сельхозпроизводителей</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                ФГИС Зерно, Меркурий, субсидии, форма 29-СХ. Знаем специфику агробизнеса. 
                Помогаем фермерам экономить время и деньги на учёте.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/accounting">
                    <Icon name="Calculator" className="mr-2" size={20} />
                    Подробнее об услугах
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/contacts">
                    <Icon name="Phone" className="mr-2" size={20} />
                    Получить консультацию
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages Stats */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {advantages.map((item, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={item.icon as any} size={32} className="text-accent" />
                    </div>
                    <div className="text-4xl font-bold text-primary mb-2">{item.value}</div>
                    <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Наши услуги</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Полный спектр бухгалтерских услуг для вашего бизнеса
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className={`hover:shadow-lg transition-all hover:border-primary ${service.badge ? 'border-2 border-primary' : ''}`}>
                  <CardContent className="p-8">
                    {service.badge && (
                      <Badge className="mb-4 bg-primary text-white">{service.badge}</Badge>
                    )}
                    <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} size={28} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                    <p className="text-muted-foreground mb-4">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-12">
              <Button size="lg" asChild>
                <Link to="/accounting">
                  Все услуги и подробности
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Calculator Banner for Farmers */}
        <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
          <div className="container mx-auto px-4">
            <Card className="max-w-5xl mx-auto bg-gradient-to-br from-orange-500/10 via-amber-400/10 to-yellow-500/10 border-2 border-orange-400/50 shadow-xl animate-bounce-in animate-glow">
              <CardContent className="p-10">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-scale-in">
                    <Icon name="Calculator" size={48} className="text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-3">
                    <Badge className="bg-gradient-to-r from-orange-600 to-amber-600 text-white mb-2 text-base px-4 py-1.5">
                      <Icon name="Wheat" size={18} className="mr-2" />
                      Для фермеров и КФХ
                    </Badge>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Калькулятор прогноза для агробизнеса</h2>
                    <p className="text-lg text-gray-700">
                      Рассчитайте финансовый прогноз вашего хозяйства на месяц, год и 5 лет. 
                      Учитываем специфику растениеводства, животноводства и смешанного сельхозпроизводства.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Icon name="Check" size={18} className="text-green-600" />
                        <span>Анализ рисков отрасли</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Icon name="Check" size={18} className="text-green-600" />
                        <span>Оценка субсидий</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Icon name="Check" size={18} className="text-green-600" />
                        <span>Бесплатно</span>
                      </div>
                    </div>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg flex-shrink-0 px-8 py-6 text-lg" asChild>
                    <Link to="/agro-calculator">
                      <Icon name="TrendingUp" className="mr-2" size={22} />
                      Рассчитать прогноз
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Preview */}
        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Тарифы и цены</h2>
              <p className="text-xl text-muted-foreground">
                Прозрачные и выгодные условия сотрудничества
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
              {pricingHighlights.map((plan, index) => (
                <Card 
                  key={index}
                  className={`text-center hover:shadow-xl transition-all ${plan.badge ? 'border-2 border-primary' : ''}`}
                >
                  {plan.badge && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-primary text-white px-4 py-1">
                        {plan.badge}
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon name={plan.icon as any} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <div className="text-4xl font-bold text-primary mb-1">{plan.price}</div>
                    <p className="text-muted-foreground text-sm mb-4">{plan.period}</p>
                    <p className="text-sm">{plan.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link to="/accounting">
                  Все тарифы и детали
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Отзывы клиентов</h2>
              <p className="text-xl text-muted-foreground">
                Что говорят о нас наши клиенты
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-8">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 italic">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{testimonial.name}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-4xl mx-auto bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-12 text-center space-y-6">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
                  <Icon name="MessageCircle" size={40} className="text-primary" />
                </div>
                <h2 className="text-4xl font-bold">Готовы начать работу?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Свяжитесь с нами для бесплатной консультации и расчёта стоимости обслуживания вашего бизнеса
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild>
                    <Link to="/contacts">
                      <Icon name="Phone" className="mr-2" />
                      Получить консультацию
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/accounting">
                      <Icon name="Calculator" className="mr-2" />
                      Наши услуги
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;