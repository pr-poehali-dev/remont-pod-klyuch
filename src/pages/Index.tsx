import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Index = () => {
  const features = [
    {
      icon: 'TrendingUp',
      title: 'Прогноз выручки и прибыли',
      description: 'Точные прогнозы финансовых показателей на месяц, год и 5 лет на основе текущих данных',
      details: [
        'Прогноз месячной выручки с учётом сезонности',
        'Годовой прогноз с отраслевыми коэффициентами (0.8-1.3)',
        'Долгосрочный прогноз на 5 лет с бонусом от масштаба команды',
        'Три сценария: оптимистичный (+30%), базовый, пессимистичный (с учётом рисков)'
      ],
      example: 'При выручке 1М ₽/мес, росте 15% и отрасли IT (×1.3): через год — 1.2М ₽/мес, через 5 лет — 2.4М ₽/мес'
    },
    {
      icon: 'ShieldAlert',
      title: 'Оценка рисков',
      description: 'Анализ потенциальных угроз и возможностей для вашего бизнеса',
      details: [
        'Волатильность рынка: 0-100% нестабильности',
        'Уровень конкуренции: от низкой до высокой',
        'Отраслевые риски: 30-70% в зависимости от ОКВЭД',
        'Риск масштаба: малый бизнес (70%) → крупный (30%)'
      ],
      example: 'Гостиничный бизнес с волатильностью 60%, конкуренцией 70%, 5 сотрудников = общий риск 66%'
    },
    {
      icon: 'Target',
      title: 'Рекомендации по стратегии',
      description: 'Персонализированные советы по оптимизации бизнес-процессов',
      details: [
        'Диверсификация при высокой волатильности (>70%)',
        'Усиление УТП при высокой конкуренции (>70%)',
        'Инвестиции в команду при <10 сотрудников',
        'Агрессивное масштабирование при низких рисках (<30%)',
        'Оптимизация расходов при выручке <500К ₽'
      ],
      example: 'Малая команда (5 чел) + низкий рост (8%) = рекомендации: "Наймите специалистов" и "Увеличьте маркетинг"'
    },
    {
      icon: 'GitBranch',
      title: 'Сценарное моделирование',
      description: 'Проверьте "что будет, если..." перед принятием важных решений',
      details: [
        'Оптимистичный сценарий: базовый прогноз × 1.3',
        'Базовый сценарий: реалистичный расчёт по формулам',
        'Пессимистичный сценарий: базовый × 0.7 × (1 - риск/200)',
        'Сравнение результатов на 1 мес, 1 год, 5 лет'
      ],
      example: 'Базовый прогноз 5М ₽/год → оптимистичный 6.5М, пессимистичный 2.8М (при риске 60%)'
    },
    {
      icon: 'Building',
      title: 'Отраслевой анализ (ОКВЭД)',
      description: 'Учёт специфики 19 отраслей российской экономики',
      details: [
        'Сельское хозяйство: коэфф. 0.85, риск 65%',
        'IT и связь: коэфф. 1.3, риск 45%',
        'Финансы: коэфф. 1.2, риск 40%',
        'Гостиницы: коэфф. 1.1, риск 70%',
        'Госуправление: коэфф. 0.8, риск 30%'
      ],
      example: 'IT-компания растёт на 30% быстрее торговли при одинаковых стартовых данных'
    },
    {
      icon: 'Users',
      title: 'Влияние команды на рост',
      description: 'Расчёт бонуса от масштаба и анализ эффективности',
      details: [
        'Бонус к росту: до +20% при команде 100+ человек',
        'Формула: количество_сотрудников / 100 (макс 0.2)',
        'Риск масштаба снижается: от 70% (1-9 чел) до 30% (100+ чел)',
        'Рекомендация "Проверьте эффективность" при 100+ чел и росте <15%'
      ],
      example: 'Команда 50 чел даёт +10% к долгосрочному росту, команда 150 чел даёт +20%'
    },
    {
      icon: 'Calculator',
      title: 'Формулы расчёта',
      description: 'Прозрачная математика для каждого прогноза',
      details: [
        'Месяц: выручка × (1 + рост × отрасль / 12)',
        'Год: выручка × (1 + рост × отрасль)¹',
        '5 лет: выручка × (1 + рост × отрасль × (1 + бонус))⁵',
        'Общий риск: (волатильность + конкуренция + отрасль + масштаб) / 4'
      ],
      example: '1М ₽ × (1 + 0.2×1.2)¹ = 1.24М ₽ через год для IT-компании с ростом 20%'
    },
    {
      icon: 'FileText',
      title: 'Детальный отчёт',
      description: 'Получите полный анализ с рекомендациями на email или в мессенджер',
      details: [
        'PDF-отчёт с графиками и таблицами',
        'Анализ по 4 категориям рисков',
        'Персональные рекомендации с приоритетами',
        'Сравнение трёх сценариев развития',
        'Отправка на email или в Telegram/WhatsApp'
      ],
      example: 'Заполните форму → получите отчёт в течение 5 минут на выбранный канал связи'
    }
  ];

  const periods = [
    { title: 'Краткосрочный', period: '1 месяц', icon: 'Calendar' },
    { title: 'Среднесрочный', period: '1 год', icon: 'CalendarDays' },
    { title: 'Долгосрочный', period: '5 лет', icon: 'CalendarRange' }
  ];

  const cases = [
    {
      company: 'IT-стартап "TechFlow"',
      industry: 'Технологии',
      result: '+340% за 2 года',
      description: 'Точный прогноз помог привлечь инвесторов и масштабировать команду с 5 до 45 человек',
      icon: 'Laptop'
    },
    {
      company: 'Сеть кофеен "Бодрый день"',
      industry: 'Ритейл',
      result: '+85% выручки',
      description: 'Сценарное моделирование выявило оптимальные точки для открытия новых заведений',
      icon: 'Store'
    },
    {
      company: 'Производство "Мебель Про"',
      industry: 'Производство',
      result: 'Избежали убытков 12M ₽',
      description: 'Анализ рисков предупредил о спаде спроса, вовремя диверсифицировали продуктовую линейку',
      icon: 'Factory'
    }
  ];

  const testimonials = [
    {
      name: 'Алексей Морозов',
      position: 'CEO, TechFlow',
      text: 'План А показал реальные цифры развития. Благодаря точному прогнозу закрыли раунд инвестиций на 50М ₽',
      rating: 5
    },
    {
      name: 'Мария Соколова',
      position: 'Основатель, Бодрый день',
      text: 'Сценарии "что будет, если" спасли нас от серьёзных ошибок. Окупили подписку в первый месяц',
      rating: 5
    },
    {
      name: 'Дмитрий Волков',
      position: 'Финдиректор, Мебель Про',
      text: 'Впервые финансовое планирование стало понятным и прогнозируемым. Рекомендую всем предпринимателям',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-20">
        <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-accent/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold leading-tight">
                Прогнозируйте будущее
                <span className="block text-primary mt-2">вашего бизнеса</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Анализируем текущие показатели, рыночные тренды и финансы для точного прогноза развития на любой период
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/calculator">
                    <Icon name="Calculator" className="mr-2" size={20} />
                    Попробовать бесплатно
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/pricing">
                    <Icon name="CreditCard" className="mr-2" size={20} />
                    Смотреть тарифы
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Периоды прогнозирования</h2>
              <p className="text-xl text-muted-foreground">
                Планируйте на любой горизонт времени
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {periods.map((item, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all hover:shadow-lg">
                  <CardContent className="p-8 text-center space-y-4">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                      <Icon name={item.icon} size={32} className="text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold">{item.title}</h3>
                    <p className="text-3xl font-bold text-primary">{item.period}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Возможности продукта</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Комплексный инструмент для анализа и планирования развития вашего бизнеса
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-8 space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center flex-shrink-0">
                        <Icon name={feature.icon} size={28} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm uppercase text-primary flex items-center gap-2">
                        <Icon name="List" size={16} />
                        Что входит:
                      </h4>
                      <ul className="space-y-2">
                        {feature.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-sm">
                            <Icon name="CheckCircle" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-4 border border-accent/20">
                      <p className="text-sm font-medium mb-1 flex items-center gap-2">
                        <Icon name="Lightbulb" size={16} className="text-accent" />
                        Пример расчёта:
                      </p>
                      <p className="text-sm text-muted-foreground italic">{feature.example}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Примеры успешных прогнозов</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Реальные истории компаний, которые изменили свой бизнес с помощью точных прогнозов
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {cases.map((item, index) => (
                <Card key={index} className="hover:shadow-xl transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center">
                      <Icon name={item.icon} size={28} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.company}</h3>
                      <p className="text-sm text-muted-foreground">{item.industry}</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-4">
                      <p className="text-2xl font-bold text-primary">{item.result}</p>
                    </div>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-gradient-to-br from-accent/10 to-primary/10">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <Card className="border-2 border-accent shadow-2xl">
                <CardContent className="p-12">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-2xl mb-6">
                      <Icon name="Rocket" size={40} className="text-accent" />
                    </div>
                    <h2 className="text-4xl font-bold mb-4">Только планируете открыть бизнес?</h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      Специальный тариф для начинающих предпринимателей и стартаперов
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div className="space-y-4">
                      <h3 className="text-2xl font-bold">Что входит:</h3>
                      <ul className="space-y-3">
                        {[
                          'Финансовая модель бизнеса с нуля',
                          'Анализ рынка и конкурентов',
                          'Расчет точки безубыточности',
                          'Прогноз окупаемости инвестиций',
                          'Оценка стартовых затрат',
                          'Сценарии развития на 3 года',
                          'План выхода на прибыль',
                          'Консультация со специалистом'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <Icon name="Check" size={20} className="text-accent mt-0.5 flex-shrink-0" />
                            <span className="text-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-accent/5 rounded-2xl p-6 border-2 border-accent/20">
                        <div className="text-center space-y-3">
                          <p className="text-sm text-muted-foreground uppercase tracking-wide">Стоимость</p>
                          <div className="flex items-baseline justify-center gap-2">
                            <span className="text-5xl font-bold text-accent">15 990</span>
                            <span className="text-2xl text-accent">₽</span>
                          </div>
                          <p className="text-muted-foreground">единоразово</p>
                        </div>
                      </div>

                      <div className="bg-secondary/30 rounded-xl p-6 space-y-3">
                        <div className="flex items-center gap-2 text-primary">
                          <Icon name="Clock" size={20} />
                          <span className="font-semibold">Срок: 5-7 рабочих дней</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Icon name="FileText" size={20} />
                          <span className="font-semibold">Формат: PDF + Excel</span>
                        </div>
                        <div className="flex items-center gap-2 text-primary">
                          <Icon name="Users" size={20} />
                          <span className="font-semibold">Встреча: онлайн 1.5 часа</span>
                        </div>
                      </div>

                      <Button size="lg" className="w-full text-lg bg-accent hover:bg-accent/90" asChild>
                        <Link to="/contacts">
                          <Icon name="MessagesSquare" className="mr-2" />
                          Обсудить мой проект
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-xl p-6 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <Icon name="Lightbulb" size={24} className="text-primary mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-semibold mb-2">Для кого этот тариф?</p>
                        <p className="text-sm text-muted-foreground">
                          Идеально для тех, кто хочет открыть бизнес, но сомневается в идее. Мы поможем просчитать все сценарии, 
                          оценить риски и понять, стоит ли вкладывать деньги. Вы получите профессиональную финансовую модель, 
                          которую можно показать инвесторам или использовать для получения кредита.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Отзывы клиентов</h2>
              <p className="text-xl text-muted-foreground">
                Что говорят предприниматели о План А
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="hover:shadow-lg transition-all">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex gap-1">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Icon key={i} name="Star" size={20} className="text-accent fill-accent" />
                      ))}
                    </div>
                    <p className="text-foreground italic">"{testimonial.text}"</p>
                    <div className="border-t pt-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-primary to-accent rounded-2xl p-12 text-center text-white space-y-6">
              <h2 className="text-4xl font-bold">Готовы увидеть будущее вашего бизнеса?</h2>
              <p className="text-xl opacity-90">
                Начните с бесплатного прогноза и получите детальный анализ за 5 минут
              </p>
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link to="/calculator">
                  Создать прогноз сейчас
                  <Icon name="ArrowRight" className="ml-2" size={20} />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;