import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MobileApp = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('scanner');
  const [agentId, setAgentId] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('user_token');
    const agent = localStorage.getItem('agent_id');
    
    if (!token) {
      navigate('/mobile-login');
      return;
    }
    
    setAgentId(agent);
  }, [navigate]);

  const [messages, setMessages] = useState<Array<{role: string, text: string, time: string}>>([
    { role: 'agent', text: 'Здравствуйте! Я ваш личный бухгалтерский помощник. Чем могу помочь?', time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'}) }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const navigationItems = [
    { id: 'scanner', label: 'Сканер', icon: 'Scan' },
    { id: 'operations', label: 'Операции', icon: 'FileText' },
    { id: 'notifications', label: 'Уведомления', icon: 'Bell' },
    { id: 'ai-chat', label: 'ИИ-помощник', icon: 'Bot' },
    { id: 'analytics', label: 'Аналитика', icon: 'TrendingUp' },
    { id: 'storage', label: 'Хранилище', icon: 'Cloud' },
  ];

  const getSmartResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('усн') || msg.includes('упрощенка')) {
      return 'УСН (упрощенная система налогообложения) — это специальный налоговый режим для малого бизнеса. Основные плюсы: простая отчетность, низкая налоговая нагрузка (6% с доходов или 15% с разницы доходы-расходы). Декларацию нужно сдавать раз в год до 25 апреля. Если нужна помощь с выбором объекта налогообложения — спрашивайте!';
    }
    
    if (msg.includes('ндс') || msg.includes('нтс')) {
      return 'НДС (налог на добавленную стоимость) — это косвенный налог 20%. Если вы на УСН, то освобождены от НДС. Но если работаете с крупными компаниями, они могут требовать НДС для вычета. Декларация по НДС сдается ежеквартально до 25 числа следующего месяца.';
    }
    
    if (msg.includes('зерно') || msg.includes('фгис')) {
      return 'ФГИС Зерно — обязательная система для учета зерна и продуктов его переработки. Все операции (приемка, отгрузка, хранение) должны регистрироваться в системе в течение 3 рабочих дней. Штраф за неподачу данных — до 500 000 руб. Нужна помощь с регистрацией?';
    }
    
    if (msg.includes('срок') || msg.includes('отчет')) {
      return 'Основные сроки сдачи отчетности в 2026:\n• УСН декларация — до 25 апреля\n• 6-НДФЛ — ежеквартально до 25 числа\n• РСВ (пенсионный фонд) — до 25 числа месяца\n• Бухгалтерская отчетность — до 31 марта\n• НДС — до 25 числа следующего квартала\n\nКакой отчет вас интересует?';
    }
    
    if (msg.includes('субсиди') || msg.includes('грант')) {
      return 'Для аграриев доступны субсидии на:\n• Приобретение техники (до 50% стоимости)\n• Развитие растениеводства\n• Поддержку КФХ (гранты до 3 млн руб)\n• Молодым фермерам (до 5 млн руб)\n\nДля получения нужны: бизнес-план, документы на землю, справка из налоговой. Могу помочь с подготовкой документов!';
    }
    
    if (msg.includes('зарплат') || msg.includes('взнос')) {
      return 'Страховые взносы с зарплаты в 2026:\n• ПФР — 22%\n• ОМС — 5,1%\n• ФСС — 2,9%\n• Травматизм — 0,2-8,5%\n\nИтого около 30% сверху зарплаты. Если зарплата превышает лимит (2 225 000 руб), ставки снижаются. НДФЛ 13% удерживается из зарплаты работника.';
    }
    
    if (msg.includes('оптимизац') || msg.includes('налог')) {
      return 'Легальные способы оптимизации налогов:\n• Выбор правильной системы налогообложения (УСН, патент)\n• Учет всех расходов на УСН 15%\n• Использование налоговых вычетов\n• Грамотное планирование крупных расходов\n• Применение пониженных ставок для льготных категорий\n\nВажно: избегайте серых схем — штрафы сейчас очень высокие!';
    }

    return `Спасибо за вопрос! Я специализируюсь на бухгалтерии для аграриев и малого бизнеса. Могу помочь с:\n• Налогами (УСН, НДС, ЕСХН)\n• Отчетностью и сроками\n• ФГИС Зерно и Меркурий\n• Субсидиями и грантами\n• Зарплатой и взносами\n• Оптимизацией налогов\n\nУточните ваш вопрос, и я дам подробный ответ!`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      role: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const agentResponse = {
        role: 'agent',
        text: getSmartResponse(currentMessage),
        time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
      };
      setMessages(prev => [...prev, agentResponse]);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="sticky top-0 z-40 bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Briefcase" size={28} className="text-white" />
              <div>
                <h1 className="text-xl font-bold">БухКонтроль</h1>
                <p className="text-xs opacity-90">Мобильное приложение для аграриев</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20">
              <Icon name="Settings" size={20} />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-6 w-full mb-6">
            {navigationItems.map((item) => (
              <TabsTrigger key={item.id} value={item.id} className="flex flex-col gap-1 py-3">
                <Icon name={item.icon} size={20} />
                <span className="text-xs">{item.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="scanner" className="space-y-4">
            <Card className="p-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-32 h-32 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Scan" size={64} className="text-primary" />
                </div>
                <h2 className="text-2xl font-bold">Сканирование документов</h2>
                <p className="text-muted-foreground">
                  Быстрая обработка накладных, счетов-фактур и актов
                </p>
                <div className="flex flex-col gap-3 pt-4">
                  <Button size="lg" className="w-full">
                    <Icon name="Camera" size={20} className="mr-2" />
                    Сканировать документ
                  </Button>
                  <Button size="lg" variant="outline" className="w-full">
                    <Icon name="Upload" size={20} className="mr-2" />
                    Загрузить из галереи
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Icon name="History" size={18} />
                Последние сканы
              </h3>
              <div className="space-y-2">
                {[
                  { name: 'Накладная №1234', date: '30.01.2026', status: 'processed' },
                  { name: 'Счет-фактура №567', date: '29.01.2026', status: 'processing' },
                  { name: 'Акт выполненных работ', date: '28.01.2026', status: 'processed' },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-accent rounded-lg">
                    <div className="flex items-center gap-3">
                      <Icon name="FileText" size={20} className="text-primary" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">{doc.date}</p>
                      </div>
                    </div>
                    <Badge variant={doc.status === 'processed' ? 'default' : 'secondary'}>
                      {doc.status === 'processed' ? 'Обработан' : 'В обработке'}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
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
          </TabsContent>

          <TabsContent value="ai-chat" className="space-y-4">
            <Card className="p-6 h-[calc(100vh-240px)] flex flex-col">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <Icon name="Bot" size={24} className="text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold">ИИ-помощник</h2>
                  <p className="text-xs text-muted-foreground">Ваш персональный бухгалтер</p>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'agent' ? 'bg-primary' : 'bg-accent'
                    }`}>
                      <Icon name={msg.role === 'agent' ? 'Bot' : 'User'} size={16} className="text-white" />
                    </div>
                    <div className={`flex-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      <div className={`inline-block p-3 rounded-lg ${
                        msg.role === 'agent' 
                          ? 'bg-accent text-left' 
                          : 'bg-primary text-white text-left'
                      }`}>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{msg.time}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim()}>
                  <Icon name="Send" size={20} />
                </Button>
              </div>

              <div className="mt-4 p-3 bg-blue-50 rounded-lg text-xs text-blue-900">
                <Icon name="Info" size={14} className="inline mr-1" />
                Демо-режим. В полной версии ИИ запоминает вашу историю и использует YandexGPT
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="consultant" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Онлайн-консультант</h2>
              
              <Card className="p-4 bg-primary/5 mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                    <Icon name="User" size={24} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Елена Иванова</h3>
                    <p className="text-sm text-muted-foreground">Главный бухгалтер</p>
                    <div className="flex items-center gap-1 mt-1">
                      <div className="w-2 h-2 rounded-full bg-green-500"></div>
                      <span className="text-xs text-green-600">Онлайн</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button className="flex-1">
                    <Icon name="MessageCircle" size={18} className="mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Icon name="Phone" size={18} className="mr-2" />
                    Позвонить
                  </Button>
                </div>
              </Card>

              <div className="space-y-3">
                <h3 className="font-semibold text-sm">Последние обращения</h3>
                {[
                  { question: 'Вопрос по НДС', date: '30.01.2026', status: 'answered' },
                  { question: 'Субсидии для фермеров', date: '28.01.2026', status: 'answered' },
                  { question: 'Оптимизация налогов', date: '25.01.2026', status: 'pending' },
                ].map((q, idx) => (
                  <Card key={idx} className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{q.question}</p>
                        <p className="text-xs text-muted-foreground mt-1">{q.date}</p>
                      </div>
                      <Badge variant={q.status === 'answered' ? 'default' : 'secondary'}>
                        {q.status === 'answered' ? 'Отвечено' : 'Ожидает'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Аналитика и прогнозы</h2>
              
              <Card className="p-4 bg-gradient-to-br from-primary/10 to-accent/10 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Чистая прибыль</span>
                  <Icon name="TrendingUp" size={18} className="text-green-600" />
                </div>
                <p className="text-3xl font-bold mb-1">₽ 630 000</p>
                <p className="text-sm text-green-600">+22% к прошлому месяцу</p>
              </Card>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="Wallet" size={18} className="text-primary" />
                    <span className="text-xs font-medium">Рентабельность</span>
                  </div>
                  <p className="text-2xl font-bold">34.6%</p>
                </Card>
                
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon name="PieChart" size={18} className="text-primary" />
                    <span className="text-xs font-medium">Рост за год</span>
                  </div>
                  <p className="text-2xl font-bold">+18%</p>
                </Card>
              </div>

              <Card className="p-4 bg-blue-50 border-blue-200">
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Icon name="Sparkles" size={18} className="text-blue-600" />
                  <span>Прогноз на следующий месяц</span>
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ожидаемые доходы</span>
                    <span className="font-bold text-green-600">₽ 2 800 000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Планируемые расходы</span>
                    <span className="font-bold text-red-600">₽ 1 950 000</span>
                  </div>
                  <div className="h-px bg-border my-2"></div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Прогнозная прибыль</span>
                    <span className="font-bold text-primary">₽ 850 000</span>
                  </div>
                </div>
              </Card>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Облачное хранилище</h2>
              
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Использовано</p>
                    <p className="text-2xl font-bold">2.4 ГБ</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Всего</p>
                    <p className="text-2xl font-bold">10 ГБ</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary rounded-full h-2" style={{ width: '24%' }}></div>
                </div>
              </Card>

              <div className="flex gap-2 mb-6">
                <Button className="flex-1">
                  <Icon name="Upload" size={18} className="mr-2" />
                  Загрузить
                </Button>
                <Button variant="outline" className="flex-1">
                  <Icon name="FolderPlus" size={18} className="mr-2" />
                  Новая папка
                </Button>
              </div>

              <div className="space-y-2">
                {[
                  { name: 'Налоговые декларации', files: 24, size: '156 МБ', icon: 'FileText' },
                  { name: 'Договоры', files: 18, size: '89 МБ', icon: 'FileCheck' },
                  { name: 'Счета и накладные', files: 156, size: '1.2 ГБ', icon: 'Receipt' },
                  { name: 'Акты выполненных работ', files: 42, size: '340 МБ', icon: 'File' },
                ].map((folder, idx) => (
                  <Card key={idx} className="p-4 hover:bg-accent cursor-pointer transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon name={folder.icon} size={24} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{folder.name}</p>
                          <p className="text-xs text-muted-foreground">{folder.files} файлов • {folder.size}</p>
                        </div>
                      </div>
                      <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileApp;