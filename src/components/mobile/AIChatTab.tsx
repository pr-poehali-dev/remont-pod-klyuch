import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface Message {
  role: string;
  text: string;
  time: string;
}

interface AIChatTabProps {
  messages: Message[];
  inputMessage: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
}

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

const AIChatTab = ({ messages, inputMessage, onInputChange, onSendMessage }: AIChatTabProps) => {
  const quickQuestions = [
    'Какие сроки сдачи УСН?',
    'Как учитывать зерно в ФГИС?',
    'Какие субсидии доступны?',
    'Оптимизация налогов'
  ];

  const handleQuickQuestion = (question: string) => {
    onInputChange(question);
  };

  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="flex items-start gap-3">
          <Icon name="Sparkles" size={20} className="text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-900 mb-1">ИИ-помощник для бухгалтерии</h3>
            <p className="text-sm text-blue-700">
              Задайте любой вопрос о налогах, отчетности или субсидиях для аграриев
            </p>
          </div>
        </div>
      </Card>

      <div className="flex gap-2 flex-wrap">
        {quickQuestions.map((question, idx) => (
          <Badge 
            key={idx}
            variant="outline" 
            className="cursor-pointer hover:bg-accent"
            onClick={() => handleQuickQuestion(question)}
          >
            {question}
          </Badge>
        ))}
      </div>

      <Card className="p-4 h-[400px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-lg p-3 ${
                msg.role === 'user' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent'
              }`}>
                <div className="flex items-start gap-2 mb-1">
                  <Icon 
                    name={msg.role === 'user' ? 'User' : 'Bot'} 
                    size={16} 
                    className={msg.role === 'user' ? 'text-primary-foreground' : 'text-primary'}
                  />
                  <span className="text-xs opacity-70">{msg.time}</span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <Input
            value={inputMessage}
            onChange={(e) => onInputChange(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
            placeholder="Задайте ваш вопрос..."
            className="flex-1"
          />
          <Button onClick={onSendMessage} size="icon">
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export { AIChatTab, getSmartResponse };
export type { Message };
