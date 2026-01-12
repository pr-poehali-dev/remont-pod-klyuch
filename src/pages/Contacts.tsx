import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.phone) {
      toast.error('Заполните обязательные поля');
      return;
    }

    toast.success('Спасибо за обращение! Мы свяжемся с вами в ближайшее время');
    
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      message: '',
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 (937) 076-86-80',
      link: 'tel:+79370768680',
      description: 'Звоните с 9:00 до 21:00',
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'info@remont.ru',
      link: 'mailto:info@remont.ru',
      description: 'Ответим в течение часа',
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'г. Москва, ул. Примерная, д. 1',
      link: '#',
      description: 'Офис работает пн-пт 9:00-18:00',
    },
    {
      icon: 'Clock',
      title: 'График работы',
      value: 'Ежедневно с 9:00 до 21:00',
      link: '#',
      description: 'Без выходных и праздников',
    },
  ];

  const socialLinks = [
    { icon: 'Instagram', name: 'Instagram', color: 'from-pink-500 to-purple-500' },
    { icon: 'Facebook', name: 'Facebook', color: 'from-blue-600 to-blue-400' },
    { icon: 'MessageCircle', name: 'WhatsApp', color: 'from-green-500 to-green-400' },
    { icon: 'Send', name: 'Telegram', color: 'from-blue-500 to-blue-300' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Контакты</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Свяжитесь с нами удобным способом — мы всегда на связи и готовы помочь
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <Card className="shadow-lg animate-scale-in">
              <CardHeader>
                <CardTitle className="text-2xl">Бесплатная консультация</CardTitle>
                <p className="text-muted-foreground">
                  Заполните форму и получите консультацию дизайнера в режиме реального времени
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">
                      Ваше имя <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange('name', e.target.value)}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Телефон <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleChange('phone', e.target.value)}
                      placeholder="+7 (999) 999-99-99"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      placeholder="example@mail.ru"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="service">Интересующая услуга</Label>
                    <Select value={formData.service} onValueChange={(value) => handleChange('service', value)}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Выберите услугу" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cosmetic">Косметический ремонт</SelectItem>
                        <SelectItem value="capital">Капитальный ремонт</SelectItem>
                        <SelectItem value="design">Дизайн-проект</SelectItem>
                        <SelectItem value="rooms">Ремонт комнат</SelectItem>
                        <SelectItem value="kitchen">Ремонт санузлов и кухонь</SelectItem>
                        <SelectItem value="office">Ремонт офисов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Ваше сообщение</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      placeholder="Расскажите о вашем проекте..."
                      rows={4}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                    size="lg"
                  >
                    <Icon name="Send" className="mr-2" />
                    Отправить заявку
                  </Button>

                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                  </p>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6 animate-fade-in">
              {contactInfo.map((info, index) => (
                <Card
                  key={index}
                  className="hover:shadow-lg transition-shadow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                        <Icon name={info.icon} className="text-white" size={24} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-lg mb-1">{info.title}</h3>
                        {info.link !== '#' ? (
                          <a
                            href={info.link}
                            className="text-primary hover:underline font-semibold text-lg block mb-1"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-semibold text-lg mb-1">{info.value}</p>
                        )}
                        <p className="text-sm text-muted-foreground">{info.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="shadow-lg mb-12 animate-slide-up">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Мы в социальных сетях</CardTitle>
              <p className="text-muted-foreground text-center">
                Следите за нашими проектами и получайте вдохновение
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    className="group"
                  >
                    <Card className="hover:shadow-lg transition-all hover:scale-105 border-2 hover:border-primary/50">
                      <CardContent className="p-6 text-center">
                        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${social.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                          <Icon name={social.icon} className="text-white" size={32} />
                        </div>
                        <p className="font-semibold">{social.name}</p>
                      </CardContent>
                    </Card>
                  </a>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="overflow-hidden shadow-lg animate-fade-in">
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Icon name="MapPin" size={48} className="mx-auto text-primary" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Наш офис на карте</h3>
                    <p className="text-muted-foreground">г. Москва, ул. Примерная, д. 1</p>
                  </div>
                  <Button variant="outline">
                    <Icon name="Navigation" className="mr-2" size={16} />
                    Построить маршрут
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Готовы начать сотрудничество?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Позвоните нам прямо сейчас или оставьте заявку — мы перезвоним в течение 5 минут
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8"
              asChild
            >
              <a href="tel:+79370768680">
                <Icon name="Phone" className="mr-2" />
                +7 (937) 076-86-80
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 text-lg px-8"
            >
              <Icon name="Calculator" className="mr-2" />
              Рассчитать стоимость
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contacts;