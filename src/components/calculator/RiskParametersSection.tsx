import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';

interface RiskParametersSectionProps {
  debtLoad: string;
  setDebtLoad: (value: string) => void;
  supplierDependency: number[];
  setSupplierDependency: (value: number[]) => void;
  seasonality: number[];
  setSeasonality: (value: number[]) => void;
  revenueDiversification: number[];
  setRevenueDiversification: (value: number[]) => void;
}

const RiskParametersSection = ({
  debtLoad,
  setDebtLoad,
  supplierDependency,
  setSupplierDependency,
  seasonality,
  setSeasonality,
  revenueDiversification,
  setRevenueDiversification,
}: RiskParametersSectionProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-6">Параметры для оценки рисков</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Уровень долговой нагрузки */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">
              Уровень долговой нагрузки
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
                    <p className="font-semibold">Что это?</p>
                    <p className="text-sm">
                      Общая сумма ваших долгов и кредитов (займы, кредитные линии, лизинг оборудования).
                    </p>
                    <p className="text-sm">
                      Чем больше долг, тем выше финансовые риски и ежемесячная нагрузка на бизнес.
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      Если долгов нет — укажите 0
                    </p>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-3 items-center">
            <Input
              type="number"
              value={debtLoad}
              onChange={(e) => setDebtLoad(e.target.value)}
              placeholder="0"
              className="flex-1"
              min={0}
              step={10000}
            />
            <span className="text-sm text-muted-foreground whitespace-nowrap">₽</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Общая сумма долгов и кредитов
          </p>
        </div>

        {/* Зависимость от поставщиков */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">
              Зависимость от поставщиков
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
                    <p className="font-semibold">Что это?</p>
                    <p className="text-sm">
                      Насколько сильно вы зависите от ключевых поставщиков или партнеров.
                    </p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Низкая (0-30%):</strong> Много альтернативных поставщиков</p>
                      <p><strong>Средняя (30-70%):</strong> Есть основные поставщики, но можно заменить</p>
                      <p><strong>Высокая (70-100%):</strong> 1-2 поставщика, без них бизнес встанет</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-3 items-center">
            <Slider
              value={supplierDependency}
              onValueChange={setSupplierDependency}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
            <Input
              type="number"
              value={supplierDependency[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setSupplierDependency([val]);
              }}
              className="w-24"
              min={0}
              max={100}
              step={5}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Критичность основных поставщиков
          </p>
        </div>

        {/* Сезонность бизнеса */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">
              Сезонность бизнеса
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
                    <p className="font-semibold">Что это?</p>
                    <p className="text-sm">
                      Насколько сильно ваша выручка зависит от времени года или сезона.
                    </p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Низкая (0-30%):</strong> Стабильный доход круглый год</p>
                      <p><strong>Средняя (30-70%):</strong> Есть более и менее активные месяцы</p>
                      <p><strong>Высокая (70-100%):</strong> Основная выручка в 2-3 месяца (агро, туризм)</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-3 items-center">
            <Slider
              value={seasonality}
              onValueChange={setSeasonality}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
            <Input
              type="number"
              value={seasonality[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setSeasonality([val]);
              }}
              className="w-24"
              min={0}
              max={100}
              step={5}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Колебания дохода в течение года
          </p>
        </div>

        {/* Диверсификация доходов */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">
              Диверсификация доходов
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
                    <p className="font-semibold">Что это?</p>
                    <p className="text-sm">
                      Насколько распределены ваши источники дохода (продукты, клиенты, каналы продаж).
                    </p>
                    <div className="space-y-1 text-sm">
                      <p><strong>Низкая (0-30%):</strong> 1-2 продукта/клиента дают 80%+ выручки</p>
                      <p><strong>Средняя (30-70%):</strong> Несколько ключевых направлений</p>
                      <p><strong>Высокая (70-100%):</strong> Много продуктов, клиентов, каналов</p>
                    </div>
                  </div>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex gap-3 items-center">
            <Slider
              value={revenueDiversification}
              onValueChange={setRevenueDiversification}
              min={0}
              max={100}
              step={5}
              className="flex-1"
            />
            <Input
              type="number"
              value={revenueDiversification[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setRevenueDiversification([val]);
              }}
              className="w-24"
              min={0}
              max={100}
              step={5}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Разнообразие источников дохода
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskParametersSection;