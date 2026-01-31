import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const OperationsTab = () => {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Учет операций</h2>
          <Button size="sm">
            <Icon name="Plus" size={16} className="mr-1" />
            Добавить
          </Button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2 text-green-700 mb-2">
              <Icon name="ArrowDown" size={18} />
              <span className="text-sm font-medium">Доходы</span>
            </div>
            <p className="text-2xl font-bold text-green-700">₽ 2 450 000</p>
            <p className="text-xs text-green-600 mt-1">+15% к прошлому месяцу</p>
          </Card>
          
          <Card className="p-4 bg-red-50 border-red-200">
            <div className="flex items-center gap-2 text-red-700 mb-2">
              <Icon name="ArrowUp" size={18} />
              <span className="text-sm font-medium">Расходы</span>
            </div>
            <p className="text-2xl font-bold text-red-700">₽ 1 820 000</p>
            <p className="text-xs text-red-600 mt-1">+8% к прошлому месяцу</p>
          </Card>
        </div>

        <div className="space-y-3">
          <h3 className="font-semibold text-sm">Последние операции</h3>
          {[
            { type: 'income', name: 'Продажа зерна', amount: 450000, date: '30.01.2026' },
            { type: 'expense', name: 'Закупка удобрений', amount: -125000, date: '29.01.2026' },
            { type: 'income', name: 'Субсидия', amount: 300000, date: '28.01.2026' },
            { type: 'expense', name: 'Зарплата сотрудников', amount: -580000, date: '27.01.2026' },
          ].map((op, idx) => (
            <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  op.type === 'income' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  <Icon 
                    name={op.type === 'income' ? 'TrendingUp' : 'TrendingDown'} 
                    size={18} 
                    className={op.type === 'income' ? 'text-green-600' : 'text-red-600'}
                  />
                </div>
                <div>
                  <p className="font-medium text-sm">{op.name}</p>
                  <p className="text-xs text-muted-foreground">{op.date}</p>
                </div>
              </div>
              <p className={`font-bold ${op.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                {op.amount > 0 ? '+' : ''}{op.amount.toLocaleString('ru-RU')} ₽
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OperationsTab;
