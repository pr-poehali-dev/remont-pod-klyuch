import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [activeSection, setActiveSection] = useState('home');
  const [area, setArea] = useState([50]);
  const [roomType, setRoomType] = useState('квартира');
  const [style, setStyle] = useState('современный');

  const calculatePrice = () => {
    const basePrice = area[0] * 5000;
    const styleMultiplier = style === 'премиум' ? 1.5 : style === 'современный' ? 1.2 : 1;
    return Math.round(basePrice * styleMultiplier);
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Icon name="Hammer" className="text-white" size={24} />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Ремонтируем
              </span>
            </div>
            <div className="hidden md:flex gap-6">
              {['Главная', 'Услуги', 'Калькулятор', 'Контакты'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`font-medium transition-all hover:text-primary ${
                    activeSection === item.toLowerCase() ? 'text-primary' : 'text-gray-600'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Консультация
            </Button>
          </div>
        </div>
      </nav>

      <section id="главная" className="pt-32 pb-20 px-4 bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Мы превращаем ваши{' '}
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  квадратные метры
                </span>{' '}
                в шедевр комфорта!
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Не откладывайте мечты о новом интерьере! Профессиональный ремонт под ключ с гарантией качества.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg"
                  onClick={() => scrollToSection('калькулятор')}
                >
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать стоимость
                </Button>
                <Button size="lg" variant="outline" className="text-lg">
                  <Icon name="Phone" className="mr-2" size={20} />
                  Позвонить
                </Button>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="text-center animate-scale-in">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <div className="text-sm text-gray-600">Проектов</div>
                </div>
                <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
                  <div className="text-3xl font-bold text-secondary">15</div>
                  <div className="text-sm text-gray-600">Лет опыта</div>
                </div>
                <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
                  <div className="text-3xl font-bold text-accent">100%</div>
                  <div className="text-sm text-gray-600">Гарантия</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800&h=600&fit=crop"
                alt="Современный интерьер"
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Почему выбирают нас</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">5 причин доверить ремонт профессионалам</p>
          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              {
                icon: 'Lightbulb',
                title: 'Бесплатная консультация',
                desc: 'Дизайнер перед началом работ',
                color: 'from-yellow-400 to-orange-500',
              },
              {
                icon: 'Package',
                title: 'Гарантия качества',
                desc: 'Материалов и выполненных работ',
                color: 'from-purple-400 to-pink-500',
              },
              {
                icon: 'Clock',
                title: 'Фиксированные сроки',
                desc: 'Сдача объектов без задержек',
                color: 'from-blue-400 to-cyan-500',
              },
              {
                icon: 'Users',
                title: 'Индивидуальный подход',
                desc: 'К каждому клиенту',
                color: 'from-green-400 to-emerald-500',
              },
              {
                icon: 'ShieldCheck',
                title: 'Официальный договор',
                desc: 'С гарантией результата',
                color: 'from-red-400 to-rose-500',
              },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in border-2"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4`}>
                  <Icon name={item.icon as any} className="text-white" size={32} />
                </div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="услуги" className="py-20 px-4 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4">Наши услуги</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">Полный спектр ремонтных работ</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Косметический ремонт',
                price: 'от 3 000 ₽/м²',
                features: ['Поклейка обоев', 'Покраска стен', 'Замена напольного покрытия', 'Электромонтажные работы'],
                icon: 'Paintbrush',
                gradient: 'from-orange-500 to-red-500',
              },
              {
                title: 'Капитальный ремонт',
                price: 'от 7 000 ₽/м²',
                features: ['Перепланировка', 'Замена коммуникаций', 'Стяжка пола', 'Штукатурка стен'],
                icon: 'Hammer',
                gradient: 'from-purple-500 to-pink-500',
              },
              {
                title: 'Дизайн-проект',
                price: 'от 1 500 ₽/м²',
                features: ['3D визуализация', 'Подбор материалов', 'Чертежи и схемы', 'Авторский надзор'],
                icon: 'Palette',
                gradient: 'from-blue-500 to-cyan-500',
              },
            ].map((service, idx) => (
              <Card
                key={idx}
                className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${idx * 0.15}s` }}
              >
                <div className={`h-32 bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  <Icon name={service.icon as any} className="text-white" size={48} />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                  <div className="text-3xl font-bold text-primary mb-4">{service.price}</div>
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <Icon name="CheckCircle2" className="text-green-500" size={18} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                    Заказать
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="калькулятор" className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Калькулятор стоимости</h2>
            <p className="text-gray-600 text-lg">Рассчитайте примерную стоимость ремонта за 30 секунд</p>
          </div>
          <Card className="p-8 shadow-2xl border-2 animate-scale-in">
            <div className="space-y-8">
              <div>
                <Label className="text-lg mb-3 block">Тип помещения</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {['квартира', 'дом', 'офис', 'кафе'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setRoomType(type)}
                      className={`p-4 rounded-xl border-2 transition-all font-medium capitalize ${
                        roomType === type
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 hover:border-primary/50'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label className="text-lg mb-3 block">Площадь: {area[0]} м²</Label>
                <Slider value={area} onValueChange={setArea} max={200} min={20} step={5} className="mb-2" />
                <div className="flex justify-between text-sm text-gray-500">
                  <span>20 м²</span>
                  <span>200 м²</span>
                </div>
              </div>

              <div>
                <Label className="text-lg mb-3 block">Стиль интерьера</Label>
                <div className="grid grid-cols-3 gap-3">
                  {['базовый', 'современный', 'премиум'].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStyle(s)}
                      className={`p-4 rounded-xl border-2 transition-all font-medium capitalize ${
                        style === s
                          ? 'border-secondary bg-secondary/10 text-secondary'
                          : 'border-gray-200 hover:border-secondary/50'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t-2">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xl font-semibold">Примерная стоимость:</span>
                  <span className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    {calculatePrice().toLocaleString()} ₽
                  </span>
                </div>
                <Button className="w-full bg-gradient-to-r from-primary via-secondary to-accent hover:opacity-90 text-lg py-6">
                  <Icon name="Send" className="mr-2" size={20} />
                  Получить точный расчет
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section id="контакты" className="py-20 px-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Свяжитесь с нами</h2>
            <p className="text-gray-600 text-lg">Бесплатная онлайн-консультация с дизайнером прямо сейчас!</p>
          </div>
          <Card className="p-8 shadow-2xl animate-fade-in">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label className="mb-2 block">Ваше имя</Label>
                  <Input placeholder="Иван Иванов" className="h-12" />
                </div>
                <div>
                  <Label className="mb-2 block">Телефон</Label>
                  <Input placeholder="+7 (999) 123-45-67" className="h-12" />
                </div>
              </div>
              <div>
                <Label className="mb-2 block">Email</Label>
                <Input type="email" placeholder="ivan@example.com" className="h-12" />
              </div>
              <div>
                <Label className="mb-2 block">Расскажите о вашем проекте</Label>
                <Textarea placeholder="Хочу сделать ремонт в квартире 50 м²..." className="min-h-32" />
              </div>
              <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-lg py-6">
                <Icon name="MessageCircle" className="mr-2" size={20} />
                Получить консультацию
              </Button>
            </form>
          </Card>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <Icon name="Hammer" className="text-white" size={24} />
                </div>
                <span className="text-xl font-bold">Ремонтируем</span>
              </div>
              <p className="text-gray-400">Превращаем квадратные метры в шедевр комфорта с 2009 года</p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center gap-2">
                  <Icon name="Phone" size={18} />
                  +7 (999) 123-45-67
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="Mail" size={18} />
                  info@remontiruem.ru
                </p>
                <p className="flex items-center gap-2">
                  <Icon name="MapPin" size={18} />
                  Москва, ул. Строителей, 1
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-bold mb-4">График работы</h3>
              <div className="space-y-2 text-gray-400">
                <p>Пн-Пт: 9:00 - 20:00</p>
                <p>Сб-Вс: 10:00 - 18:00</p>
                <p className="text-primary font-semibold mt-4">Онлайн-консультации 24/7</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>© 2024 Ремонтируем под ключ. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
