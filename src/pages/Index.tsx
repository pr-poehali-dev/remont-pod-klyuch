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
      description: 'Точные прогнозы финансовых показателей на месяц, год и 5 лет на основе текущих данных'
    },
    {
      icon: 'ShieldAlert',
      title: 'Оценка рисков',
      description: 'Анализ потенциальных угроз и возможностей для вашего бизнеса'
    },
    {
      icon: 'Target',
      title: 'Рекомендации по стратегии',
      description: 'Персонализированные советы по оптимизации бизнес-процессов'
    },
    {
      icon: 'GitBranch',
      title: 'Сценарное моделирование',
      description: 'Проверьте "что будет, если..." перед принятием важных решений'
    },
    {
      icon: 'LineChart',
      title: 'Анализ трендов',
      description: 'Мониторинг рыночных тенденций и их влияние на ваш бизнес'
    },
    {
      icon: 'Activity',
      title: 'Аналитика в реальном времени',
      description: 'Актуальные данные и метрики для быстрого принятия решений'
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
      text: 'Бизнес-Прогнозатор показал реальные цифры развития. Благодаря точному прогнозу закрыли раунд инвестиций на 50М ₽',
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="hover:shadow-xl transition-all hover:scale-105">
                  <CardContent className="p-6 space-y-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                      <Icon name={feature.icon} size={24} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-bold">Отзывы клиентов</h2>
              <p className="text-xl text-muted-foreground">
                Что говорят предприниматели о Бизнес-Прогнозаторе
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