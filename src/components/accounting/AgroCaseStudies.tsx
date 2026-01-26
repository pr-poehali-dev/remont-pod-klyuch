import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AgroCaseStudies = () => {
  return (
    <div className="mb-20">
      <div className="text-center mb-12">
        <Badge className="bg-accent text-white text-lg px-6 py-2 mb-4">
          <Icon name="Wheat" size={18} className="mr-2" />
          Примеры работ для агросектора
        </Badge>
        <h2 className="text-3xl font-bold">Реальные кейсы наших клиентов</h2>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          Помогаем фермерам и сельхозпроизводителям разобраться с отчётностью и получить все субсидии
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Wheat" size={24} className="text-accent" />
            </div>
            <CardTitle>КФХ "Золотое поле"</CardTitle>
            <CardDescription>Ставропольский край, выращивание пшеницы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Что сделали:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Настроили ФГИС Зерно с нуля</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Помогли получить субсидии на 2.4 млн ₽</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Сдали отчёты 29-СХ в срок</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-accent font-semibold">Экономия: 180 000 ₽/год на штатном бухгалтере</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Beef" size={24} className="text-accent" />
            </div>
            <CardTitle>ООО "АгроПродукт"</CardTitle>
            <CardDescription>Краснодарский край, животноводство</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Что сделали:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Интеграция с ФГИС Меркурий</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Оформили субсидии на развитие КРС</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Оптимизировали ЕСХН</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-accent font-semibold">Результат: Получено 1.8 млн ₽ субсидий</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-accent/20 hover:border-accent transition-colors">
          <CardHeader>
            <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
              <Icon name="Sprout" size={24} className="text-accent" />
            </div>
            <CardTitle>ИП Глава КФХ Петрова Н.В.</CardTitle>
            <CardDescription>Ростовская область, овощеводство</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Что сделали:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Восстановили учёт за 2 года</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Подготовили документы для субсидий</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={16} className="text-accent mt-0.5 flex-shrink-0" />
                  <span>Сопроводили налоговую проверку</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm text-accent font-semibold">Избежали штрафов на 450 000 ₽</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgroCaseStudies;
