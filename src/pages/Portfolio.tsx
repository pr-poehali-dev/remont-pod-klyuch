import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Portfolio = () => {
  const [filterType, setFilterType] = useState('all');
  const [filterStyle, setFilterStyle] = useState('all');

  const portfolioItems = [
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/b8c890f8-7725-4dc8-9227-cba1577bb32f.jpg',
      title: 'Современная гостиная',
      type: 'apartment',
      style: 'modern',
      area: '45 м²',
      duration: '2 месяца',
      description: 'Полное преображение гостиной с объединением с кухней',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/2a91ec5a-2f0e-4452-beb0-24b0af5bce8b.jpg',
      title: 'Кухня премиум-класса',
      type: 'apartment',
      style: 'classic',
      area: '22 м²',
      duration: '1.5 месяца',
      description: 'Элегантная кухня с мраморными столешницами',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/7e72e5a1-ab71-4f05-b1a6-daade57dc270.jpg',
      title: 'Уютная спальня',
      type: 'apartment',
      style: 'scandinavian',
      area: '18 м²',
      duration: '3 недели',
      description: 'Спокойное пространство в скандинавском стиле',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/4eafebcd-5322-443b-9c4a-5cd637f78df5.jpg',
      title: 'Офисное пространство',
      type: 'office',
      style: 'modern',
      area: '120 м²',
      duration: '3 месяца',
      description: 'Современный офис с зонированием для команды',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/a2f1b390-7b94-4e71-860a-0aecec6f5ee4.jpg',
      title: 'Ремонт офиса',
      type: 'office',
      style: 'loft',
      area: '85 м²',
      duration: '2.5 месяца',
      description: 'Стильный офис в индустриальном стиле',
    },
    {
      image: 'https://cdn.poehali.dev/projects/797490ca-9030-4686-add0-d59219198cd5/files/f32486b2-e6c4-4b1d-8e39-52f2b689e495.jpg',
      title: 'Трансформация интерьера',
      type: 'apartment',
      style: 'loft',
      area: '65 м²',
      duration: '2 месяца',
      description: 'До и после: кардинальное изменение пространства',
    },
  ];

  const typeLabels: Record<string, string> = {
    all: 'Все',
    apartment: 'Квартиры',
    office: 'Офисы',
  };

  const styleLabels: Record<string, string> = {
    all: 'Все стили',
    modern: 'Современный',
    classic: 'Классический',
    loft: 'Лофт',
    scandinavian: 'Скандинавский',
  };

  const filteredItems = portfolioItems.filter((item) => {
    const matchesType = filterType === 'all' || item.type === filterType;
    const matchesStyle = filterStyle === 'all' || item.style === filterStyle;
    return matchesType && matchesStyle;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 mb-4">
              Портфолио
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Наши работы</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Более 500 успешно завершенных проектов. Каждый объект — это уникальная история преображения
            </p>
          </div>

          <div className="mb-12 space-y-6">
            <Card className="p-6 animate-scale-in">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3 text-lg">Тип помещения</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(typeLabels).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={filterType === key ? 'default' : 'outline'}
                        onClick={() => setFilterType(key)}
                        className={filterType === key ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 text-lg">Стиль интерьера</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(styleLabels).map(([key, label]) => (
                      <Button
                        key={key}
                        variant={filterStyle === key ? 'default' : 'outline'}
                        onClick={() => setFilterStyle(key)}
                        className={filterStyle === key ? 'bg-gradient-to-r from-primary to-secondary' : ''}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Icon name="Info" size={16} />
                <span>
                  Найдено проектов: <span className="font-semibold text-primary">{filteredItems.length}</span>
                </span>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden group hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <p className="text-sm font-medium">{item.description}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Badge className="bg-primary/90 text-white backdrop-blur-sm">
                      {typeLabels[item.type]}
                    </Badge>
                    <Badge className="bg-secondary/90 text-white backdrop-blur-sm">
                      {styleLabels[item.style]}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-bold">{item.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Maximize" size={16} />
                      <span>{item.area}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={16} />
                      <span>{item.duration}</span>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-white transition-colors">
                    <Icon name="Eye" className="mr-2" size={16} />
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <Card className="p-12 text-center">
              <Icon name="SearchX" size={48} className="mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-xl font-bold mb-2">Проекты не найдены</h3>
              <p className="text-muted-foreground mb-4">
                Попробуйте изменить фильтры для поиска подходящих проектов
              </p>
              <Button
                onClick={() => {
                  setFilterType('all');
                  setFilterStyle('all');
                }}
                variant="outline"
              >
                Сбросить фильтры
              </Button>
            </Card>
          )}
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2 animate-fade-in">
              <div className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                500+
              </div>
              <p className="text-xl font-semibold">Завершенных проектов</p>
              <p className="text-muted-foreground">За 15 лет работы</p>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                98%
              </div>
              <p className="text-xl font-semibold">Довольных клиентов</p>
              <p className="text-muted-foreground">Рекомендуют нас друзьям</p>
            </div>
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                100%
              </div>
              <p className="text-xl font-semibold">Гарантия качества</p>
              <p className="text-muted-foreground">На все виды работ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Хотите увидеть ваш проект здесь?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Начните свой ремонт с бесплатной консультации дизайнера и узнайте точную стоимость
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
            >
              <Icon name="Calculator" className="mr-2" />
              Рассчитать стоимость
            </Button>
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

export default Portfolio;
