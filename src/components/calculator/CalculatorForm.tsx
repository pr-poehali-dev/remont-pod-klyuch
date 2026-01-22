import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
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
            <Label htmlFor="industry" className="text-base font-semibold">Отрасль (ОКВЭД)</Label>
            <Select value={industry} onValueChange={setIndustry}>
              <SelectTrigger id="industry">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                <SelectItem value="agriculture">А - Сельское, лесное хозяйство, охота, рыболовство</SelectItem>
                <SelectItem value="mining">B - Добыча полезных ископаемых</SelectItem>
                <SelectItem value="manufacturing">C - Обрабатывающие производства</SelectItem>
                <SelectItem value="electricity">D - Обеспечение электроэнергией, газом, паром</SelectItem>
                <SelectItem value="water">E - Водоснабжение, водоотведение, отходы</SelectItem>
                <SelectItem value="construction">F - Строительство</SelectItem>
                <SelectItem value="retail">G - Торговля оптовая и розничная</SelectItem>
                <SelectItem value="transport">H - Транспортировка и хранение</SelectItem>
                <SelectItem value="hospitality">I - Гостиницы и общественное питание</SelectItem>
                <SelectItem value="tech">J - Информация и связь</SelectItem>
                <SelectItem value="finance">K - Финансовая и страховая деятельность</SelectItem>
                <SelectItem value="realestate">L - Операции с недвижимым имуществом</SelectItem>
                <SelectItem value="professional">M - Профессиональная, научная, техническая деятельность</SelectItem>
                <SelectItem value="administrative">N - Административная деятельность</SelectItem>
                <SelectItem value="public">O - Государственное управление</SelectItem>
                <SelectItem value="education">P - Образование</SelectItem>
                <SelectItem value="healthcare">Q - Здравоохранение и социальные услуги</SelectItem>
                <SelectItem value="culture">R - Культура, спорт, развлечения, отдых</SelectItem>
                <SelectItem value="services">S - Предоставление прочих видов услуг</SelectItem>
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
              <div className="flex items-center gap-2">
                <Label className="text-base font-semibold">
                  Волатильность рынка: {marketVolatility[0]}%
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button type="button" className="text-muted-foreground hover:text-foreground transition-colors">
                        <Icon name="HelpCircle" size={20} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-sm p-4" side="top">
                      <div className="space-y-2">
                        <p className="font-semibold">Что такое волатильность?</p>
                        <p className="text-sm">
                          Это "качели" вашего рынка — насколько сильно и часто меняются цены, спрос и условия работы.
                        </p>
                        <div className="space-y-1 text-sm">
                          <p><strong>Низкая (0-30%):</strong> Стабильный рынок, предсказуемые продажи</p>
                          <p><strong>Средняя (30-70%):</strong> Бывают колебания, но можно планировать</p>
                          <p><strong>Высокая (70-100%):</strong> Резкие скачки спроса и цен, сложно прогнозировать</p>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          Примеры: IT-услуги (низкая), мода (средняя), криптовалюта (высокая)
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
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