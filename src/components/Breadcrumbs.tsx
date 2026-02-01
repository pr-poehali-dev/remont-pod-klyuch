import { Link, useLocation } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const routeMap: Record<string, string> = {
  '': 'Главная',
  'calculator': 'Калькулятор',
  'agro-calculator': 'Агро-калькулятор',
  'pricing': 'Тарифы',
  'contacts': 'Контакты',
  'forecast-form': 'Форма прогноза',
  'accounting': 'Бухгалтерия',
  'privacy': 'Политика конфиденциальности',
  'mobile-login': 'Вход в приложение',
  'mobile-app': 'Мобильное приложение',
  'app-download': 'Скачать приложение',
  'dashboard': 'Личный кабинет',
  'notification-settings': 'Настройки уведомлений',
  'admin': 'Админ-панель',
  'admin-login': 'Вход для администратора'
};

const Breadcrumbs = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = location.pathname.split('/').filter(Boolean);
    
    if (paths.length === 0) {
      return [{ label: 'Главная', path: '/' }];
    }

    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Главная', path: '/' }
    ];

    let currentPath = '';
    paths.forEach((segment) => {
      currentPath += `/${segment}`;
      const label = routeMap[segment] || segment;
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  useEffect(() => {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.label,
        "item": `${window.location.origin}${crumb.path}`
      }))
    };

    let scriptTag = document.getElementById('breadcrumb-schema');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'breadcrumb-schema';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(structuredData);

    return () => {
      const existingScript = document.getElementById('breadcrumb-schema');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, [location.pathname]);

  if (breadcrumbs.length <= 1) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-background border-b">
      <ol className="flex items-center gap-2 text-sm flex-wrap container mx-auto">
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.path} className="flex items-center gap-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            )}
            {index === breadcrumbs.length - 1 ? (
              <span className="text-foreground font-medium" aria-current="page">
                {crumb.label}
              </span>
            ) : (
              <Link
                to={crumb.path}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
