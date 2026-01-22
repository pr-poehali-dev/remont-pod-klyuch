import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Recommendation {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  icon: string;
}

interface StrategyRecommendationsProps {
  recommendations: Recommendation[];
}

const StrategyRecommendations = ({ recommendations }: StrategyRecommendationsProps) => {
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
    <Card className="border-2 border-accent animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Icon name="Lightbulb" className="text-accent" />
          Рекомендации по стратегии
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
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
  );
};

export default StrategyRecommendations;
