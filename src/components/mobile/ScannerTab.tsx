import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ScannerTab = () => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ScannerTab;
