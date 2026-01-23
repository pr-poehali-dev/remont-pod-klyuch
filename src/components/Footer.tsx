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
                href="https://vk.com/buxkontrol63"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-[#0077FF]/10 hover:bg-[#0077FF] hover:text-white flex items-center justify-center transition-all"
                title="ВКонтакте"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.785 16.241s.288-.032.436-.193c.136-.148.131-.425.131-.425s-.019-1.297.583-1.488c.594-.188 1.357 1.254 2.165 1.807.612.42 1.077.328 1.077.328l2.167-.03s1.133-.07.596-.961c-.044-.073-.314-.661-1.615-1.87-1.362-1.265-1.18-1.06.461-3.246.999-1.332 1.398-2.145 1.273-2.493-.119-.332-.854-.244-.854-.244l-2.44.015s-.181-.025-.315.056c-.131.079-.215.263-.215.263s-.385 1.024-.897 1.894c-1.08 1.838-1.512 1.935-1.689 1.82-.411-.267-.308-1.074-.308-1.647 0-1.791.271-2.538-.529-2.732-.266-.064-.462-.107-1.142-.114-.872-.009-1.61.003-2.028.208-.278.136-.493.44-.362.458.162.022.529.099.723.364.251.343.242 1.114.242 1.114s.144 2.108-.336 2.369c-.33.179-.782-.187-1.753-1.862-.497-.85-.873-1.79-.873-1.79s-.072-.177-.201-.272c-.157-.115-.376-.151-.376-.151l-2.318.015s-.348.01-.476.161c-.114.134-.009.411-.009.411s1.813 4.238 3.865 6.375c1.881 1.96 4.018 1.832 4.018 1.832h.971z"/>
                </svg>
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