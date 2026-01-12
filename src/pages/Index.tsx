import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const benefits = [
    {
      icon: 'Lightbulb',
      title: 'Бесплатная консультация дизайнера',
      description: 'Получите профессиональный совет перед началом работ',
    },
    {
      icon: 'Package',
      title: 'Гарантия качества',
      description: 'Гарантируем качество материалов и выполненных работ',
    },
    {
      icon: 'Clock',
      title: 'Фиксированные сроки',
      description: 'Сдаем объекты точно в срок без задержек',
    },
    {
      icon: 'UserCheck',
      title: 'Индивидуальный подход',
      description: 'Учитываем все ваши пожелания и требования',
    },
    {
      icon: 'Shield',
      title: 'Официальный договор',
      description: 'Заключаем договор с гарантией результата',
    },
    {
      icon: 'TrendingUp',
      title: 'Скидка 15%',
      description: 'При заказе ремонта с дизайн-проектом',
    },
  ];

  const portfolio = [
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/b8c890f8-7725-4dc8-9227-cba1577bb32f.jpg',
      title: 'Современная гостиная',
      type: 'Квартира',
      style: 'Минимализм',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/a2f1b390-7b94-4e71-860a-0aecec6f5ee4.jpg',
      title: 'Процесс ремонта',
      type: 'Офис',
      style: 'Современный',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/f32486b2-e6c4-4b1d-8e39-52f2b689e495.jpg',
      title: 'До и после',
      type: 'Квартира',
      style: 'Лофт',
    },
  ];

  const reviews = [
    {
      name: 'Анна Петрова',
      rating: 5,
      text: 'Отличная работа! Сделали ремонт быстро и качественно. Особенно понравился индивидуальный подход.',
      date: '15 декабря 2025',
    },
    {
      name: 'Дмитрий Соколов',
      rating: 5,
      text: 'Профессиональная команда. Все выполнили в срок, материалы качественные. Рекомендую!',
      date: '3 января 2026',
    },
    {
      name: 'Мария Иванова',
      rating: 5,
      text: 'Превзошли все ожидания! Дизайнер предложил отличные решения, а рабочие выполнили всё идеально.',
      date: '8 января 2026',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0">
                Ремонт под ключ
              </Badge>
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                Мы превращаем ваши{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  квадратные метры
                </span>{' '}
                в шедевр комфорта!
              </h1>
              <p className="text-xl text-muted-foreground">
                Не откладывайте мечты о новом интерьере! Профессиональный ремонт с гарантией и фиксированными сроками.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/calculator">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg px-8"
                  >
                    <Icon name="Calculator" className="mr-2" />
                    Рассчитать стоимость
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="text-lg px-8 border-2">
                  <Icon name="MessageCircle" className="mr-2" />
                  Бесплатная консультация
                </Button>
              </div>
            </div>

            <div className="relative animate-scale-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/b8c890f8-7725-4dc8-9227-cba1577bb32f.jpg"
                alt="Современный интерьер"
                className="relative rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Почему выбирают нас</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Мы предоставляем полный комплекс услуг по ремонту с гарантией качества
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50"
              >
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon name={benefit.icon} className="text-white" size={28} />
                  </div>
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Наши работы</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Портфолио выполненных проектов с гарантией качества
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolio.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-primary/90 text-white">{item.type}</Badge>
                    <Badge className="bg-secondary/90 text-white">{item.style}</Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" size="lg" className="border-2">
              Посмотреть все работы
              <Icon name="ArrowRight" className="ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Отзывы клиентов</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Более 500 довольных клиентов рекомендуют нас
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg">{review.name}</h3>
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Icon key={i} name="Star" size={16} className="text-accent fill-accent" />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.text}</p>
                  <p className="text-sm text-muted-foreground">{review.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Готовы начать ремонт?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Получите бесплатную консультацию дизайнера и узнайте точную стоимость ремонта за 30 секунд
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculator">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              >
                <Icon name="Calculator" className="mr-2" />
                Рассчитать стоимость
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
            >
              <Icon name="Phone" className="mr-2" />
              Позвонить нам
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
