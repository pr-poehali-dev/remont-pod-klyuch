import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

const Services = () => {
  const services = [
    {
      icon: 'Paintbrush',
      title: 'Косметический ремонт',
      price: 'от 3 000 ₽/м²',
      description: 'Быстрое обновление интерьера без серьезных изменений',
      features: [
        'Поклейка обоев',
        'Покраска стен и потолков',
        'Замена напольного покрытия',
        'Установка плинтусов и наличников',
        'Мелкие электромонтажные работы',
      ],
      gradient: 'from-primary to-secondary',
    },
    {
      icon: 'Hammer',
      title: 'Капитальный ремонт',
      price: 'от 7 000 ₽/м²',
      description: 'Полное преображение пространства с заменой коммуникаций',
      features: [
        'Демонтаж старых покрытий',
        'Перепланировка помещений',
        'Замена электрики и сантехники',
        'Выравнивание стен и полов',
        'Монтаж новых конструкций',
      ],
      gradient: 'from-secondary to-accent',
    },
    {
      icon: 'Sparkles',
      title: 'Дизайн-проект',
      price: 'от 1 500 ₽/м²',
      description: 'Профессиональная разработка концепции интерьера',
      features: [
        '3D визуализация помещений',
        'Подбор материалов и мебели',
        'Чертежи и планировки',
        'Цветовые решения',
        'Консультации дизайнера',
      ],
      gradient: 'from-accent to-primary',
    },
    {
      icon: 'Sofa',
      title: 'Ремонт жилых комнат',
      price: 'от 4 500 ₽/м²',
      description: 'Комфортное пространство для отдыха всей семьи',
      features: [
        'Спальни и гостиные',
        'Детские комнаты',
        'Кабинеты и библиотеки',
        'Гардеробные',
        'Балконы и лоджии',
      ],
      gradient: 'from-primary to-secondary',
    },
    {
      icon: 'Home',
      title: 'Ремонт санузлов и кухонь',
      price: 'от 8 000 ₽/м²',
      description: 'Специализированные работы с учетом повышенной влажности',
      features: [
        'Гидроизоляция помещений',
        'Укладка плитки',
        'Установка сантехники',
        'Монтаж кухонных гарнитуров',
        'Вентиляция',
      ],
      gradient: 'from-secondary to-accent',
    },
    {
      icon: 'Building',
      title: 'Ремонт офисов',
      price: 'от 5 500 ₽/м²',
      description: 'Создание современного рабочего пространства',
      features: [
        'Планировка офисных зон',
        'Системы освещения',
        'Кондиционирование',
        'Звукоизоляция',
        'Брендирование пространства',
      ],
      gradient: 'from-accent to-primary',
    },
  ];

  const additionalServices = [
    { icon: 'Truck', title: 'Вывоз мусора', description: 'Утилизация строительных отходов' },
    { icon: 'Package', title: 'Закупка материалов', description: 'Подбор и доставка со скидкой' },
    { icon: 'Shield', title: 'Гарантия 2 года', description: 'На все виды работ и материалы' },
    { icon: 'Calendar', title: 'Поэтапная оплата', description: 'Удобная схема расчетов' },
  ];

  const workStages = [
    {
      number: '01',
      title: 'Консультация',
      description: 'Обсуждаем ваши пожелания и бюджет',
      icon: 'MessageCircle',
    },
    {
      number: '02',
      title: 'Замер',
      description: 'Выезжаем на объект для точных измерений',
      icon: 'Ruler',
    },
    {
      number: '03',
      title: 'Смета',
      description: 'Составляем детальную смету работ',
      icon: 'FileText',
    },
    {
      number: '04',
      title: 'Договор',
      description: 'Заключаем официальный договор',
      icon: 'FileCheck',
    },
    {
      number: '05',
      title: 'Ремонт',
      description: 'Выполняем работы строго по графику',
      icon: 'Hammer',
    },
    {
      number: '06',
      title: 'Сдача',
      description: 'Принимаете объект с гарантией',
      icon: 'Check',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <Badge className="bg-gradient-to-r from-primary to-secondary text-white border-0 mb-4">
              Наши услуги
            </Badge>
            <h1 className="text-5xl font-bold mb-4">Полный спектр ремонтных работ</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              От косметического ремонта до полной перепланировки. Работаем с квартирами, домами и офисами
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-xl transition-all hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon name={service.icon} className="text-white" size={32} />
                  </div>
                  <CardTitle className="text-2xl mb-2">{service.title}</CardTitle>
                  <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {service.price}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{service.description}</p>
                  <div className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={16} className="text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link to="/calculator">
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 mt-4">
                      Рассчитать стоимость
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Дополнительные услуги</h2>
            <p className="text-xl text-muted-foreground">
              Всё необходимое для комфортного ремонта
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalServices.map((service, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-6 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center mx-auto">
                    <Icon name={service.icon} size={28} className="text-primary" />
                  </div>
                  <h3 className="font-bold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Этапы работы</h2>
            <p className="text-xl text-muted-foreground">
              Прозрачный процесс от заявки до сдачи объекта
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workStages.map((stage, index) => (
              <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all">
                <CardContent className="p-6">
                  <div className="absolute top-4 right-4 text-6xl font-bold text-primary/10 group-hover:text-primary/20 transition-colors">
                    {stage.number}
                  </div>
                  <div className="relative">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                      <Icon name={stage.icon} className="text-white" size={24} />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{stage.title}</h3>
                    <p className="text-muted-foreground">{stage.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Акция! Скидка 15%</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            При заказе ремонта с дизайн-проектом действует специальное предложение. 
            Успейте воспользоваться выгодными условиями!
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
            <Link to="/contacts">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
              >
                <Icon name="Phone" className="mr-2" />
                Получить консультацию
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
