import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import Icon from '@/components/ui/icon';

interface RiskParametersSectionProps {
  marketVolatility: number[];
  setMarketVolatility: (value: number[]) => void;
  competition: number[];
  setCompetition: (value: number[]) => void;
}

const RiskParametersSection = ({
  marketVolatility,
  setMarketVolatility,
  competition,
  setCompetition,
}: RiskParametersSectionProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-6">Параметры для оценки рисков</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Label className="text-base font-semibold">
              Волатильность рынка
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
          <div className="flex gap-3 items-center">
            <Slider
              value={marketVolatility}
              onValueChange={setMarketVolatility}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={marketVolatility[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setMarketVolatility([val]);
              }}
              className="w-24"
              min={0}
              max={100}
              step={1}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Насколько нестабилен ваш рынок
          </p>
        </div>

        <div className="space-y-4">
          <Label className="text-base font-semibold">
            Уровень конкуренции
          </Label>
          <div className="flex gap-3 items-center">
            <Slider
              value={competition}
              onValueChange={setCompetition}
              min={0}
              max={100}
              step={1}
              className="flex-1"
            />
            <Input
              type="number"
              value={competition[0]}
              onChange={(e) => {
                const val = Math.max(0, Math.min(100, Number(e.target.value) || 0));
                setCompetition([val]);
              }}
              className="w-24"
              min={0}
              max={100}
              step={1}
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Насколько конкурентна ваша ниша
          </p>
        </div>
      </div>
    </div>
  );
};

export default RiskParametersSection;
