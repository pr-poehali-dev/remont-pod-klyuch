import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AgroFAQ = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <Badge className="bg-primary text-white text-lg px-6 py-2 mb-4">
          <Icon name="HelpCircle" size={18} className="mr-2" />
          Частые вопросы фермеров
        </Badge>
        <h2 className="text-3xl font-bold">ФГИС, субсидии и отчётность</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Ответы на самые популярные вопросы сельхозпроизводителей
        </p>
      </div>
      <div className="max-w-4xl mx-auto space-y-4">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="Wheat" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>Что такое ФГИС Зерно и зачем она нужна?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>ФГИС Зерно — федеральная государственная информационная система учёта и прослеживаемости зерна и продуктов его переработки. Обязательна для всех, кто выращивает, хранит или перерабатывает зерно. Вносить данные нужно в течение 3 дней после операции. Мы помогаем настроить систему, вносим данные и следим за сроками.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="FileCheck" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>Какие субсидии может получить КФХ?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>КФХ могут получить субсидии на развитие животноводства, растениеводства, покупку техники, строительство, мелиорацию. Основные: единовременная помощь начинающим фермерам (до 3 млн ₽), гранты на развитие (до 30 млн ₽), возмещение затрат на технику и оборудование. Мы готовим все документы и помогаем пройти комиссию.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="Beef" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>Как работает ФГИС Меркурий?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>ФГИС Меркурий — система ветеринарного контроля для животноводства и продуктов животного происхождения. Нужна для оформления ветеринарных сопроводительных документов (ВСД) при перемещении животных и продукции. Мы настраиваем интеграцию, обучаем персонал и ведём электронный документооборот в системе.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="BarChart3" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>Что такое форма 29-СХ в Росстат?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>Форма 29-СХ — статистическая отчётность по сельскому хозяйству. Сдают все сельхозпроизводители ежемесячно или ежеквартально в зависимости от объёмов производства. Включает данные по посевным площадям, урожайности, поголовью скота, надоям молока. Мы собираем данные, заполняем форму и отправляем в Росстат точно в срок.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="Percent" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>ЕСХН или УСН — что выгоднее для фермера?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>ЕСХН (Единый сельхозналог) — 6% с разницы доходов и расходов, освобождение от НДС. Подходит, если 70%+ дохода от сельхоза. УСН 6% (с доходов) или 15% (доходы минус расходы) — проще, но нет льгот для агросектора. Мы рассчитываем оба варианта и показываем, где экономия больше именно для вашего хозяйства.</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start gap-3">
              <Icon name="Clock" size={24} className="text-accent mt-1 flex-shrink-0" />
              <span>Какие сроки сдачи отчётности для КФХ?</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            <p>ЕСХН — декларация до 31 марта. Форма 29-СХ — ежемесячно до 5-10 числа. ФГИС Зерно — в течение 3 дней после операции. Отчёты по зарплате (СЗВ-М) — ежемесячно до 15 числа. Годовая бухотчётность — до 31 марта. Мы ведём календарь отчётности и сдаём всё вовремя, чтобы избежать штрафов.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgroFAQ;
