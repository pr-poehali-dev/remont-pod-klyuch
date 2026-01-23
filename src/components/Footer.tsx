import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-primary/5 to-accent/5 py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Icon name="FileCheck" className="text-white" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg">БухКонтроль</span>
                <span className="text-xs text-muted-foreground">Бухгалтерский контроль</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Профессиональные бухгалтерские услуги для вашего бизнеса
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Навигация</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link to="/calculator" className="text-muted-foreground hover:text-primary transition-colors">
                  Калькулятор
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-muted-foreground hover:text-primary transition-colors">
                  Тарифы
                </Link>
              </li>
              <li>
                <Link to="/contacts" className="text-muted-foreground hover:text-primary transition-colors">
                  Контакты
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Phone" size={18} />
                <a href="tel:+79370768680" className="hover:text-primary transition-colors">
                  +7 (937) 076-86-80
                </a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Icon name="Mail" size={18} />
                <a href="mailto:zakaz6377@yandex.ru" className="hover:text-primary transition-colors">
                  zakaz6377@yandex.ru
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <Icon name="MapPin" size={18} className="mt-1" />
                <span>г. Самара, Бизнес-центр</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Социальные сети</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              >
                <Icon name="Linkedin" size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-accent/10 hover:bg-accent hover:text-white flex items-center justify-center transition-all"
              >
                <Icon name="MessageCircle" size={20} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-lg bg-primary/10 hover:bg-primary hover:text-white flex items-center justify-center transition-all"
              >
                <Icon name="Mail" size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {currentYear} БухКонтроль. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;