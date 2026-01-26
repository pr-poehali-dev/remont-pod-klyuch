import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Combobox } from '@/components/ui/combobox';
import Icon from '@/components/ui/icon';

interface ContactInformationSectionProps {
  name: string;
  setName: (value: string) => void;
  email: string;
  setEmail: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  company: string;
  setCompany: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  deliveryMethod: string;
  setDeliveryMethod: (value: string) => void;
  messenger: string;
  setMessenger: (value: string) => void;
}

const popularCities = [
  'Москва', 'Санкт-Петербург', 'Новосибирск', 'Екатеринбург', 'Казань',
  'Нижний Новгород', 'Челябинск', 'Самара', 'Омск', 'Ростов-на-Дону',
  'Уфа', 'Красноярск', 'Воронеж', 'Пермь', 'Волгоград',
  'Краснодар', 'Саратов', 'Тюмень', 'Тольятти', 'Ижевск',
  'Барнаул', 'Ульяновск', 'Иркутск', 'Хабаровск', 'Ярославль',
  'Владивосток', 'Махачкала', 'Томск', 'Оренбург', 'Кемерово'
].map(city => ({ value: city, label: city }));

const ContactInformationSection = ({
  name,
  setName,
  email,
  setEmail,
  phone,
  setPhone,
  company,
  setCompany,
  city,
  setCity,
  deliveryMethod,
  setDeliveryMethod,
  messenger,
  setMessenger,
}: ContactInformationSectionProps) => {
  return (
    <div className="border-t pt-6">
      <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
        <Icon name="FileText" size={20} />
        Контактная информация
      </h3>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">ФИО контактного лица <span className="text-red-500">*</span></Label>
            <Input
              id="name"
              placeholder="Иванов Иван Иванович"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">Название компании <span className="text-red-500">*</span></Label>
            <Input
              id="company"
              placeholder="ООО &quot;Рога и копыта&quot;"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Город <span className="text-red-500">*</span></Label>
          <Combobox
            options={popularCities}
            value={city}
            onValueChange={setCity}
            placeholder="Выберите или введите город"
            searchPlaceholder="Москва, Санкт-Петербург..."
            emptyText="Город не найден — продолжайте ввод"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
            <Input
              id="email"
              type="email"
              placeholder="ivan@company.ru"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Телефон <span className="text-red-500">*</span></Label>
            <Input
              id="phone"
              type="tel"
              placeholder="+7 (999) 123-45-67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label>Как удобнее получить результат? <span className="text-red-500">*</span></Label>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value="email" id="email-delivery" />
              <Label htmlFor="email-delivery" className="cursor-pointer flex items-center gap-2 flex-1">
                <Icon name="Mail" size={18} className="text-primary" />
                <div>
                  <p className="font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">Отправим PDF-отчёт на вашу почту</p>
                </div>
              </Label>
            </div>
            <div className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-secondary/50 transition-colors">
              <RadioGroupItem value="messenger" id="messenger-delivery" />
              <Label htmlFor="messenger-delivery" className="cursor-pointer flex items-center gap-2 flex-1">
                <Icon name="MessageCircle" size={18} className="text-primary" />
                <div>
                  <p className="font-medium">Мессенджер</p>
                  <p className="text-sm text-muted-foreground">Telegram, WhatsApp или другой</p>
                </div>
              </Label>
            </div>
          </RadioGroup>

          {deliveryMethod === 'messenger' && (
            <div className="space-y-2 animate-fade-in pl-4">
              <Label htmlFor="messenger">Укажите ваш контакт в мессенджере <span className="text-red-500">*</span></Label>
              <Input
                id="messenger"
                placeholder="@username или +7 (999) 123-45-67"
                value={messenger}
                onChange={(e) => setMessenger(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Укажите никнейм в Telegram (@username) или номер телефона для WhatsApp
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInformationSection;
