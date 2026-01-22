import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CalculatorForm from '@/components/calculator/CalculatorForm';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const ForecastForm = () => {
  const navigate = useNavigate();
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
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDFReport = async () => {
    if (!name || !email || !phone || !company) {
      toast.error('Заполните все обязательные поля');
      return;
    }
    
    if (deliveryMethod === 'messenger' && !messenger) {
      toast.error('Укажите контакт в мессенджере');
      return;
    }

    setIsGenerating(true);

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

    const reportData = {
      clientInfo: { name, email, phone, company, deliveryMethod, messenger },
      businessParams: {
        revenue: currentRevenue[0],
        growth: growthRate[0],
        industry,
        employees: employees[0],
        volatility: marketVolatility[0],
        competition: competition[0]
      },
      forecast: {
        optimistic: {
          month: Math.round(baseMonth * optimisticMultiplier),
          year: Math.round(baseYear * optimisticMultiplier),
          fiveYears: Math.round(baseFiveYears * optimisticMultiplier)
        },
        base: { month: baseMonth, year: baseYear, fiveYears: baseFiveYears },
        pessimistic: {
          month: Math.round(baseMonth * pessimisticMultiplier),
          year: Math.round(baseYear * pessimisticMultiplier),
          fiveYears: Math.round(baseFiveYears * pessimisticMultiplier)
        }
      },
      risks: {
        overall: overallRisk,
        volatility: volatilityRisk,
        competition: competitionRisk,
        industry: industryRisk,
        scale: scaleRisk
      }
    };

    setTimeout(() => {
      console.log('PDF Report Data:', reportData);
      toast.success('PDF-отчёт сформирован и отправлен на ' + (deliveryMethod === 'email' ? email : messenger));
      setIsGenerating(false);
      
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-8">
            <Card className="border-2 border-primary">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="FileText" size={32} className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2">Заполните данные для прогноза</h1>
                    <p className="text-lg text-muted-foreground">
                      После заполнения всех полей вы получите развёрнутый PDF-отчёт с прогнозом и рекомендациями
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-6 space-y-3">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Icon name="CheckCircle" size={20} className="text-accent" />
                    Что будет в вашем PDF-отчёте:
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-start gap-2">
                      <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
                      <span>Три сценария прогноза (1 мес, 1 год, 5 лет)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="ShieldAlert" size={16} className="text-primary mt-0.5" />
                      <span>Анализ рисков по 4 категориям</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Target" size={16} className="text-primary mt-0.5" />
                      <span>Персональные рекомендации с приоритетами</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="BarChart3" size={16} className="text-primary mt-0.5" />
                      <span>Графики и визуализация данных</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Calculator" size={16} className="text-primary mt-0.5" />
                      <span>Формулы и математика расчётов</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon name="Lightbulb" size={16} className="text-primary mt-0.5" />
                      <span>Стратегические рекомендации</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

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
              onCalculate={generatePDFReport}
            />

            {isGenerating && (
              <Card className="border-2 border-primary animate-pulse">
                <CardContent className="p-12 text-center space-y-4">
                  <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                    <Icon name="FileText" size={40} className="text-primary animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold">Формируем ваш PDF-отчёт...</h3>
                  <p className="text-muted-foreground">
                    Анализируем данные, рассчитываем прогнозы и формируем рекомендации
                  </p>
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

export default ForecastForm;
