import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';

const PricingCalculator = () => {
  const [orgForm, setOrgForm] = useState('ooo');
  const [taxSystem, setTaxSystem] = useState('usn');
  const [activity, setActivity] = useState('');
  const [employees, setEmployees] = useState([5]);
  const [operations, setOperations] = useState([50]);
  const [payments, setPayments] = useState([20]);
  const [banks, setBanks] = useState([1]);
  const [consultations, setConsultations] = useState('included');
  const [price, setPrice] = useState<number | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const calculatePrice = () => {
    let basePrice = 0;

    if (orgForm === 'ooo') basePrice = 8000;
    else if (orgForm === 'ip') basePrice = 3000;
    else if (orgForm === 'ao') basePrice = 12000;
    else if (orgForm === 'nko') basePrice = 10000;

    if (taxSystem === 'usn') basePrice += 0;
    else if (taxSystem === 'eshn') basePrice += 3500;
    else if (taxSystem === 'osno') basePrice += 5000;
    else if (taxSystem === 'envd') basePrice += 2000;
    else if (taxSystem === 'patent') basePrice += 1500;

    basePrice += employees[0] * 300;
    basePrice += operations[0] * 30;
    basePrice += payments[0] * 20;
    basePrice += (banks[0] - 1) * 1000;

    if (consultations === 'unlimited') basePrice += 3000;

    setPrice(basePrice);
    setShowContactForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      toast.error('Заполните все поля');
      return;
    }
    toast.success('Спасибо! Мы свяжемся с вами в ближайшее время');
    setName('');
    setPhone('');
    setEmail('');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h1 className="text-4xl md:text-5xl font-bold">Калькулятор стоимости</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Рассчитайте стоимость бухгалтерского обслуживания для вашего бизнеса
            </p>
          </div>

          {/* Agro Banner */}
          <div className="mb-12">
            <Card className="max-w-5xl mx-auto bg-gradient-to-br from-orange-500/10 via-amber-400/10 to-yellow-500/10 border-2 border-orange-400/50 shadow-xl animate-bounce-in animate-glow">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-scale-in">
                    <Icon name="Wheat" size={40} className="text-white" />
                  </div>
                  <div className="flex-1 text-center md:text-left space-y-2">
                    <Badge className="bg-gradient-to-r from-orange-600 to-amber-600 text-white mb-2 px-4 py-1">
                      <Icon name="Sparkles" size={16} className="mr-2" />
                      Специально для агросектора
                    </Badge>
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Фермер? Есть специальный калькулятор!</h2>
                    <p className="text-base text-gray-700">
                      Для сельхозпроизводителей — отдельный расчёт с учётом ФГИС Зерно, Меркурий, форма 29-СХ и субсидий
                    </p>
                  </div>
                  <Button size="lg" className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 text-white shadow-lg flex-shrink-0" asChild>
                    <Link to="/calculator">
                      <Icon name="TrendingUp" className="mr-2" />
                      Калькулятор для агро
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Calculator" size={24} />
                  Параметры вашего бизнеса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-3">
                  <Label className="text-base font-semibold">Организационно-правовая форма</Label>
                  <RadioGroup value={orgForm} onValueChange={setOrgForm}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ooo" id="ooo" />
                      <Label htmlFor="ooo" className="cursor-pointer">ООО (Общество с ограниченной ответственностью)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ip" id="ip" />
                      <Label htmlFor="ip" className="cursor-pointer">ИП (Индивидуальный предприниматель)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="ao" id="ao" />
                      <Label htmlFor="ao" className="cursor-pointer">АО (Акционерное общество)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="nko" id="nko" />
                      <Label htmlFor="nko" className="cursor-pointer">НКО (Некоммерческая организация)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Система налогообложения</Label>
                  <RadioGroup value={taxSystem} onValueChange={setTaxSystem}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="usn" id="usn" />
                      <Label htmlFor="usn" className="cursor-pointer">УСН (Упрощенная)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="eshn" id="eshn" />
                      <Label htmlFor="eshn" className="cursor-pointer">🌾 ЕСХН (Единый сельхозналог)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="osno" id="osno" />
                      <Label htmlFor="osno" className="cursor-pointer">ОСНО (Общая)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="envd" id="envd" />
                      <Label htmlFor="envd" className="cursor-pointer">ЕНВД (Единый налог)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patent" id="patent" />
                      <Label htmlFor="patent" className="cursor-pointer">Патент</Label>
                    </div>
                  </RadioGroup>
                  {taxSystem === 'eshn' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-green-900 mb-1">ЕСХН для сельхозпроизводителей</p>
                        <p className="text-green-700">
                          Применяется если 70%+ доходов от сельхозпроизводства. Ставка 6% с разницы доходов и расходов, освобождение от НДС. 
                          Включает ФГИС Зерно, Меркурий и форму 29-СХ.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="activity" className="text-base font-semibold">Сфера деятельности</Label>
                  <Select value={activity} onValueChange={(value) => {
                    setActivity(value);
                    if (value === 'agriculture') {
                      toast.info('Для агросектора есть специальный калькулятор! Нажмите на баннер сверху', {
                        duration: 5000,
                      });
                    }
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите сферу деятельности" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agriculture">🌾 Сельское хозяйство</SelectItem>
                      <SelectItem value="retail">Розничная торговля</SelectItem>
                      <SelectItem value="wholesale">Оптовая торговля</SelectItem>
                      <SelectItem value="services">Услуги</SelectItem>
                      <SelectItem value="production">Производство</SelectItem>
                      <SelectItem value="construction">Строительство</SelectItem>
                      <SelectItem value="it">IT и разработка</SelectItem>
                      <SelectItem value="horeca">HoReCa (гостиницы, рестораны, кафе)</SelectItem>
                      <SelectItem value="transport">Транспорт и логистика</SelectItem>
                      <SelectItem value="other">Другое</SelectItem>
                    </SelectContent>
                  </Select>
                  {activity === 'agriculture' && (
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start gap-3">
                      <Icon name="Info" size={20} className="text-orange-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-semibold text-orange-900 mb-1">Рекомендуем специальный калькулятор</p>
                        <p className="text-orange-700">
                          Для сельхозпроизводителей мы создали отдельный калькулятор с учётом ФГИС систем и субсидий. 
                          <Link to="/calculator" className="underline font-medium ml-1">Перейти к калькулятору для агро →</Link>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Количество сотрудников</Label>
                    <span className="text-lg font-bold text-primary">{employees[0]}</span>
                  </div>
                  <Slider
                    value={employees}
                    onValueChange={setEmployees}
                    min={0}
                    max={100}
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Количество операций в месяц</Label>
                    <span className="text-lg font-bold text-primary">{operations[0]}</span>
                  </div>
                  <Slider
                    value={operations}
                    onValueChange={setOperations}
                    min={10}
                    max={500}
                    step={10}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Количество платежей в месяц</Label>
                    <span className="text-lg font-bold text-primary">{payments[0]}</span>
                  </div>
                  <Slider
                    value={payments}
                    onValueChange={setPayments}
                    min={5}
                    max={200}
                    step={5}
                  />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <Label className="text-base font-semibold">Количество расчетных счетов</Label>
                    <span className="text-lg font-bold text-primary">{banks[0]}</span>
                  </div>
                  <Slider
                    value={banks}
                    onValueChange={setBanks}
                    min={1}
                    max={5}
                    step={1}
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-semibold">Консультации</Label>
                  <RadioGroup value={consultations} onValueChange={setConsultations}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="included" id="included" />
                      <Label htmlFor="included" className="cursor-pointer">Включены в тариф (до 5 часов в месяц)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unlimited" id="unlimited" />
                      <Label htmlFor="unlimited" className="cursor-pointer">Неограниченные консультации (+3000₽)</Label>
                    </div>
                  </RadioGroup>
                </div>

                <Button 
                  onClick={calculatePrice} 
                  size="lg" 
                  className="w-full text-lg"
                  disabled={!activity}
                >
                  <Icon name="Calculator" className="mr-2" />
                  Рассчитать стоимость
                </Button>

                {price !== null && (
                  <div className="mt-8 p-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg text-center space-y-4">
                    <h3 className="text-2xl font-bold">Стоимость обслуживания</h3>
                    <div className="text-5xl font-bold text-primary">
                      {price.toLocaleString('ru-RU')} ₽
                    </div>
                    <p className="text-muted-foreground">в месяц</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 text-sm">
                      <div className="p-4 bg-background rounded-lg">
                        <Icon name="Shield" className="mx-auto mb-2 text-primary" size={24} />
                        <p className="font-semibold">Финансовая ответственность</p>
                        <p className="text-muted-foreground">Застрахована на 10 млн ₽</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <Icon name="Clock" className="mx-auto mb-2 text-primary" size={24} />
                        <p className="font-semibold">Работаем быстро</p>
                        <p className="text-muted-foreground">Отчёты в срок, без задержек</p>
                      </div>
                      <div className="p-4 bg-background rounded-lg">
                        <Icon name="HeadphonesIcon" className="mx-auto mb-2 text-primary" size={24} />
                        <p className="font-semibold">Поддержка 24/7</p>
                        <p className="text-muted-foreground">Всегда на связи</p>
                      </div>
                    </div>
                  </div>
                )}

                {showContactForm && (
                  <Card className="mt-8 border-primary/20">
                    <CardHeader>
                      <CardTitle>Оставьте заявку</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-4">
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
                          <Label htmlFor="phone">Телефон *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+7 (999) 999-99-99"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                        <Button type="submit" size="lg" className="w-full">
                          <Icon name="Send" className="mr-2" />
                          Отправить заявку
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PricingCalculator;