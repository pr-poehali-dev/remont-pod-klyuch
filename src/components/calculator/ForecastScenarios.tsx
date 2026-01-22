import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ScenarioData {
  month: number;
  year: number;
  fiveYears: number;
}

interface ForecastScenariosProps {
  optimistic: ScenarioData;
  base: ScenarioData;
  pessimistic: ScenarioData;
}

const ForecastScenarios = ({ optimistic, base, pessimistic }: ForecastScenariosProps) => {
  return (
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
                  {optimistic.month.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <p className="text-sm text-muted-foreground mb-1">1 год</p>
                <p className="text-2xl font-bold text-green-600">
                  {optimistic.year.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-green-500/5 rounded-lg border border-green-500/20">
                <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                <p className="text-2xl font-bold text-green-600">
                  {optimistic.fiveYears.toLocaleString('ru-RU')} ₽
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
                  {base.month.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">1 год</p>
                <p className="text-2xl font-bold text-primary">
                  {base.year.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                <p className="text-2xl font-bold text-primary">
                  {base.fiveYears.toLocaleString('ru-RU')} ₽
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
                  {pessimistic.month.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <p className="text-sm text-muted-foreground mb-1">1 год</p>
                <p className="text-2xl font-bold text-red-600">
                  {pessimistic.year.toLocaleString('ru-RU')} ₽
                </p>
              </div>
              <div className="p-4 bg-red-500/5 rounded-lg border border-red-500/20">
                <p className="text-sm text-muted-foreground mb-1">5 лет</p>
                <p className="text-2xl font-bold text-red-600">
                  {pessimistic.fiveYears.toLocaleString('ru-RU')} ₽
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
  );
};

export default ForecastScenarios;
