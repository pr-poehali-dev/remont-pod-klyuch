import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

const Privacy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-accent/5">
      <div className="container mx-auto px-4 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8">
          <Icon name="ArrowLeft" size={20} />
          <span>На главную</span>
        </Link>

        <Card className="max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Политика конфиденциальности
                </h1>
                <p className="text-muted-foreground">
                  Последнее обновление: {new Date().toLocaleDateString('ru-RU')}
                </p>
              </div>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">1. Общие положения</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Настоящая Политика конфиденциальности персональных данных (далее — Политика) действует в отношении 
                  всей информации, которую ООО «БухКонтроль» (далее — Оператор) может получить о Пользователе 
                  во время использования сайта и его сервисов.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Использование сайта означает безоговорочное согласие Пользователя с настоящей Политикой 
                  и указанными в ней условиями обработки его персональной информации.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Политика разработана в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ 
                  «О персональных данных» (далее — 152-ФЗ).
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">2. Персональные данные пользователей</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Под персональными данными понимается информация, относящаяся к прямо или косвенно определенному 
                  или определяемому физическому лицу (субъекту персональных данных).
                </p>
                <h3 className="text-xl font-semibold mt-4">2.1. Данные, которые мы собираем:</h3>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Фамилия, имя, отчество</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Адрес электронной почты (e-mail)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Номер телефона</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Название организации и должность</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">IP-адрес, данные файлов cookie</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Check" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Информация о браузере и устройстве</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">3. Цели обработки персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор обрабатывает персональные данные Пользователя в следующих целях:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Предоставление бухгалтерских услуг</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Связь с Пользователем для консультаций</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Исполнение договорных обязательств</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Направление информационных сообщений и коммерческих предложений</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Улучшение качества обслуживания и работы сайта</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Статистический анализ и проведение маркетинговых исследований</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">4. Правовые основания обработки</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Обработка персональных данных осуществляется на основании:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="FileText" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Согласия субъекта персональных данных на обработку его данных (ст. 9 152-ФЗ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="FileText" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Исполнения договора, стороной которого является субъект персональных данных (п. 5 ч. 1 ст. 6 152-ФЗ)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="FileText" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Федерального закона от 27.07.2006 № 152-ФЗ «О персональных данных»</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">5. Способы и сроки обработки</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Обработка персональных данных Пользователя осуществляется с использованием баз данных 
                  на территории Российской Федерации.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор принимает необходимые и достаточные организационные и технические меры для защиты 
                  персональных данных от неправомерного доступа, уничтожения, изменения, блокирования, 
                  копирования, распространения, а также от иных неправомерных действий.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Персональные данные хранятся в течение срока, необходимого для достижения целей их обработки, 
                  но не менее срока, установленного законодательством РФ.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">6. Права субъекта персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  В соответствии со статьей 14 152-ФЗ, Пользователь имеет право:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Получать информацию, касающуюся обработки его персональных данных</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Требовать уточнения, блокирования или уничтожения персональных данных</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Отозвать согласие на обработку персональных данных</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Обжаловать действия или бездействие Оператора в Роскомнадзоре или судебном порядке</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="ShieldCheck" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Получать возмещение убытков и компенсацию морального вреда</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">7. Cookies и аналитика</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Сайт использует файлы cookies и сервисы веб-аналитики (Яндекс.Метрика) для улучшения 
                  функционирования и анализа посещаемости. Пользователь может отключить cookies 
                  в настройках браузера, однако это может повлиять на работу сайта.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">8. Передача данных третьим лицам</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор не передает персональные данные третьим лицам, за исключением случаев:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Получения согласия Пользователя</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Требований законодательства РФ</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="AlertCircle" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Передачи контрагентам для исполнения договорных обязательств</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">9. Безопасность данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор применяет организационные и технические меры защиты:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="Lock" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Шифрование передачи данных (SSL/TLS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Lock" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Ограничение доступа к персональным данным</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Lock" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Регулярное резервное копирование</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="Lock" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Контроль и обучение сотрудников работе с персональными данными</span>
                  </li>
                </ul>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">10. Изменение Политики</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Оператор имеет право вносить изменения в настоящую Политику конфиденциальности. 
                  Новая редакция вступает в силу с момента размещения на сайте. 
                  Продолжение использования сайта после внесения изменений означает согласие с ними.
                </p>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-primary">11. Контактная информация</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Вопросы по Политике конфиденциальности и обработке персональных данных направляйте:
                </p>
                <div className="bg-accent/5 p-6 rounded-lg space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon name="Building2" size={20} className="text-accent" />
                    <span className="font-semibold">ООО «БухКонтроль»</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="MapPin" size={20} className="text-accent" />
                    <span className="text-muted-foreground">г. Самара</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Mail" size={20} className="text-accent" />
                    <a href="mailto:zakaz6377@yandex.ru" className="text-primary hover:underline">
                      zakaz6377@yandex.ru
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon name="Phone" size={20} className="text-accent" />
                    <a href="tel:+79370768680" className="text-primary hover:underline">
                      +7 (937) 076-86-80
                    </a>
                  </div>
                </div>
              </section>

              <section className="space-y-4 mt-8 pt-8 border-t">
                <h2 className="text-2xl font-bold text-primary">12. Согласие на обработку персональных данных</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Используя данный сайт, Пользователь подтверждает, что:
                </p>
                <ul className="space-y-2 ml-6">
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Ознакомлен с настоящей Политикой конфиденциальности</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Дает согласие на обработку своих персональных данных</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Icon name="CheckCircle2" size={16} className="text-accent mt-1 flex-shrink-0" />
                    <span className="text-muted-foreground">Понимает свои права в соответствии с 152-ФЗ</span>
                  </li>
                </ul>
              </section>

              <div className="mt-8 pt-8 border-t text-center">
                <p className="text-sm text-muted-foreground">
                  Дата последнего обновления: {new Date().toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Privacy;
