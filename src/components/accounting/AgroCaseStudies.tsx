import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const AgroCaseStudies = () => {
  return (
    <div className="mb-20 py-16 bg-gradient-to-br from-orange-50 to-amber-50 -mx-4 px-4 md:rounded-2xl">
      <div className="text-center mb-12">
        <Badge className="bg-gradient-to-r from-orange-600 to-amber-600 text-white text-lg px-6 py-2 mb-4">
          <Icon name="Wheat" size={18} className="mr-2" />
          Примеры работ для агросектора
        </Badge>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Реальные кейсы наших клиентов</h2>
        <p className="text-gray-700 mt-4 max-w-2xl mx-auto text-lg">
          Помогаем фермерам и сельхозпроизводителям разобраться с отчётностью и получить все субсидии
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <Card className="border-2 border-orange-300 hover:border-orange-500 hover:shadow-2xl transition-all bg-white">
          <CardHeader>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Icon name="Wheat" size={28} className="text-white" />
            </div>
            <CardTitle className="text-xl">КФХ "Золотое поле"</CardTitle>
            <CardDescription className="text-base">Ставропольский край, выращивание пшеницы</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Что сделали:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Настроили ФГИС Зерно с нуля</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Помогли получить субсидии на 2.4 млн ₽</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Сдали отчёты 29-СХ в срок</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-orange-200">
              <p className="text-sm font-bold text-orange-600">💰 Экономия: 180 000 ₽/год на штатном бухгалтере</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-300 hover:border-orange-500 hover:shadow-2xl transition-all bg-white">
          <CardHeader>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Icon name="Beef" size={28} className="text-white" />
            </div>
            <CardTitle className="text-xl">ООО "АгроПродукт"</CardTitle>
            <CardDescription className="text-base">Краснодарский край, животноводство</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Что сделали:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Интеграция с ФГИС Меркурий</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Оформили субсидии на развитие КРС</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Оптимизировали ЕСХН</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-orange-200">
              <p className="text-sm font-bold text-orange-600">💰 Результат: Получено 1.8 млн ₽ субсидий</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-300 hover:border-orange-500 hover:shadow-2xl transition-all bg-white">
          <CardHeader>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
              <Icon name="Sprout" size={28} className="text-white" />
            </div>
            <CardTitle className="text-xl">ИП Глава КФХ Петрова Н.В.</CardTitle>
            <CardDescription className="text-base">Ростовская область, овощеводство</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold text-gray-900">Что сделали:</p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Восстановили учёт за 2 года</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Подготовили документы для субсидий</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Сопроводили налоговую проверку</span>
                </li>
              </ul>
            </div>
            <div className="pt-4 border-t border-orange-200">
              <p className="text-sm font-bold text-orange-600">💰 Избежали штрафов на 450 000 ₽</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgroCaseStudies;