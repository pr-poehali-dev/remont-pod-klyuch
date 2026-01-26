import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import AgroCaseStudies from '@/components/accounting/AgroCaseStudies';
import AgroFAQ from '@/components/accounting/AgroFAQ';
import AccountingAdvantages from '@/components/accounting/AccountingAdvantages';

const Accounting = () => {
  const services = [
    {
      title: 'Бухгалтерское обслуживание',
      icon: 'Calculator',
      items: [
        'Абонентское бухгалтерское обслуживание',
        'Ведение бухгалтерского учета для малого и среднего бизнеса',
        'Расчёт и начисление заработной платы',
        'Восстановление бухгалтерского и налогового учета',
        'Проверка правильности ведения бухучета',
        'Консультации по бухгалтерскому учету',
      ]
    },
    {
      title: 'Сдача отчетности',
      icon: 'FileText',
      items: [
        'Отчётность в ИФНС, ПФР, ФСС',
        'Нулевая отчетность',
        'Сдача отчетности через интернет',
        'Подготовка и сдача алкогольных деклараций',
        'Формы 2-НДФЛ',
        'Бухгалтерский аудит',
        'Подготовка финансовой отчётности',
      ]
    },
    {
      title: 'Налоговый консалтинг',
      icon: 'Scale',
      items: [
        'Сопровождение налоговых проверок',
        'Подготовка и сопровождение на допрос в ИФНС',
        'Налоговое планирование',
        'Консультации налогового юриста',
        'Судебное представительство по налоговым делам',
        'Возврат НДС',
        'Разработка схем оптимизации налогообложения',
      ]
    },
    {
      title: 'Управленческий учет',
      icon: 'TrendingUp',
      items: [
        'Внедрение управленческого учёта',
        'Финансовая модель бизнеса',
        'Внедрение системы управления финансами',
      ]
    },
    {
      title: 'Кадровые услуги',
      icon: 'Users',
      items: [
        'Ведение кадрового учета',
        'Оформление приема и увольнения сотрудников',
        'Подготовка кадровых документов',
        'Консультации по трудовому законодательству',
      ]
    },
    {
      title: 'Регистрация и ликвидация',
      icon: 'Building',
      items: [
        'Регистрация ООО и ИП',
        'Ликвидация и реорганизация бизнеса',
        'Внесение изменений в учредительные документы',
        'Получение лицензий',
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center space-y-6 mb-16">
            <Badge className="bg-primary text-white text-lg px-6 py-2">
              <Icon name="FileCheck" size={18} className="mr-2" />
              БК - Бухгалтерский Контроль
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Бухгалтерское обслуживание бизнеса
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Профессиональные бухгалтерские услуги для малого и среднего бизнеса. 
              Полный спектр услуг от ведения учёта до налогового консалтинга.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/contacts">
                  <Icon name="Phone" className="mr-2" />
                  Получить консультацию
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/agro-calculator">
                  <Icon name="LineChart" className="mr-2" />
                  Калькулятор для агро
                </Link>
              </Button>
            </div>
          </div>

          {/* Services Section */}
          <div className="mb-20">
            <h2 className="text-3xl font-bold text-center mb-12">Наши услуги</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name={service.icon as any} size={24} className="text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {service.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                          <Icon name="Check" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <AgroCaseStudies />
          <AgroFAQ />
          <AccountingAdvantages />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accounting;