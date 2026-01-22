import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface RiskCategory {
  name: string;
  level: number;
  description: string;
  icon: string;
}

interface RiskAssessment {
  overall: number;
  categories: RiskCategory[];
}

interface RiskAnalysisProps {
  risks: RiskAssessment;
}

const RiskAnalysis = ({ risks }: RiskAnalysisProps) => {
  const getRiskColor = (level: number) => {
    if (level > 70) return 'text-red-500';
    if (level > 40) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
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
            <p className={`text-4xl font-bold ${getRiskColor(risks.overall)}`}>
              {risks.overall}%
            </p>
          </div>
          <div className="w-24 h-24 rounded-full border-8 flex items-center justify-center"
            style={{ borderColor: risks.overall > 70 ? '#ef4444' : risks.overall > 40 ? '#eab308' : '#22c55e' }}>
            <Icon name="AlertTriangle" size={32} className={getRiskColor(risks.overall)} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {risks.categories.map((risk, index) => (
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
  );
};

export default RiskAnalysis;
