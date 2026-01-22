import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface RiskAssessment {
  overall: number;
  categories: {
    name: string;
    level: number;
    description: string;
    icon: string;
  }[];
}

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

interface ForecastResult {
  optimistic: { month: number; year: number; fiveYears: number };
  base: { month: number; year: number; fiveYears: number };
  pessimistic: { month: number; year: number; fiveYears: number };
  risks: RiskAssessment;
  recommendations: Recommendation[];
}

const Calculator = () => {
  const [currentRevenue, setCurrentRevenue] = useState([1000000]);
  const [growthRate, setGrowthRate] = useState([10]);
  const [industry, setIndustry] = useState('retail');
  const [employees, setEmployees] = useState([10]);
  const [marketVolatility, setMarketVolatility] = useState([50]);
  const [competition, setCompetition] = useState([50]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [forecast, setForecast] = useState<ForecastResult | null>(null);

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

    const industryRisks: Record<string, number> = {
      'retail': 60,
      'tech': 45,
      'manufacturing': 55,
      'services': 50,
      'finance': 40,
    };

    const multiplier = industryMultipliers[industry] || 1.0;
    const employeeBonus = Math.min(employees[0] / 100, 0.2);

    const volatilityRisk = marketVolatility[0];
    const competitionRisk = competition[0];
    const industryRisk = industryRisks[industry] || 50;
    const scaleRisk = Math.max(30, 70 - (employees[0] / 10));

    const overallRisk = Math.round((volatilityRisk + competitionRisk + industryRisk + scaleRisk) / 4);

    const riskFactor = 1 - (overallRisk / 200);

    const baseMonth = Math.round(base * (1 + (growth * multiplier / 12)));
    const baseYear = Math.round(base * Math.pow(1 + (growth * multiplier), 1));
    const baseFiveYears = Math.round(base * Math.pow(1 + (growth * multiplier * (1 + employeeBonus)), 5));

    const optimisticMultiplier = 1.3;
    const pessimisticMultiplier = 0.7 * riskFactor;

    const recommendations: Recommendation[] = [];

    if (volatilityRisk > 70) {
      recommendations.push({
        title: 'Диверсифицируйте источники дохода',
        description: 'Высокая волатильность рынка требует распределения рисков. Рассмотрите дополнительные каналы продаж или новые продуктовые линейки.',
        priority: 'high',
        icon: 'Shield'
      });
    }

    if (competitionRisk > 70) {
      recommendations.push({
        title: 'Усильте уникальное торговое предложение',
        description: 'Высокая конкуренция требует четкого позиционирования. Выделите ключевые отличия вашего продукта и усильте маркетинг.',
        priority: 'high',
        icon: 'Target'
      });
    }

    if (employees[0] < 10) {
      recommendations.push({
        title: 'Инвестируйте в команду',
        description: 'Малый масштаб ограничивает рост. Наймите ключевых специалистов в продажи и разработку для масштабирования.',
        priority: 'high',
        icon: 'UserPlus'
      });
    }

    if (growthRate[0] < 10) {
      recommendations.push({
        title: 'Увеличьте инвестиции в рост',
        description: 'Низкий темп роста может привести к отставанию от конкурентов. Рассмотрите увеличение бюджета на маркетинг и R&D.',
        priority: 'medium',
        icon: 'TrendingUp'
      });
    }

    if (industryRisk > 60) {
      recommendations.push({
        title: 'Адаптируйтесь к отраслевым изменениям',
        description: 'Ваша отрасль находится в зоне риска. Следите за трендами, будьте готовы к быстрым изменениям стратегии.',
        priority: 'medium',
        icon: 'AlertTriangle'
      });
    }

    if (currentRevenue[0] < 500000) {
      recommendations.push({
        title: 'Оптимизируйте операционные расходы',
        description: 'При текущей выручке критически важна финансовая эффективность. Проанализируйте структуру затрат и устраните неэффективные расходы.',
        priority: 'medium',
        icon: 'DollarSign'
      });
    }

    if (volatilityRisk < 30 && competitionRisk < 30) {
      recommendations.push({
        title: 'Агрессивное масштабирование',
        description: 'Благоприятные рыночные условия и низкая конкуренция создают окно возможностей. Увеличьте инвестиции в захват рынка.',
        priority: 'high',
        icon: 'Rocket'
      });
    }

    if (employees[0] > 100 && growthRate[0] < 15) {
      recommendations.push({
        title: 'Проверьте эффективность команды',
        description: 'Большая команда при низком росте может указывать на проблемы с продуктивностью. Пересмотрите процессы и KPI.',
        priority: 'medium',
        icon: 'Users'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        title: 'Поддерживайте текущую стратегию',
        description: 'Ваши показатели сбалансированы. Продолжайте выполнение текущей стратегии с регулярным мониторингом метрик.',
        priority: 'low',
        icon: 'CheckCircle'
      });
    }

    setForecast({
      optimistic: {
        month: Math.round(baseMonth * optimisticMultiplier),
        year: Math.round(baseYear * optimisticMultiplier),
        fiveYears: Math.round(baseFiveYears * optimisticMultiplier)
      },
      base: {
        month: baseMonth,
        year: baseYear,
        fiveYears: baseFiveYears
      },
      pessimistic: {
        month: Math.round(baseMonth * pessimisticMultiplier),
        year: Math.round(baseYear * pessimisticMultiplier),
        fiveYears: Math.round(baseFiveYears * pessimisticMultiplier)
      },
      risks: {
        overall: overallRisk,
        categories: [
          {
            name: 'Волатильность рынка',
            level: volatilityRisk,
            description: volatilityRisk > 70 ? 'Высокая нестабильность' : volatilityRisk > 40 ? 'Умеренные колебания' : 'Стабильный рынок',
            icon: 'TrendingUp'
          },
          {
            name: 'Конкуренция',
            level: competitionRisk,
            description: competitionRisk > 70 ? 'Высокая конкуренция' : competitionRisk > 40 ? 'Средний уровень' : 'Низкая конкуренция',
            icon: 'Users'
          },
          {
            name: 'Отраслевые риски',
            level: industryRisk,
            description: industryRisk > 60 ? 'Требует внимания' : industryRisk > 40 ? 'Умеренные' : 'Низкие риски',
            icon: 'Building'
          },
          {
            name: 'Масштаб бизнеса',
            level: scaleRisk,
            description: employees[0] < 10 ? 'Малый бизнес - высокий риск' : employees[0] < 50 ? 'Средний бизнес' : 'Крупный бизнес - низкий риск',
            icon: 'Scale'
          }
        ]
      },
      recommendations
    });

    toast.success('Прогноз с рекомендациями готов!');
  };

  const getRiskColor = (level: number) => {
    if (level > 70) return 'text-red-500';
    if (level > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  const getRiskBgColor = (level: number) => {
    if (level > 70) return 'bg-red-500';
    if (level > 40) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPriorityColor = (priority: 'high' | 'medium' | 'low') => {
    if (priority === 'high') return 'border-red-500 bg-red-500/5';
    if (priority === 'medium') return 'border-yellow-500 bg-yellow-500/5';
    return 'border-green-500 bg-green-500/5';
  };

  const getPriorityBadgeColor = (priority: 'high' | 'medium' | 'low') => {
    if (priority === 'high') return 'bg-red-500';
    if (priority === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getPriorityText = (priority: 'high' | 'medium' | 'low') => {
    if (priority === 'high') return 'Высокий приоритет';
    if (priority === 'medium') return 'Средний приоритет';
    return 'Низкий приоритет';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold">Калькулятор прогнозов</h1>
              <p className="text-xl text-muted-foreground">
                Получите прогноз с анализом рисков и сценариями развития
              </p>
            </div>

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

                <Button onClick={calculateForecast} size="lg" className="w-full text-lg">
                  <Icon name="Calculator" className="mr-2" size={20} />
                  Рассчитать прогноз с анализом рисков
                </Button>
              </CardContent>
            </Card>

            {forecast && (
              <>
                <Card className="border-2 border-red-500/50 animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="ShieldAlert" className="text-red-500" />
                      Анализ рисков
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-6 bg-secondary/20 rounded-lg">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Общий уровень риска</p>
                        <p className={`text-4xl font-bold ${getRiskColor(forecast.risks.overall)}`}>
                          {forecast.risks.overall}%
                        </p>
                      </div>
                      <div className="w-24 h-24 rounded-full border-8 flex items-center justify-center"
                        style={{ borderColor: forecast.risks.overall > 70 ? '#ef4444' : forecast.risks.overall > 40 ? '#eab308' : '#22c55e' }}>
                        <Icon name="AlertTriangle" size={32} className={getRiskColor(forecast.risks.overall)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {forecast.risks.categories.map((risk, index) => (
                        <div key={index} className="space-y-3 p-4 bg-secondary/10 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name={risk.icon} size={20} className="text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold">{risk.name}</p>
                              <p className="text-sm text-muted-foreground">{risk.description}</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Уровень риска</span>
                              <span className={`font-semibold ${getRiskColor(risk.level)}`}>{risk.level}%</span>
                            </div>
                            <Progress value={risk.level} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-primary animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="GitBranch" className="text-primary" />
                      Сценарии прогноза
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-8">
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Icon name="TrendingUp" className="text-green-500" size={24} />
                          <h3 className="text-xl font-bold">Оптимистичный сценарий</h3>
                          <span className="text-sm text-muted-foreground ml-auto">+30% к базовому</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                            <p className="text-sm text-muted-foreground mb-1">1 месяц</p>
                            <p className="text-2xl font-bold text-green-600">
                              {forecast.optimistic.month.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                            <p className="text-sm text-muted-foreground mb-1">1 год</p>
                            <p className="text-2xl font-bold text-green-600">
                              {forecast.optimistic.year.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                            <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                            <p className="text-2xl font-bold text-green-600">
                              {forecast.optimistic.fiveYears.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Icon name="Minus" className="text-primary" size={24} />
                          <h3 className="text-xl font-bold">Базовый сценарий</h3>
                          <span className="text-sm text-muted-foreground ml-auto">Ожидаемый результат</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-sm text-muted-foreground mb-1">1 месяц</p>
                            <p className="text-2xl font-bold text-primary">
                              {forecast.base.month.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-sm text-muted-foreground mb-1">1 год</p>
                            <p className="text-2xl font-bold text-primary">
                              {forecast.base.year.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                            <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                            <p className="text-2xl font-bold text-primary">
                              {forecast.base.fiveYears.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Icon name="TrendingDown" className="text-red-500" size={24} />
                          <h3 className="text-xl font-bold">Пессимистичный сценарий</h3>
                          <span className="text-sm text-muted-foreground ml-auto">С учётом рисков</span>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                            <p className="text-sm text-muted-foreground mb-1">1 месяц</p>
                            <p className="text-2xl font-bold text-red-600">
                              {forecast.pessimistic.month.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                            <p className="text-sm text-muted-foreground mb-1">1 год</p>
                            <p className="text-2xl font-bold text-red-600">
                              {forecast.pessimistic.year.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                          <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                            <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                            <p className="text-2xl font-bold text-red-600">
                              {forecast.pessimistic.fiveYears.toLocaleString('ru-RU')} ₽
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">
                        <Icon name="Info" size={16} className="inline mr-1" />
                        Прогноз учитывает волатильность рынка, конкуренцию, отраслевые особенности и масштаб бизнеса. 
                        Для детального анализа и персональных рекомендаций выберите платный тариф.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent animate-fade-in">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      <Icon name="Lightbulb" className="text-accent" />
                      Рекомендации по стратегии
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {forecast.recommendations.map((rec, index) => (
                        <div key={index} className={`p-6 rounded-lg border-2 ${getPriorityColor(rec.priority)}`}>
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name={rec.icon} size={24} className="text-accent" />
                            </div>
                            <div className="flex-1 space-y-2">
                              <div className="flex items-center gap-3">
                                <h3 className="text-lg font-bold">{rec.title}</h3>
                                <span className={`text-xs px-2 py-1 rounded-full text-white ${getPriorityBadgeColor(rec.priority)}`}>
                                  {getPriorityText(rec.priority)}
                                </span>
                              </div>
                              <p className="text-muted-foreground">{rec.description}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 p-4 bg-accent/5 rounded-lg border border-accent/20">
                      <p className="text-sm text-muted-foreground">
                        <Icon name="Info" size={16} className="inline mr-1" />
                        Рекомендации сформированы на основе анализа рисков и параметров вашего бизнеса. 
                        Для персональной консультации и детального плана действий свяжитесь с нами.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Calculator;