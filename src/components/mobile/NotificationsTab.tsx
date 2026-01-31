import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const NotificationsTab = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Уведомления и отчеты</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/notification-settings')}
          >
            <Icon name="Settings" size={16} className="mr-1" />
            Настройки
          </Button>
        </div>
        
        <div className="space-y-3">
          {[
            { type: 'urgent', title: 'Срок сдачи декларации', desc: 'До 5 февраля осталось 5 дней', icon: 'AlertCircle', color: 'red' },
            { type: 'warning', title: 'Налоговый платеж', desc: 'Платеж на 125 000 ₽ до 10 февраля', icon: 'Clock', color: 'orange' },
            { type: 'info', title: 'Задолженность клиента', desc: 'ООО "Агро-Плюс" - 45 000 ₽', icon: 'Info', color: 'blue' },
            { type: 'success', title: 'Отчет готов', desc: 'Финансовый отчет за январь готов к просмотру', icon: 'CheckCircle', color: 'green' },
          ].map((notif, idx) => (
            <Card key={idx} className={`p-4 border-l-4 border-l-${notif.color}-500`}>
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-full bg-${notif.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <Icon name={notif.icon} size={20} className={`text-${notif.color}-600`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-1">{notif.title}</h3>
                  <p className="text-sm text-muted-foreground">{notif.desc}</p>
                </div>
                <Button variant="ghost" size="sm">
                  <Icon name="ChevronRight" size={18} />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default NotificationsTab;
