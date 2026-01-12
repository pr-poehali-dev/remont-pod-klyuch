import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Главная', path: '/' },
    { name: 'Услуги', path: '/services' },
    { name: 'Калькулятор', path: '/calculator' },
    { name: 'Контакты', path: '/contacts' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center transition-transform group-hover:scale-105">
              <Icon name="Home" className="text-white" size={24} />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-foreground">Ремонтируем</span>
              <span className="text-xs text-muted-foreground">под ключ</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a href="tel:+79370768680" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
              <Icon name="Phone" size={20} />
              <span className="font-semibold">+7 (937) 076-86-80</span>
            </a>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              Консультация
            </Button>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t animate-fade-in">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="tel:+79370768680"
                className="flex items-center gap-2 text-foreground hover:text-primary transition-colors py-2"
              >
                <Icon name="Phone" size={20} />
                <span className="font-semibold">+7 (937) 076-86-80</span>
              </a>
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 w-full">
                Консультация
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;