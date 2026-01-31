import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function UploadAPK() {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState<string>('');

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.apk')) {
      toast({
        title: "Неверный формат",
        description: "Пожалуйста, выберите APK-файл",
        variant: "destructive"
      });
      return;
    }

    setIsUploading(true);

    try {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        const base64 = e.target?.result as string;
        const base64Data = base64.split(',')[1];

        const response = await fetch('https://functions.poehali.dev/7d448ac9-a500-4498-9b63-427e5ac733b0', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            file: base64Data,
            fileName: file.name
          })
        });

        const data = await response.json();

        if (data.success) {
          setUploadedUrl(data.downloadUrl);
          toast({
            title: "Загрузка завершена",
            description: `Файл ${data.fileName} успешно загружен`,
          });
        } else {
          throw new Error(data.error || 'Ошибка загрузки');
        }
      };

      reader.onerror = () => {
        throw new Error('Ошибка чтения файла');
      };

      reader.readAsDataURL(file);

    } catch (error) {
      toast({
        title: "Ошибка загрузки",
        description: error instanceof Error ? error.message : "Не удалось загрузить файл",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-accent flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-20 flex items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-2xl w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Upload" size={40} className="text-primary" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Загрузить APK
            </h1>
            <p className="text-lg text-gray-600">
              Выберите APK-файл для загрузки в облако
            </p>
          </div>

          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-primary transition-colors">
              <input
                type="file"
                accept=".apk"
                onChange={handleFileSelect}
                className="hidden"
                id="apk-input"
                disabled={isUploading}
              />
              <label htmlFor="apk-input" className="cursor-pointer">
                <div className="space-y-4">
                  <Icon name="FileUp" size={48} className="text-gray-400 mx-auto" />
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      Нажмите для выбора файла
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Поддерживается только формат APK
                    </p>
                  </div>
                </div>
              </label>
            </div>

            {isUploading && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
                <Icon name="Loader2" size={20} className="text-blue-600 animate-spin" />
                <span className="text-blue-700 font-medium">Загрузка файла...</span>
              </div>
            )}

            {uploadedUrl && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="CheckCircle2" size={24} className="text-green-600 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-green-800 font-semibold mb-2">Файл успешно загружен!</p>
                    <p className="text-sm text-green-700 break-all">{uploadedUrl}</p>
                  </div>
                </div>
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(uploadedUrl);
                    toast({
                      title: "Скопировано",
                      description: "Ссылка скопирована в буфер обмена",
                    });
                  }}
                  className="w-full"
                  variant="outline"
                >
                  <Icon name="Copy" size={18} className="mr-2" />
                  Скопировать ссылку
                </Button>
              </div>
            )}
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-start gap-3 text-sm text-gray-600">
              <Icon name="Info" size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <p>
                После загрузки файл будет доступен по прямой ссылке. 
                Эту ссылку можно использовать для скачивания APK на любом устройстве.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
