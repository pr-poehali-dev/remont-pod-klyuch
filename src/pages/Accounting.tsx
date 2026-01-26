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

          {/* Case Studies for Agro Sector */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-accent text-white text-lg px-6 py-2 mb-4">
                <Icon name="Wheat" size={18} className="mr-2" />
                Примеры работ для агросектора
              </Badge>
              <h2 className="text-3xl font-bold">Реальные кейсы наших клиентов</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Помогаем фермерам и сельхозпроизводителям разобраться с отчётностью и получить все субсидии
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Wheat" size={24} className="text-accent" />
                  </div>
                  <CardTitle>КФХ "Золотое поле"</CardTitle>
                  <CardDescription>Ставропольский край, выращивание пшеницы</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Что сделали:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Настроили ФГИС Зерно с нуля</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Помогли получить субсидии на 2.4 млн ₽</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Сдали отчёты 29-СХ в срок</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-accent font-semibold">Экономия: 180 000 ₽/год на штатном бухгалтере</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Beef" size={24} className="text-accent" />
                  </div>
                  <CardTitle>ООО "АгроПродукт"</CardTitle>
                  <CardDescription>Краснодарский край, животноводство</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Что сделали:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Интеграция с ФГИС Меркурий</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Оформили субсидии на развитие КРС</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Оптимизировали ЕСХН</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-accent font-semibold">Результат: Получено 1.8 млн ₽ субсидий</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
                <CardHeader>
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Sprout" size={24} className="text-accent" />
                  </div>
                  <CardTitle>ИП Глава КФХ Петрова Н.В.</CardTitle>
                  <CardDescription>Ростовская область, овощеводство</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm font-semibold">Что сделали:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Восстановили учёт за 2 года</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Подготовили документы для субсидий</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span>Сопроводили налоговую проверку</span>
                      </li>
                    </ul>
                  </div>
                  <div className="pt-4 border-t">
                    <p className="text-sm text-accent font-semibold">Избежали штрафов на 450 000 ₽</p>
                  </div>
                </CardContent>
              </Card>
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

          {/* FAQ for Agro Sector */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <Badge className="bg-primary text-white text-lg px-6 py-2 mb-4">
                <Icon name="HelpCircle" size={18} className="mr-2" />
                Частые вопросы фермеров
              </Badge>
              <h2 className="text-3xl font-bold">ФГИС, субсидии и отчётность</h2>
              <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
                Ответы на самые популярные вопросы сельхозпроизводителей
              </p>
            </div>
            <div className="max-w-4xl mx-auto space-y-4">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="Wheat" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Что такое ФГИС Зерно и зачем она нужна?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>ФГИС Зерно — федеральная государственная информационная система учёта и прослеживаемости зерна и продуктов его переработки. Обязательна для всех, кто выращивает, хранит или перерабатывает зерно. Вносить данные нужно в течение 3 дней после операции. Мы помогаем настроить систему, вносим данные и следим за сроками.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="FileCheck" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Какие субсидии может получить КФХ?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>КФХ могут получить субсидии на развитие животноводства, растениеводства, покупку техники, строительство, мелиорацию. Основные: единовременная помощь начинающим фермерам (до 3 млн ₽), гранты на развитие (до 30 млн ₽), возмещение затрат на технику и оборудование. Мы готовим все документы и помогаем пройти комиссию.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="Beef" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Как работает ФГИС Меркурий?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>ФГИС Меркурий — система ветеринарного контроля для животноводства и продуктов животного происхождения. Нужна для оформления ветеринарных сопроводительных документов (ВСД) при перемещении животных и продукции. Мы настраиваем интеграцию, обучаем персонал и ведём электронный документооборот в системе.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="BarChart3" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Что такое форма 29-СХ в Росстат?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>Форма 29-СХ — статистическая отчётность по сельскому хозяйству. Сдают все сельхозпроизводители ежемесячно или ежеквартально в зависимости от объёмов производства. Включает данные по посевным площадям, урожайности, поголовью скота, надоям молока. Мы собираем данные, заполняем форму и отправляем в Росстат точно в срок.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="Percent" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>ЕСХН или УСН — что выгоднее для фермера?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>ЕСХН (Единый сельхозналог) — 6% с разницы доходов и расходов, освобождение от НДС. Подходит, если 70%+ дохода от сельхоза. УСН 6% (с доходов) или 15% (доходы минус расходы) — проще, но нет льгот для агросектора. Мы рассчитываем оба варианта и показываем, где экономия больше именно для вашего хозяйства.</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-start gap-3">
                    <Icon name="Clock" size={24} className="text-accent mt-1 flex-shrink-0" />
                    <span>Какие сроки сдачи отчётности для КФХ?</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  <p>ЕСХН — декларация до 31 марта. Форма 29-СХ — ежемесячно до 5-10 числа. ФГИС Зерно — в течение 3 дней после операции. Отчёты по зарплате (СЗВ-М) — ежемесячно до 15 числа. Годовая бухотчётность — до 31 марта. Мы ведём календарь отчётности и сдаём всё вовремя, чтобы избежать штрафов.</p>
                </CardContent>
              </Card>
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