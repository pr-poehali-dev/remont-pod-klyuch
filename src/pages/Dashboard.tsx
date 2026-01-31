import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { activationAPI, tasksAPI, taxReportsAPI, aiChatAPI } from '@/lib/api';

export default function Dashboard() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const [codes, setCodes] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [codesData, tasksData, reportsData, chatData] = await Promise.all([
        activationAPI.list().catch(() => []),
        tasksAPI.list({ status: 'pending', limit: 10 }).catch(() => []),
        taxReportsAPI.list({ status: 'upcoming' }).catch(() => []),
        aiChatAPI.getHistory(5).catch(() => [])
      ]);
      
      setCodes(codesData);
      setTasks(tasksData);
      setReports(reportsData);
      setChatHistory(chatData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const generateCode = async () => {
    setLoading(true);
    try {
      const newCode = await activationAPI.create();
      setCodes([newCode, ...codes]);
      toast({
        title: 'Код создан',
        description: `Ваш код активации: ${newCode.code}`,
      });
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось создать код активации. Войдите через Telegram.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim()) return;
    
    const userMessage = message;
    setMessage('');
    setLoading(true);
    
    try {
      const response = await aiChatAPI.send(userMessage);
      setChatHistory([...chatHistory, 
        { role: 'user', message: userMessage },
        { role: 'assistant', message: response.message }
      ]);
      
      if (response.task_created) {
        toast({
          title: 'Задача создана',
          description: 'Ваш запрос добавлен в список задач для бухгалтера',
        });
        await loadData();
      }
    } catch (error) {
      toast({
        title: 'Ошибка',
        description: 'Не удалось отправить сообщение. Войдите через Telegram.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-16 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Заголовок */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Личный кабинет</h1>
            <p className="text-gray-600">
              Управляйте активацией мобильного приложения и взаимодействуйте с AI-ассистентом
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Активация приложения */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Smartphone" size={24} />
                  Активация мобильного приложения
                </CardTitle>
                <CardDescription>
                  Создайте код для привязки мобильного устройства
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={generateCode} 
                  disabled={loading}
                  className="w-full gap-2"
                >
                  <Icon name="Plus" size={20} />
                  Создать новый код
                </Button>

                {codes.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Ваши коды активации:</h3>
                    {codes.map((code, index) => (
                      <div 
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
                      >
                        <div>
                          <div className="font-mono font-bold text-lg">{code.code}</div>
                          <div className="text-xs text-gray-500">
                            {code.used_at ? (
                              <span className="text-green-600">✓ Использован</span>
                            ) : (
                              <>Действует до {new Date(code.expires_at).toLocaleDateString()}</>
                            )}
                          </div>
                        </div>
                        {!code.used_at && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(code.code);
                              toast({ title: 'Скопировано' });
                            }}
                          >
                            <Icon name="Copy" size={16} />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-4 border-t">
                  <p className="text-sm text-gray-600 mb-3">
                    📱 Ещё не установили приложение?
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full gap-2" 
                    onClick={() => navigate('/mobile-app')}
                  >
                    <Icon name="Download" size={16} />
                    Скачать приложение
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* AI-ассистент */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Bot" size={24} />
                  AI-ассистент бухгалтера
                </CardTitle>
                <CardDescription>
                  Задайте вопрос или поставьте задачу вашему бухгалтеру
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Bot" size={16} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-700">
                          Здравствуйте! Я AI-помощник. Чем могу помочь?
                        </p>
                      </div>
                    </div>
                  </div>

                  {chatHistory.slice(-4).map((msg, idx) => (
                    <div key={idx} className={`p-3 rounded-lg ${
                      msg.role === 'user' ? 'bg-gray-100 ml-8' : 'bg-blue-50 mr-8'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                    </div>
                  ))}

                  <div className="flex gap-2">
                    <Input 
                      placeholder="Например: Мне нужен счёт на 50000 руб..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                      disabled={loading}
                    />
                    <Button onClick={sendMessage} disabled={loading}>
                      <Icon name="Send" size={20} />
                    </Button>
                  </div>

                  <div className="pt-4 border-t space-y-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase">
                      Быстрые команды:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {[
                        'Сформировать счёт',
                        'Когда сдавать НДС?',
                        'Нужна консультация',
                        'Проверить задачи'
                      ].map((cmd) => (
                        <Button 
                          key={cmd} 
                          variant="outline" 
                          size="sm"
                          className="text-xs"
                          onClick={() => setMessage(cmd)}
                          disabled={loading}
                        >
                          {cmd}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Дополнительные виджеты */}
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="FileText" size={20} />
                  Документы
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">-</div>
                <p className="text-sm text-gray-600">загруженных документов</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="ListTodo" size={20} />
                  Задачи
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{tasks.length}</div>
                <p className="text-sm text-gray-600">активных задач</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Icon name="Calendar" size={20} />
                  Отчёты
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold mb-2">{reports.length}</div>
                <p className="text-sm text-gray-600">предстоящих отчётов</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}