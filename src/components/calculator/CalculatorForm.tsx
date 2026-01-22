import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import Icon from '@/components/ui/icon';

interface CalculatorFormProps {
  currentRevenue: number[];
  setCurrentRevenue: (value: number[]) => void;
  growthRate: number[];
  setGrowthRate: (value: number[]) => void;
  industry: string;
  setIndustry: (value: string) => void;
  employees: number[];
  setEmployees: (value: number[]) => void;
  marketVolatility: number[];
  setMarketVolatility: (value: number[]) => void;
  competition: number[];
  setCompetition: (value: number[]) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  onCalculate: () => void;
}

const CalculatorForm = ({
  currentRevenue,
  setCurrentRevenue,
  growthRate,
  setGrowthRate,
  industry,
  setIndustry,
  employees,
  setEmployees,
  marketVolatility,
  setMarketVolatility,
  competition,
  setCompetition,
  name,
  setName,
  email,
  setEmail,
  onCalculate
}: CalculatorFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Параметры бизнеса</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
        </div>

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-6">Параметры для оценки рисков</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Волатильность рынка: {marketVolatility[0]}%
              </Label>
              <Slider
                value={marketVolatility}
                onValueChange={setMarketVolatility}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Насколько нестабилен ваш рынок
              </p>
            </div>

            <div className="space-y-4">
              <Label className="text-base font-semibold">
                Уровень конкуренции: {competition[0]}%
              </Label>
              <Slider
                value={competition}
                onValueChange={setCompetition}
                min={0}
                max={100}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-muted-foreground">
                Насколько конкурентна ваша ниша
              </p>
            </div>
          </div>
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

        <Button onClick={onCalculate} size="lg" className="w-full text-lg">
          <Icon name="Calculator" className="mr-2" size={20} />
          Рассчитать прогноз с анализом рисков
        </Button>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;
