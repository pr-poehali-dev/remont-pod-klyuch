import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ScannerTab from '@/components/mobile/ScannerTab';
import OperationsTab from '@/components/mobile/OperationsTab';
import NotificationsTab from '@/components/mobile/NotificationsTab';
import { AIChatTab, getSmartResponse, type Message } from '@/components/mobile/AIChatTab';

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

  const [messages, setMessages] = useState<Message[]>([
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

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      role: 'user',
      text: inputMessage,
      time: new Date().toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})
    };

    setMessages(prev => [...prev, userMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');

    setTimeout(() => {
      const agentResponse: Message = {
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

          <TabsContent value="scanner">
            <ScannerTab />
          </TabsContent>

          <TabsContent value="operations">
            <OperationsTab />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="ai-chat">
            <AIChatTab 
              messages={messages}
              inputMessage={inputMessage}
              onInputChange={setInputMessage}
              onSendMessage={handleSendMessage}
            />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Аналитика и статистика</h2>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Icon name="TrendingUp" size={64} className="mx-auto text-primary mb-4" />
                  <p className="text-muted-foreground">
                    Раздел в разработке. Скоро здесь будут графики и отчёты.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="storage" className="space-y-4">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4">Облачное хранилище</h2>
              <div className="space-y-4">
                <div className="text-center py-8">
                  <Icon name="Cloud" size={64} className="mx-auto text-primary mb-4" />
                  <p className="text-muted-foreground">
                    Раздел в разработке. Здесь будут все ваши документы.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MobileApp;
