import { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface OcrData {
  amounts?: number[];
  dates?: string[];
  documentNumber?: string | null;
  documentType?: string | null;
  inn?: string | null;
  totalAmount?: number | null;
}

const Accounting = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [ocrData, setOcrData] = useState<OcrData | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setIsUploading(true);
    setOcrData(null);

    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        
        const response = await fetch('https://functions.poehali.dev/11401ef2-fb3f-4ea6-80f5-f92df257be5b', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName: file.name,
            fileContent: base64,
            fileType: 'invoice'
          })
        });

        const result = await response.json();
        
        if (result.success) {
          toast.success(`Документ "${file.name}" загружен`);
          
          if (result.ocrData) {
            setOcrData(result.ocrData);
            toast.success('Данные распознаны автоматически!', {
              description: `Найдена сумма: ${result.ocrData.totalAmount || 'не определена'} ₽`
            });
          }
        } else {
          toast.error('Ошибка при загрузке документа');
        }
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      toast.error('Ошибка при обработке файла');
    } finally {
      setIsUploading(false);
    }
  };

  const financialMetrics = [
    { label: 'Доходы за месяц', value: '0 ₽', change: '+0%', trend: 'up' as const },
    { label: 'Расходы за месяц', value: '0 ₽', change: '+0%', trend: 'down' as const },
    { label: 'Чистая прибыль', value: '0 ₽', change: '+0%', trend: 'up' as const },
    { label: 'Налоги к уплате', value: '0 ₽', deadline: 'До 25.02.2026', trend: 'neutral' as const },
  ];

  const upcomingTaxes = [
    { name: 'НДС', amount: '0 ₽', deadline: '2026-02-25', status: 'pending' },
    { name: 'Налог на прибыль', amount: '0 ₽', deadline: '2026-03-28', status: 'pending' },
    { name: 'Страховые взносы', amount: '0 ₽', deadline: '2026-02-15', status: 'pending' },
  ];

  const recentDocuments = [
    { name: 'Акт выполненных работ', date: '2026-01-20', type: 'Акт', status: 'processed' },
    { name: 'Счёт-фактура №123', date: '2026-01-18', type: 'Счёт', status: 'processed' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">Бухгалтерия онлайн</h1>
              <p className="text-muted-foreground">Управление финансами и документами вашего бизнеса</p>
            </div>
            <Badge className="bg-primary text-white text-lg px-4 py-2">
              <Icon name="Shield" size={18} className="mr-2" />
              Премиум доступ
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {financialMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardDescription>{metric.label}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2">{metric.value}</div>
                  <div className="flex items-center gap-2">
                    {metric.change && (
                      <Badge variant={metric.trend === 'up' ? 'default' : 'secondary'} className="text-xs">
                        <Icon 
                          name={metric.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                          size={14} 
                          className="mr-1" 
                        />
                        {metric.change}
                      </Badge>
                    )}
                    {metric.deadline && (
                      <span className="text-xs text-muted-foreground">{metric.deadline}</span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Tabs defaultValue="documents" className="space-y-6">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="documents">
                <Icon name="FileText" size={16} className="mr-2" />
                Документы
              </TabsTrigger>
              <TabsTrigger value="taxes">
                <Icon name="Calendar" size={16} className="mr-2" />
                Налоги
              </TabsTrigger>
              <TabsTrigger value="reports">
                <Icon name="BarChart3" size={16} className="mr-2" />
                Отчёты
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Загрузка документов</CardTitle>
                  <CardDescription>
                    Загружайте счета, акты, накладные и другие финансовые документы
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      disabled={isUploading}
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      {isUploading ? (
                        <Icon name="Loader2" size={48} className="mx-auto text-primary mb-4 animate-spin" />
                      ) : (
                        <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                      )}
                      <p className="text-lg font-semibold mb-2">
                        {isUploading ? 'Загрузка и распознавание...' : 'Перетащите файлы или нажмите для выбора'}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {isUploading ? 'Автоматическое извлечение сумм и дат' : 'Поддерживаются форматы: PDF, DOC, DOCX, XLS, XLSX, JPG, PNG'}
                      </p>
                      {selectedFile && !isUploading && (
                        <Badge className="mt-4" variant="secondary">
                          <Icon name="Check" size={14} className="mr-1" />
                          {selectedFile.name}
                        </Badge>
                      )}
                    </label>
                  </div>
                  
                  {ocrData && (
                    <div className="mt-6 p-6 bg-accent/10 rounded-lg border border-accent/20">
                      <div className="flex items-center gap-2 mb-4">
                        <Icon name="Sparkles" size={20} className="text-accent" />
                        <h3 className="font-semibold">Распознанные данные</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {ocrData.documentType && (
                          <div>
                            <p className="text-sm text-muted-foreground">Тип документа</p>
                            <p className="font-semibold">{ocrData.documentType}</p>
                          </div>
                        )}
                        {ocrData.documentNumber && (
                          <div>
                            <p className="text-sm text-muted-foreground">Номер документа</p>
                            <p className="font-semibold">№{ocrData.documentNumber}</p>
                          </div>
                        )}
                        {ocrData.totalAmount && (
                          <div>
                            <p className="text-sm text-muted-foreground">Сумма</p>
                            <p className="font-semibold text-2xl text-accent">{ocrData.totalAmount.toLocaleString('ru-RU')} ₽</p>
                          </div>
                        )}
                        {ocrData.dates && ocrData.dates.length > 0 && (
                          <div>
                            <p className="text-sm text-muted-foreground">Даты</p>
                            <p className="font-semibold">{ocrData.dates[0]}</p>
                          </div>
                        )}
                        {ocrData.inn && (
                          <div>
                            <p className="text-sm text-muted-foreground">ИНН</p>
                            <p className="font-semibold">{ocrData.inn}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последние документы</CardTitle>
                </CardHeader>
                <CardContent>
                  {recentDocuments.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <Icon name="FileX" size={48} className="mx-auto mb-4 opacity-50" />
                      <p>Документы ещё не загружены</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {recentDocuments.map((doc, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                              <Icon name="FileText" size={20} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-semibold">{doc.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {doc.type} • {doc.date}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">
                              <Icon name="CheckCircle" size={14} className="mr-1" />
                              Обработан
                            </Badge>
                            <Button variant="ghost" size="icon">
                              <Icon name="Download" size={18} />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="taxes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Налоговый календарь</CardTitle>
                  <CardDescription>
                    Отслеживайте предстоящие налоговые платежи и сроки сдачи отчётности
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingTaxes.map((tax, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                            <Icon name="Calendar" size={24} className="text-accent" />
                          </div>
                          <div>
                            <p className="font-semibold text-lg">{tax.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Срок уплаты: {new Date(tax.deadline).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold">{tax.amount}</p>
                          <Button variant="outline" size="sm" className="mt-2">
                            <Icon name="ExternalLink" size={14} className="mr-2" />
                            Оплатить
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-accent/5 border-accent/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Info" size={20} />
                    Важная информация
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Данные о налогах обновляются автоматически на основе ваших финансовых операций. 
                    Для точных расчётов убедитесь, что все документы загружены вовремя.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Финансовые отчёты</CardTitle>
                  <CardDescription>
                    Создавайте и экспортируйте отчёты для анализа бизнеса
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" size="lg" className="h-24 flex-col">
                      <Icon name="FileSpreadsheet" size={32} className="mb-2" />
                      <span>Отчёт о прибылях и убытках</span>
                    </Button>
                    <Button variant="outline" size="lg" className="h-24 flex-col">
                      <Icon name="PieChart" size={32} className="mb-2" />
                      <span>Баланс</span>
                    </Button>
                    <Button variant="outline" size="lg" className="h-24 flex-col">
                      <Icon name="TrendingUp" size={32} className="mb-2" />
                      <span>Движение денежных средств</span>
                    </Button>
                    <Button variant="outline" size="lg" className="h-24 flex-col">
                      <Icon name="Receipt" size={32} className="mb-2" />
                      <span>Налоговая отчётность</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Интеграция с калькулятором</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-6 bg-primary/5 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Calculator" size={24} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">Автозаполнение прогнозов</p>
                        <p className="text-sm text-muted-foreground">
                          Используйте данные из бухгалтерии для точных прогнозов
                        </p>
                      </div>
                    </div>
                    <Button asChild>
                      <Link to="/calculator">
                        <Icon name="ArrowRight" className="mr-2" />
                        Перейти к калькулятору
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accounting;