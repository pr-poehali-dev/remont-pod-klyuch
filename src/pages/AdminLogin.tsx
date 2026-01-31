import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!login || !password) {
      toast.error('Заполните все поля');
      return;
    }

    setLoading(true);

    setTimeout(() => {
      if (login === 'admin' && password === 'admin123') {
        localStorage.setItem('admin_token', `admin_token_${Date.now()}`);
        toast.success('Успешный вход в админ-панель');
        navigate('/admin');
      } else {
        toast.error('Неверный логин или пароль');
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Icon name="Shield" size={32} className="text-white" />
          </div>
          <CardTitle className="text-2xl">Вход в админ-панель</CardTitle>
          <p className="text-sm text-muted-foreground">
            БухКонтроль — управление клиентами
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="login">Логин</Label>
            <Input
              id="login"
              placeholder="admin"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <div>
            <Label htmlFor="password">Пароль</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>
          <Button 
            className="w-full" 
            size="lg"
            onClick={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <Icon name="Loader2" size={18} className="mr-2 animate-spin" />
                Вход...
              </>
            ) : (
              <>
                <Icon name="LogIn" size={18} className="mr-2" />
                Войти
              </>
            )}
          </Button>

          <div className="pt-4 border-t text-center">
            <p className="text-xs text-muted-foreground mb-2">Демо-доступ:</p>
            <p className="text-xs font-mono bg-accent p-2 rounded">
              admin / admin123
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
