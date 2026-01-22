import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface ChecklistUploaderProps {
  onDataExtracted: (data: any) => void;
}

const ChecklistUploader = ({ onDataExtracted }: ChecklistUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
    link.href = '/checklist-template.md';
    link.download = 'План-А_Чек-лист_для_прогноза.md';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Чек-лист скачан! Заполните его и загрузите обратно');
  };

  const parseChecklistFile = (content: string) => {
    const data: any = {};

    const revenueMatch = content.match(/Текущая месячная выручка[^]*?(\d[\d\s]*)\s*₽/i);
    if (revenueMatch) {
      data.revenue = parseInt(revenueMatch[1].replace(/\s/g, ''));
    }

    const growthMatch = content.match(/темп роста[^]*?(\d+)\s*%/i);
    if (growthMatch) {
      data.growth = parseInt(growthMatch[1]);
    }

    const employeesMatch = content.match(/Количество сотрудников[^]*?(\d+)\s*человек/i);
    if (employeesMatch) {
      data.employees = parseInt(employeesMatch[1]);
    }

    const volatilityMatch = content.match(/Волатильность рынка[^]*?(\d+)\s*%/i);
    if (volatilityMatch) {
      data.volatility = parseInt(volatilityMatch[1]);
    }

    const competitionMatch = content.match(/Уровень конкуренции[^]*?(\d+)\s*%/i);
    if (competitionMatch) {
      data.competition = parseInt(competitionMatch[1]);
    }

    const nameMatch = content.match(/ФИО контактного лица:\*\*\s*([^\n]+)/i);
    if (nameMatch) {
      data.name = nameMatch[1].trim().replace(/_/g, '');
    }

    const emailMatch = content.match(/Email:\*\*\s*([^\n]+)/i);
    if (emailMatch) {
      data.email = emailMatch[1].trim().replace(/_/g, '');
    }

    const phoneMatch = content.match(/Телефон:\*\*\s*([^\n]+)/i);
    if (phoneMatch) {
      data.phone = phoneMatch[1].trim().replace(/_/g, '');
    }

    const companyMatch = content.match(/Название компании:\*\*\s*([^\n]+)/i);
    if (companyMatch) {
      data.company = companyMatch[1].trim().replace(/_/g, '');
    }

    const industryPatterns = [
      { pattern: /\[x\]\s*01\.1/i, value: 'agriculture_crop' },
      { pattern: /\[x\]\s*01\.2-01\.4/i, value: 'agriculture_animal' },
      { pattern: /\[x\]\s*01\.5/i, value: 'agriculture_mixed' },
      { pattern: /\[x\]\s*01\.6/i, value: 'agriculture_service' },
      { pattern: /\[x\]\s*02\s*-/i, value: 'forestry' },
      { pattern: /\[x\]\s*03\s*-/i, value: 'fishing' },
      { pattern: /\[x\]\s*05\s*-/i, value: 'mining_coal' },
      { pattern: /\[x\]\s*06\s*-/i, value: 'mining_oil' },
      { pattern: /\[x\]\s*10-11/i, value: 'manufacturing_food' },
      { pattern: /\[x\]\s*47\s*-.*розничная/i, value: 'retail_store' },
      { pattern: /\[x\]\s*62-63/i, value: 'tech_it' },
      { pattern: /\[x\]\s*55\s*-/i, value: 'hospitality_hotel' },
      { pattern: /\[x\]\s*56\s*-/i, value: 'hospitality_food' },
    ];

    for (const { pattern, value } of industryPatterns) {
      if (pattern.test(content)) {
        data.industry = value;
        break;
      }
    }

    return data;
  };

  const handleFileUpload = async (file: File) => {
    if (!file.name.match(/\.(md|txt)$/i)) {
      toast.error('Пожалуйста, загрузите файл .md или .txt');
      return;
    }

    setFileName(file.name);

    try {
      const content = await file.text();
      const extractedData = parseChecklistFile(content);

      if (Object.keys(extractedData).length === 0) {
        toast.error('Не удалось извлечь данные из файла');
        return;
      }

      onDataExtracted(extractedData);
      toast.success('Данные успешно загружены из чек-листа!');
    } catch (error) {
      toast.error('Ошибка при чтении файла');
      console.error(error);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <Card className="border-2 border-accent">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <Icon name="FileText" className="text-accent" />
          Быстрое заполнение через чек-лист
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Alert>
          <Icon name="Info" size={16} className="text-primary" />
          <AlertDescription>
            Скачайте готовый чек-лист, заполните его в любом редакторе и загрузите обратно — все поля заполнятся автоматически!
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button 
            onClick={handleDownloadTemplate} 
            variant="outline" 
            size="lg"
            className="w-full"
          >
            <Icon name="Download" className="mr-2" />
            Скачать чек-лист
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".md,.txt"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              id="file-upload"
            />
            <Button 
              variant="default" 
              size="lg"
              className="w-full"
              asChild
            >
              <label htmlFor="file-upload" className="cursor-pointer">
                <Icon name="Upload" className="mr-2" />
                Загрузить заполненный
              </label>
            </Button>
          </div>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all ${
            isDragging 
              ? 'border-primary bg-primary/5' 
              : 'border-muted-foreground/30 bg-secondary/20'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="space-y-4">
            <div className="w-16 h-16 mx-auto bg-secondary rounded-full flex items-center justify-center">
              <Icon name="FileUp" size={32} className="text-muted-foreground" />
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">
                Перетащите файл сюда
              </p>
              <p className="text-sm text-muted-foreground">
                Или используйте кнопку "Загрузить" выше
              </p>
            </div>
            {fileName && (
              <div className="flex items-center justify-center gap-2 text-sm text-primary">
                <Icon name="CheckCircle" size={16} />
                <span>Загружен: {fileName}</span>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg p-4 space-y-2">
          <p className="font-semibold flex items-center gap-2">
            <Icon name="Lightbulb" size={16} className="text-accent" />
            Что извлекается из чек-листа:
          </p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-6">
            <li>• Контактные данные (ФИО, email, телефон, компания)</li>
            <li>• Финансовые показатели (выручка, темп роста)</li>
            <li>• Отрасль по ОКВЭД (автоматическое определение)</li>
            <li>• Размер команды (количество сотрудников)</li>
            <li>• Параметры рисков (волатильность, конкуренция)</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChecklistUploader;
