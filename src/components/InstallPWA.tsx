import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

const APK_URL = 'https://cdn.poehali.dev/projects/YCAJErc5ICrWGXasApLZcYw3CZz-gMsC/bucket/buhkontrol.apk';

export default function InstallPWA() {
  const [showInstallButton, setShowInstallButton] = useState(true);

  const handleDownloadClick = () => {
    window.location.href = APK_URL;
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
            <h3 className="font-semibold text-sm mb-1">Скачать приложение</h3>
            <p className="text-xs text-gray-600 mb-3">
              Установите БухКонтроль на свой Android-телефон
            </p>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleDownloadClick} className="gap-1">
                <Icon name="Download" size={14} />
                Скачать APK
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