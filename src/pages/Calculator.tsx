import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Calculator = () => {
  const [roomType, setRoomType] = useState('apartment');
  const [area, setArea] = useState([50]);
  const [deadline, setDeadline] = useState('2-3');
  const [style, setStyle] = useState('modern');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const calculatePrice = () => {
    const basePrice = area[0] * 5000;
    
    const styleMultipliers: Record<string, number> = {
      'modern': 1.2,
      'minimalism': 1.0,
      'loft': 1.3,
      'classic': 1.4,
      'scandinavian': 1.1,
    };

    const deadlineMultipliers: Record<string, number> = {
      '1': 1.5,
      '2-3': 1.2,
      '4-6': 1.0,
      '6+': 0.9,
    };

    const roomTypeMultipliers: Record<string, number> = {
      'apartment': 1.0,
      'office': 1.1,
      'house': 1.15,
    };

    const finalPrice = Math.round(
      basePrice * 
      (styleMultipliers[style] || 1) * 
      (deadlineMultipliers[deadline] || 1) * 
      (roomTypeMultipliers[roomType] || 1)
    );

    return finalPrice;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !phone) {
      toast.error('Заполните все поля для получения консультации');
      return;
    }

    toast.success('Спасибо! Наш менеджер свяжется с вами в ближайшее время');
    
    setName('');
    setPhone('');
  };

  const price = calculatePrice();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <section className="pt-32 pb-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl font-bold mb-4">Калькулятор стоимости ремонта</h1>
            <p className="text-xl text-muted-foreground">
              Узнайте точную стоимость ремонта за 30 секунд
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="shadow-lg animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl">Параметры ремонта</CardTitle>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Тип помещения</Label>
                    <RadioGroup value={roomType} onValueChange={setRoomType} className="grid grid-cols-3 gap-4">
                      <div>
                        <RadioGroupItem value="apartment" id="apartment" className="peer sr-only" />
                        <Label
                          htmlFor="apartment"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-6 hover:bg-accent hover:border-primary cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <Icon name="Home" size={32} className="mb-2" />
                          <span className="font-semibold">Квартира</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="office" id="office" className="peer sr-only" />
                        <Label
                          htmlFor="office"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-6 hover:bg-accent hover:border-primary cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <Icon name="Building" size={32} className="mb-2" />
                          <span className="font-semibold">Офис</span>
                        </Label>
                      </div>
                      <div>
                        <RadioGroupItem value="house" id="house" className="peer sr-only" />
                        <Label
                          htmlFor="house"
                          className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-white p-6 hover:bg-accent hover:border-primary cursor-pointer peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                        >
                          <Icon name="Home" size={32} className="mb-2" />
                          <span className="font-semibold">Дом</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-lg font-semibold">Площадь помещения</Label>
                      <span className="text-2xl font-bold text-primary">{area[0]} м²</span>
                    </div>
                    <Slider
                      value={area}
                      onValueChange={setArea}
                      min={20}
                      max={300}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>20 м²</span>
                      <span>300 м²</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Желаемый срок завершения</Label>
                    <Select value={deadline} onValueChange={setDeadline}>
                      <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 месяц (срочно)</SelectItem>
                        <SelectItem value="2-3">2-3 месяца</SelectItem>
                        <SelectItem value="4-6">4-6 месяцев</SelectItem>
                        <SelectItem value="6+">Более 6 месяцев</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <Label className="text-lg font-semibold">Предпочтительный стиль</Label>
                    <Select value={style} onValueChange={setStyle}>
                      <SelectTrigger className="w-full h-12 text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="modern">Современный</SelectItem>
                        <SelectItem value="minimalism">Минимализм</SelectItem>
                        <SelectItem value="loft">Лофт</SelectItem>
                        <SelectItem value="classic">Классический</SelectItem>
                        <SelectItem value="scandinavian">Скандинавский</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card className="shadow-lg sticky top-24 animate-slide-up">
                <CardHeader className="bg-gradient-to-r from-primary to-secondary text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Итоговая стоимость</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                  <div className="text-center py-4">
                    <p className="text-sm text-muted-foreground mb-2">Примерная стоимость</p>
                    <p className="text-5xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {price.toLocaleString('ru-RU')} ₽
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(price / area[0]).toLocaleString('ru-RU')} ₽/м²
                    </p>
                  </div>

                  <div className="space-y-2 p-4 bg-accent/10 rounded-lg">
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Бесплатный замер</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Консультация дизайнера</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Гарантия 2 года</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Icon name="Check" size={16} className="text-primary" />
                      <span>Скидка 15% с дизайн-проектом</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label>Ваше имя</Label>
                      <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Иван Иванов"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Номер телефона</Label>
                      <Input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+7 (999) 999-99-99"
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                      size="lg"
                    >
                      <Icon name="Phone" className="mr-2" />
                      Получить консультацию
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                    </p>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-2 animate-fade-in">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Info" className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-2">Обратите внимание</h3>
                  <p className="text-muted-foreground">
                    Указанная стоимость является ориентировочной и может измениться после проведения замеров и 
                    составления точной сметы. Для получения финальной цены закажите бесплатную консультацию 
                    с нашим специалистом.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Calculator;
