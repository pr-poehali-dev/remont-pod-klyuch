import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';

interface BusinessMetricsSectionProps {
  currentRevenue: number[];
  setCurrentRevenue: (value: number[]) => void;
  growthRate: number[];
  setGrowthRate: (value: number[]) => void;
  industry: string;
  setIndustry: (value: string) => void;
  employees: number[];
  setEmployees: (value: number[]) => void;
}

const BusinessMetricsSection = ({
  currentRevenue,
  setCurrentRevenue,
  growthRate,
  setGrowthRate,
  industry,
  setIndustry,
  employees,
  setEmployees,
}: BusinessMetricsSectionProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Текущая месячная выручка
          </Label>
          <div className="flex gap-3 items-center">
            <Slider
              value={currentRevenue}
              onValueChange={setCurrentRevenue}
              min={0}
              max={100000000}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={currentRevenue[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100000000, Number(e.target.value) || 0));
                setCurrentRevenue([val]);
              }}
              className="w-32"
              min={0}
              max={100000000}
              step={1}
            />
            <span className="text-sm text-muted-foreground">₽</span>
          </div>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Ожидаемый темп роста
          </Label>
          <div className="flex gap-3 items-center">
            <Slider
              value={growthRate}
              onValueChange={setGrowthRate}
              min={-100}
              max={500}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={growthRate[0]}
              onChange={(e) => {
                const val = Math.max(-100, Math.min(500, Number(e.target.value) || 10));
                setGrowthRate([val]);
              }}
              className="w-24"
              min={-100}
              max={500}
              step={1}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Label htmlFor="industry" className="text-base font-semibold">Отрасль (ОКВЭД)</Label>
          <Select value={industry} onValueChange={setIndustry}>
            <SelectTrigger id="industry">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[500px]">
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase">А - Сельское хозяйство</div>
              <SelectItem value="agriculture_crop">01.1 - Растениеводство (зерно, овощи, фрукты)</SelectItem>
              <SelectItem value="agriculture_animal">01.2-01.4 - Животноводство (скот, птица, молоко)</SelectItem>
              <SelectItem value="agriculture_mixed">01.5 - Смешанное сельское хозяйство</SelectItem>
              <SelectItem value="agriculture_service">01.6 - Агросервис (обработка земли, сбор урожая)</SelectItem>
              <SelectItem value="forestry">02 - Лесоводство и лесозаготовки</SelectItem>
              <SelectItem value="fishing">03 - Рыболовство и рыбоводство</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">B - Добыча</div>
              <SelectItem value="mining_coal">05 - Добыча угля</SelectItem>
              <SelectItem value="mining_oil">06 - Добыча нефти и газа</SelectItem>
              <SelectItem value="mining_metal">07 - Добыча металлических руд</SelectItem>
              <SelectItem value="mining_other">08 - Добыча прочих полезных ископаемых</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">C - Производство</div>
              <SelectItem value="manufacturing_food">10-11 - Пищевые продукты и напитки</SelectItem>
              <SelectItem value="manufacturing_textile">13-15 - Текстиль, одежда, кожа</SelectItem>
              <SelectItem value="manufacturing_wood">16 - Обработка древесины, мебель</SelectItem>
              <SelectItem value="manufacturing_paper">17-18 - Бумага, полиграфия, издательства</SelectItem>
              <SelectItem value="manufacturing_chemical">19-22 - Химия, фармацевтика, пластик</SelectItem>
              <SelectItem value="manufacturing_metal">24-25 - Металлургия и металлоизделия</SelectItem>
              <SelectItem value="manufacturing_electronics">26-27 - Электроника и электрооборудование</SelectItem>
              <SelectItem value="manufacturing_machinery">28 - Машины и оборудование</SelectItem>
              <SelectItem value="manufacturing_vehicles">29-30 - Транспортные средства</SelectItem>
              <SelectItem value="manufacturing_other">31-33 - Прочие производства, ремонт</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">D - Энергетика</div>
              <SelectItem value="electricity">35 - Электро-, газо-, паро-, теплоснабжение</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">E - Водоснабжение</div>
              <SelectItem value="water">36-39 - Вода, канализация, утилизация отходов</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">F - Строительство</div>
              <SelectItem value="construction_buildings">41 - Строительство зданий</SelectItem>
              <SelectItem value="construction_civil">42 - Строительство инженерных сооружений</SelectItem>
              <SelectItem value="construction_special">43 - Специализированные строительные работы</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">G - Торговля</div>
              <SelectItem value="retail_auto">45 - Торговля и ремонт автомобилей</SelectItem>
              <SelectItem value="retail_wholesale">46 - Оптовая торговля</SelectItem>
              <SelectItem value="retail_store">47 - Розничная торговля в магазинах</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">H - Транспорт</div>
              <SelectItem value="transport_land">49 - Сухопутный транспорт (авто, жд)</SelectItem>
              <SelectItem value="transport_water">50 - Водный транспорт</SelectItem>
              <SelectItem value="transport_air">51 - Воздушный транспорт</SelectItem>
              <SelectItem value="transport_warehouse">52 - Складское хозяйство, логистика</SelectItem>
              <SelectItem value="transport_postal">53 - Почта и курьерская деятельность</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">I - Гостиницы и питание</div>
              <SelectItem value="hospitality_hotel">55 - Гостиницы и проживание</SelectItem>
              <SelectItem value="hospitality_food">56 - Рестораны, кафе, общепит</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">J - IT и связь</div>
              <SelectItem value="tech_publishing">58 - Издательская деятельность</SelectItem>
              <SelectItem value="tech_media">59-60 - Кино, ТВ, радио</SelectItem>
              <SelectItem value="tech_telecom">61 - Телекоммуникации</SelectItem>
              <SelectItem value="tech_it">62-63 - IT-услуги, разработка ПО, веб</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">K - Финансы</div>
              <SelectItem value="finance_banking">64 - Банки и финансы</SelectItem>
              <SelectItem value="finance_insurance">65 - Страхование</SelectItem>
              <SelectItem value="finance_investment">66 - Инвестиции, управление фондами</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">L - Недвижимость</div>
              <SelectItem value="realestate_operations">68 - Операции с недвижимостью, аренда</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">M - Профессиональные услуги</div>
              <SelectItem value="professional_legal">69 - Юридические и бухгалтерские услуги</SelectItem>
              <SelectItem value="professional_management">70 - Управление компаниями, консалтинг</SelectItem>
              <SelectItem value="professional_architecture">71 - Архитектура, инженерия, техиспытания</SelectItem>
              <SelectItem value="professional_research">72 - Научные исследования и разработки</SelectItem>
              <SelectItem value="professional_advertising">73 - Реклама и маркетинг</SelectItem>
              <SelectItem value="professional_design">74 - Дизайн, фотография, переводы</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">N - Администрирование</div>
              <SelectItem value="administrative_rental">77 - Аренда и лизинг</SelectItem>
              <SelectItem value="administrative_employment">78 - Трудоустройство и подбор персонала</SelectItem>
              <SelectItem value="administrative_travel">79 - Туристические агентства</SelectItem>
              <SelectItem value="administrative_security">80-82 - Охрана, уборка, прочие услуги</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">O - Госуправление</div>
              <SelectItem value="public">84 - Государственное управление</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">P - Образование</div>
              <SelectItem value="education_preschool">85.1 - Дошкольное образование</SelectItem>
              <SelectItem value="education_school">85.2 - Школьное образование</SelectItem>
              <SelectItem value="education_higher">85.3-85.4 - Высшее и профобразование</SelectItem>
              <SelectItem value="education_additional">85.5 - Доп. образование (курсы, тренинги)</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">Q - Здравоохранение</div>
              <SelectItem value="healthcare_hospital">86 - Медицинские услуги, клиники</SelectItem>
              <SelectItem value="healthcare_social">87-88 - Социальные услуги, уход</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">R - Культура и спорт</div>
              <SelectItem value="culture_creative">90 - Театры, музеи, концерты</SelectItem>
              <SelectItem value="culture_gambling">92 - Азартные игры и тотализаторы</SelectItem>
              <SelectItem value="culture_sports">93 - Спорт, фитнес, развлечения</SelectItem>
              
              <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase mt-2">S - Прочие услуги</div>
              <SelectItem value="services_repair">95 - Ремонт компьютеров, бытовых изделий</SelectItem>
              <SelectItem value="services_personal">96 - Салоны красоты, прачечные, прочее</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Количество сотрудников
          </Label>
          <div className="flex gap-3 items-center">
            <Slider
              value={employees}
              onValueChange={setEmployees}
              min={1}
              max={500}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={employees[0]}
              onChange={(e) => {
                const val = Math.max(1, Math.min(500, Number(e.target.value) || 1));
                setEmployees([val]);
              }}
              className="w-24"
              min={1}
              max={500}
              step={1}
            />
            <span className="text-sm text-muted-foreground w-8">чел</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessMetricsSection;
