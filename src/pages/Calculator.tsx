import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import RiskAnalysis from '@/components/calculator/RiskAnalysis';
import ForecastScenarios from '@/components/calculator/ForecastScenarios';
import StrategyRecommendations from '@/components/calculator/StrategyRecommendations';
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
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [messenger, setMessenger] = useState('');
  const [forecast, setForecast] = useState<ForecastResult | null>(null);

  const calculateForecast = () => {
    if (!name || !email || !phone || !company) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    if (deliveryMethod === 'messenger' && !messenger) {
      toast.error('Укажите контакт в мессенджере');
      return;
    }

    const base = currentRevenue[0];
    const growth = growthRate[0] / 100;
    
    const industryMultipliers: Record<string, number> = {
      'agriculture': 0.85,
      'mining': 0.95,
      'manufacturing': 0.9,
      'electricity': 1.0,
      'water': 0.95,
      'construction': 1.05,
      'retail': 1.0,
      'transport': 0.95,
      'hospitality': 1.1,
      'tech': 1.3,
      'finance': 1.2,
      'realestate': 1.15,
      'professional': 1.2,
      'administrative': 1.0,
      'public': 0.8,
      'education': 0.9,
      'healthcare': 1.05,
      'culture': 1.0,
      'services': 1.1,
    };

    const industryRisks: Record<string, number> = {
      'agriculture': 65,
      'mining': 70,
      'manufacturing': 55,
      'electricity': 45,
      'water': 40,
      'construction': 60,
      'retail': 60,
      'transport': 55,
      'hospitality': 70,
      'tech': 45,
      'finance': 40,
      'realestate': 50,
      'professional': 45,
      'administrative': 50,
      'public': 30,
      'education': 35,
      'healthcare': 40,
      'culture': 65,
      'services': 50,
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

            <CalculatorForm
              currentRevenue={currentRevenue}
              setCurrentRevenue={setCurrentRevenue}
              growthRate={growthRate}
              setGrowthRate={setGrowthRate}
              industry={industry}
              setIndustry={setIndustry}
              employees={employees}
              setEmployees={setEmployees}
              marketVolatility={marketVolatility}
              setMarketVolatility={setMarketVolatility}
              competition={competition}
              setCompetition={setCompetition}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              phone={phone}
              setPhone={setPhone}
              company={company}
              setCompany={setCompany}
              deliveryMethod={deliveryMethod}
              setDeliveryMethod={setDeliveryMethod}
              messenger={messenger}
              setMessenger={setMessenger}
              onCalculate={calculateForecast}
            />

            {forecast && (
              <>
                <RiskAnalysis risks={forecast.risks} />
                <ForecastScenarios
                  optimistic={forecast.optimistic}
                  base={forecast.base}
                  pessimistic={forecast.pessimistic}
                />
                <StrategyRecommendations recommendations={forecast.recommendations} />
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