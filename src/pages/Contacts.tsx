import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Contacts = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    try {
      const response = await fetch('/backend/func2url.json');
      const urls = await response.json();
      const contactEmailUrl = urls['contact-email'];

      if (!contactEmailUrl) {
        toast.error('Функция отправки временно недоступна');
        return;
      }

      const result = await fetch(contactEmailUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
          formType: 'contact'
        }),
      });

      const data = await result.json();

      if (result.ok && data.success) {
        toast.success('Спасибо! Мы свяжемся с вами в ближайшее время');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
      } else {
        toast.error(data.error || 'Ошибка отправки заявки');
      }
    } catch (error) {
      console.error('Error sending form:', error);
      toast.error('Ошибка отправки заявки. Попробуйте позже');
    }
  };

  const contactInfo = [
    {
      icon: 'Phone',
      title: 'Телефон',
      value: '+7 (937) 076-86-80',
      link: 'tel:+79370768680'
    },
    {
      icon: 'Mail',
      title: 'Email',
      value: 'zakaz6377@yandex.ru',
      link: 'mailto:zakaz6377@yandex.ru'
    },
    {
      icon: 'MapPin',
      title: 'Адрес',
      value: 'г. Самара, Бизнес-центр',
      link: null
    },
    {
      icon: 'Clock',
      title: 'Время работы',
      value: 'Пн-Пт: 9:00 - 18:00',
      link: null
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h1 className="text-4xl md:text-5xl font-bold">Свяжитесь с нами</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Ответим на все вопросы и поможем подобрать оптимальное решение для вашего бизнеса
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold mb-6">Контактная информация</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {contactInfo.map((item, index) => (
                    <Card key={index} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6 space-y-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          <Icon name={item.icon} size={24} className="text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg">{item.title}</h3>
                        {item.link ? (
                          <a 
                            href={item.link} 
                            className="text-muted-foreground hover:text-primary transition-colors block"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-muted-foreground">{item.value}</p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <Card className="bg-gradient-to-br from-primary/5 to-accent/5">
                <CardContent className="p-8 space-y-4">
                  <div className="w-14 h-14 bg-accent/20 rounded-full flex items-center justify-center">
                    <Icon name="MessageCircle" size={28} className="text-accent" />
                  </div>
                  <h3 className="text-2xl font-bold">Быстрая связь</h3>
                  <p className="text-muted-foreground">
                    Напишите нам в мессенджере для оперативной консультации
                  </p>
                  <div className="flex gap-3 pt-2">
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      asChild
                    >
                      <a href="https://t.me/+79370768680" target="_blank" rel="noopener noreferrer">
                        <Icon name="MessageCircle" className="mr-2" />
                        Telegram
                      </a>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="flex-1"
                      asChild
                    >
                      <a href="https://wa.me/79370768680" target="_blank" rel="noopener noreferrer">
                        <Icon name="MessageCircle" className="mr-2" />
                        WhatsApp
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-6">Отправить сообщение</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя *</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+7 (999) 999-99-99"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Сообщение *</Label>
                    <Textarea
                      id="message"
                      placeholder="Расскажите о вашем бизнесе и задачах..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full text-lg">
                    <Icon name="Send" className="mr-2" />
                    Отправить заявку
                  </Button>

                  <p className="text-sm text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-accent/10 rounded-full">
              <Icon name="Clock" size={20} className="text-accent" />
              <span className="font-medium">Обычно отвечаем в течение 15 минут</span>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Contacts;