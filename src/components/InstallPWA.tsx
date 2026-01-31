import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallButton, setShowInstallButton] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowInstallButton(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallButton(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstallButton) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 animate-in slide-in-from-bottom-4">
      <div className="bg-white rounded-xl shadow-lg border p-4 max-w-sm">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Download" size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm mb-1">Установить приложение</h3>
            <p className="text-xs text-gray-600 mb-3">
              Добавьте БухКонтроль на главный экран для быстрого доступа
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleInstallClick} className="gap-1">
                <Icon name="Plus" size={14} />
                Установить
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                onClick={() => setShowInstallButton(false)}
              >
                Позже
              </Button>
            </div>
          </div>
          <button 
            onClick={() => setShowInstallButton(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <Icon name="X" size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
