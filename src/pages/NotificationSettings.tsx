import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';
import { 
  subscribeToPushNotifications, 
  unsubscribeFromPush, 
  checkPushPermission,
  requestPushPermission 
} from '@/utils/pushNotifications';

const NotificationSettings = () => {
  const { toast } = useToast();
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [notificationTypes, setNotificationTypes] = useState({
    taxDeadlines: true,
    reportReminders: true,
    documentUpdates: false,
    systemAlerts: true
  });

  useEffect(() => {
    checkNotificationStatus();
  }, []);

  const checkNotificationStatus = async () => {
    const perm = await checkPushPermission();
    setPermission(perm);
    
    if (perm === 'granted') {
      setIsSubscribed(true);
    }
  };

  const handleEnableNotifications = async () => {
    const perm = await requestPushPermission();
    setPermission(perm);

    if (perm === 'granted') {
      const success = await subscribeToPushNotifications();
      if (success) {
        setIsSubscribed(true);
        toast({
          title: 'Уведомления включены!',
          description: 'Теперь вы будете получать важные напоминания',
        });
      } else {
        toast({
          title: 'Ошибка',
          description: 'Не удалось подписаться на уведомления',
          variant: 'destructive'
        });
      }
    } else {
      toast({
        title: 'Доступ запрещен',
        description: 'Разрешите уведомления в настройках браузера',
        variant: 'destructive'
      });
    }
  };

  const handleDisableNotifications = async () => {
    const success = await unsubscribeFromPush();
    if (success) {
      setIsSubscribed(false);
      toast({
        title: 'Уведомления отключены',
        description: 'Вы больше не будете получать push-уведомления',
      });
    }
  };

  const getPermissionBadge = () => {
    switch (permission) {
      case 'granted':
        return <Badge className="bg-green-500">Разрешены</Badge>;
      case 'denied':
        return <Badge variant="destructive">Запрещены</Badge>;
      default:
        return <Badge variant="secondary">Не настроены</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container max-w-2xl mx-auto px-4">
        <div className="mb-6">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4">
            <Icon name="ArrowLeft" size={20} className="mr-2" />
            Назад
          </Button>
          <h1 className="text-3xl font-bold">Настройки уведомлений</h1>
          <p className="text-muted-foreground mt-2">
            Управляйте push-уведомлениями о налогах и отчётах
          </p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bell" size={24} />
                  Статус уведомлений
                </CardTitle>
                {getPermissionBadge()}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {permission === 'default' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900 mb-1">
                        Включите уведомления
                      </p>
                      <p className="text-sm text-blue-700 mb-3">
                        Получайте напоминания о сроках сдачи налоговой отчётности и важных событиях
                      </p>
                      <Button onClick={handleEnableNotifications} size="sm">
                        <Icon name="BellRing" size={16} className="mr-2" />
                        Разрешить уведомления
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {permission === 'denied' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <Icon name="AlertCircle" size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-red-900 mb-1">
                        Уведомления заблокированы
                      </p>
                      <p className="text-sm text-red-700">
                        Разрешите уведомления в настройках браузера, чтобы не пропустить важные сроки
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {permission === 'granted' && isSubscribed && (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex gap-3">
                      <Icon name="CheckCircle2" size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-green-900 mb-1">
                          Уведомления активны
                        </p>
                        <p className="text-sm text-green-700">
                          Вы будете получать напоминания о важных событиях
                        </p>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    onClick={handleDisableNotifications}
                    className="w-full"
                  >
                    <Icon name="BellOff" size={16} className="mr-2" />
                    Отключить уведомления
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Settings" size={24} />
                Типы уведомлений
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="tax-deadlines" className="text-base font-medium">
                    Налоговые сроки
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Напоминания о датах сдачи деклараций
                  </p>
                </div>
                <Switch
                  id="tax-deadlines"
                  checked={notificationTypes.taxDeadlines}
                  onCheckedChange={(checked) => 
                    setNotificationTypes(prev => ({ ...prev, taxDeadlines: checked }))
                  }
                  disabled={!isSubscribed}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="report-reminders" className="text-base font-medium">
                    Отчётность
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Напоминания о сроках сдачи отчётов
                  </p>
                </div>
                <Switch
                  id="report-reminders"
                  checked={notificationTypes.reportReminders}
                  onCheckedChange={(checked) => 
                    setNotificationTypes(prev => ({ ...prev, reportReminders: checked }))
                  }
                  disabled={!isSubscribed}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="document-updates" className="text-base font-medium">
                    Обновления документов
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Уведомления о новых документах
                  </p>
                </div>
                <Switch
                  id="document-updates"
                  checked={notificationTypes.documentUpdates}
                  onCheckedChange={(checked) => 
                    setNotificationTypes(prev => ({ ...prev, documentUpdates: checked }))
                  }
                  disabled={!isSubscribed}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="system-alerts" className="text-base font-medium">
                    Системные оповещения
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Важные обновления системы
                  </p>
                </div>
                <Switch
                  id="system-alerts"
                  checked={notificationTypes.systemAlerts}
                  onCheckedChange={(checked) => 
                    setNotificationTypes(prev => ({ ...prev, systemAlerts: checked }))
                  }
                  disabled={!isSubscribed}
                />
              </div>

              {!isSubscribed && (
                <p className="text-sm text-muted-foreground text-center pt-4">
                  Включите уведомления, чтобы настроить их типы
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="bg-accent/50">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Icon name="Lightbulb" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                <div className="space-y-2 text-sm">
                  <p className="font-medium">Полезная информация</p>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Уведомления приходят за 3 дня до срока</li>
                    <li>• Работают даже когда приложение закрыто</li>
                    <li>• Можно отключить в любой момент</li>
                    <li>• Доступны на Android и iOS</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
