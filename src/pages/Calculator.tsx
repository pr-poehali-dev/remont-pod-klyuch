import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import RiskAnalysis from '@/components/calculator/RiskAnalysis';
import ForecastScenarios from '@/components/calculator/ForecastScenarios';
import StrategyRecommendations from '@/components/calculator/StrategyRecommendations';
import ChecklistUploader from '@/components/calculator/ChecklistUploader';
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
  const [industry, setIndustry] = useState('retail_store');
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

  const handleChecklistData = (data: any) => {
    if (data.revenue) setCurrentRevenue([data.revenue]);
    if (data.growth) setGrowthRate([data.growth]);
    if (data.industry) setIndustry(data.industry);
    if (data.employees) setEmployees([data.employees]);
    if (data.volatility) setMarketVolatility([data.volatility]);
    if (data.competition) setCompetition([data.competition]);
    if (data.name) setName(data.name);
    if (data.email) setEmail(data.email);
    if (data.phone) setPhone(data.phone);
    if (data.company) setCompany(data.company);
  };

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
      'agriculture_crop': 0.85, 'agriculture_animal': 0.88, 'agriculture_mixed': 0.86, 'agriculture_service': 0.90, 'forestry': 0.82, 'fishing': 0.83,
      'mining_coal': 0.92, 'mining_oil': 0.98, 'mining_metal': 0.95, 'mining_other': 0.93,
      'manufacturing_food': 0.92, 'manufacturing_textile': 0.88, 'manufacturing_wood': 0.87, 'manufacturing_paper': 0.90, 'manufacturing_chemical': 0.95, 'manufacturing_metal': 0.93, 'manufacturing_electronics': 1.05, 'manufacturing_machinery': 0.94, 'manufacturing_vehicles': 0.91, 'manufacturing_other': 0.89,
      'electricity': 1.0,
      'water': 0.95,
      'construction_buildings': 1.08, 'construction_civil': 1.05, 'construction_special': 1.03,
      'retail_auto': 1.02, 'retail_wholesale': 1.0, 'retail_store': 0.98,
      'transport_land': 0.96, 'transport_water': 0.93, 'transport_air': 0.98, 'transport_warehouse': 0.97, 'transport_postal': 0.95,
      'hospitality_hotel': 1.12, 'hospitality_food': 1.08,
      'tech_publishing': 1.15, 'tech_media': 1.20, 'tech_telecom': 1.25, 'tech_it': 1.35,
      'finance_banking': 1.18, 'finance_insurance': 1.20, 'finance_investment': 1.25,
      'realestate_operations': 1.15,
      'professional_legal': 1.22, 'professional_management': 1.25, 'professional_architecture': 1.18, 'professional_research': 1.30, 'professional_advertising': 1.20, 'professional_design': 1.15,
      'administrative_rental': 1.0, 'administrative_employment': 1.05, 'administrative_travel': 0.95, 'administrative_security': 0.98,
      'public': 0.8,
      'education_preschool': 0.88, 'education_school': 0.85, 'education_higher': 0.92, 'education_additional': 1.05,
      'healthcare_hospital': 1.08, 'healthcare_social': 0.95,
      'culture_creative': 1.02, 'culture_gambling': 1.15, 'culture_sports': 1.08,
      'services_repair': 1.05, 'services_personal': 1.12,
    };

    const industryRisks: Record<string, number> = {
      'agriculture_crop': 68, 'agriculture_animal': 65, 'agriculture_mixed': 67, 'agriculture_service': 62, 'forestry': 70, 'fishing': 72,
      'mining_coal': 75, 'mining_oil': 70, 'mining_metal': 73, 'mining_other': 68,
      'manufacturing_food': 52, 'manufacturing_textile': 60, 'manufacturing_wood': 58, 'manufacturing_paper': 55, 'manufacturing_chemical': 50, 'manufacturing_metal': 56, 'manufacturing_electronics': 48, 'manufacturing_machinery': 54, 'manufacturing_vehicles': 58, 'manufacturing_other': 60,
      'electricity': 45,
      'water': 40,
      'construction_buildings': 62, 'construction_civil': 65, 'construction_special': 58,
      'retail_auto': 58, 'retail_wholesale': 55, 'retail_store': 62,
      'transport_land': 56, 'transport_water': 62, 'transport_air': 60, 'transport_warehouse': 52, 'transport_postal': 54,
      'hospitality_hotel': 72, 'hospitality_food': 68,
      'tech_publishing': 50, 'tech_media': 55, 'tech_telecom': 42, 'tech_it': 40,
      'finance_banking': 38, 'finance_insurance': 40, 'finance_investment': 45,
      'realestate_operations': 50,
      'professional_legal': 42, 'professional_management': 40, 'professional_architecture': 48, 'professional_research': 38, 'professional_advertising': 52, 'professional_design': 55,
      'administrative_rental': 48, 'administrative_employment': 50, 'administrative_travel': 65, 'administrative_security': 52,
      'public': 30,
      'education_preschool': 38, 'education_school': 32, 'education_higher': 35, 'education_additional': 45,
      'healthcare_hospital': 42, 'healthcare_social': 48,
      'culture_creative': 68, 'culture_gambling': 75, 'culture_sports': 60,
      'services_repair': 55, 'services_personal': 58,
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

            <ChecklistUploader onDataExtracted={handleChecklistData} />

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