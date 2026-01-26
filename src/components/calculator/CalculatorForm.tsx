import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import BusinessMetricsSection from './BusinessMetricsSection';
import RiskParametersSection from './RiskParametersSection';
import ContactInformationSection from './ContactInformationSection';

interface CalculatorFormProps {
  currentRevenue: number[];
  setCurrentRevenue: (value: number[]) => void;
  growthRate: number[];
  setGrowthRate: (value: number[]) => void;
  industry: string;
  setIndustry: (value: string) => void;
  employees: number[];
  setEmployees: (value: number[]) => void;
  debtLoad: string;
  setDebtLoad: (value: string) => void;
  supplierDependency: number[];
  setSupplierDependency: (value: number[]) => void;
  seasonality: number[];
  setSeasonality: (value: number[]) => void;
  revenueDiversification: number[];
  setRevenueDiversification: (value: number[]) => void;
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
  messenger: string;
  setMessenger: (value: string) => void;
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
  debtLoad,
  setDebtLoad,
  supplierDependency,
  setSupplierDependency,
  seasonality,
  setSeasonality,
  revenueDiversification,
  setRevenueDiversification,
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  company,
  setCompany,
  city,
  setCity,
  deliveryMethod,
  setDeliveryMethod,
  messenger,
  setMessenger,
  onCalculate
}: CalculatorFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Параметры бизнеса</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <BusinessMetricsSection
          currentRevenue={currentRevenue}
          setCurrentRevenue={setCurrentRevenue}
          growthRate={growthRate}
          setGrowthRate={setGrowthRate}
          industry={industry}
          setIndustry={setIndustry}
          employees={employees}
          setEmployees={setEmployees}
        />

        <RiskParametersSection
          debtLoad={debtLoad}
          setDebtLoad={setDebtLoad}
          supplierDependency={supplierDependency}
          setSupplierDependency={setSupplierDependency}
          seasonality={seasonality}
          setSeasonality={setSeasonality}
          revenueDiversification={revenueDiversification}
          setRevenueDiversification={setRevenueDiversification}
        />

        <ContactInformationSection
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
          phone={phone}
          setPhone={setPhone}
          company={company}
          setCompany={setCompany}
          city={city}
          setCity={setCity}
          deliveryMethod={deliveryMethod}
          setDeliveryMethod={setDeliveryMethod}
          messenger={messenger}
          setMessenger={setMessenger}
        />

        <Button onClick={onCalculate} size="lg" className="w-full text-lg">
          <Icon name="Calculator" className="mr-2" size={20} />
          Рассчитать прогноз и отправить результат
        </Button>
        
        <p className="text-xs text-center text-muted-foreground">
          Нажимая кнопку, вы соглашаетесь на обработку персональных данных
        </p>
      </CardContent>
    </Card>
  );
};

export default CalculatorForm;