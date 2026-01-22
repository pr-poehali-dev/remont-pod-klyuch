import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const Calculator = () => {
  const [currentRevenue, setCurrentRevenue] = useState([1000000]);
  const [growthRate, setGrowthRate] = useState([10]);
  const [industry, setIndustry] = useState('retail');
  const [employees, setEmployees] = useState([10]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [forecast, setForecast] = useState<{month: number, year: number, fiveYears: number} | null>(null);

  const calculateForecast = () => {
    if (!name || !email) {
      toast.error('Заполните все поля');
      return;
    }

    const base = currentRevenue[0];
    const growth = growthRate[0] / 100;
    
    const industryMultipliers: Record<string, number> = {
      'retail': 1.0,
      'tech': 1.3,
      'manufacturing': 0.9,
      'services': 1.1,
      'finance': 1.2,
    };

    const multiplier = industryMultipliers[industry] || 1.0;
    const employeeBonus = Math.min(employees[0] / 100, 0.2);

    const monthForecast = Math.round(base * (1 + (growth * multiplier / 12)));
    const yearForecast = Math.round(base * Math.pow(1 + (growth * multiplier), 1));
    const fiveYearForecast = Math.round(base * Math.pow(1 + (growth * multiplier * (1 + employeeBonus)), 5));

    setForecast({
      month: monthForecast,
      year: yearForecast,
      fiveYears: fiveYearForecast
    });

    toast.success('Прогноз рассчитан!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Калькулятор прогнозов</h1>
              <p className="text-xl text-muted-foreground">
                Получите прогноз развития вашего бизнеса на разные периоды
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Параметры бизнеса</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Текущая месячная выручка: {currentRevenue[0].toLocaleString('ru-RU')} ₽
                  </Label>
                  <Slider
                    value={currentRevenue}
                    onValueChange={setCurrentRevenue}
                    min={100000}
                    max={10000000}
                    step={100000}
                    className="w-full"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Ожидаемый темп роста: {growthRate[0]}% в год
                  </Label>
                  <Slider
                    value={growthRate}
                    onValueChange={setGrowthRate}
                    min={-20}
                    max={100}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry" className="text-base font-semibold">Отрасль</Label>
                  <Select value={industry} onValueChange={setIndustry}>
                    <SelectTrigger id="industry">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="retail">Розничная торговля</SelectItem>
                      <SelectItem value="tech">IT и технологии</SelectItem>
                      <SelectItem value="manufacturing">Производство</SelectItem>
                      <SelectItem value="services">Услуги</SelectItem>
                      <SelectItem value="finance">Финансы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-semibold">
                    Количество сотрудников: {employees[0]}
                  </Label>
                  <Slider
                    value={employees}
                    onValueChange={setEmployees}
                    min={1}
                    max={500}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Ваше имя</Label>
                    <Input
                      id="name"
                      placeholder="Иван Иванов"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="ivan@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <Button onClick={calculateForecast} size="lg" className="w-full text-lg">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать прогноз
                </Button>
              </CardContent>
            </Card>

            {forecast && (
              <Card className="border-2 border-primary animate-fade-in">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="TrendingUp" className="text-primary" />
                    Результаты прогноза
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2 p-6 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="Calendar" size={20} />
                        <span className="font-medium">Через 1 месяц</span>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {forecast.month.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <div className="space-y-2 p-6 bg-primary/5 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="CalendarDays" size={20} />
                        <span className="font-medium">Через 1 год</span>
                      </div>
                      <p className="text-3xl font-bold text-primary">
                        {forecast.year.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                    <div className="space-y-2 p-6 bg-accent/10 rounded-lg">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Icon name="CalendarRange" size={20} />
                        <span className="font-medium">Через 5 лет</span>
                      </div>
                      <p className="text-3xl font-bold text-accent">
                        {forecast.fiveYears.toLocaleString('ru-RU')} ₽
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      <Icon name="Info" size={16} className="inline mr-1" />
                      Прогноз основан на введённых данных и отраслевых коэффициентах. 
                      Для получения детального анализа и рекомендаций выберите подходящий тариф.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;
