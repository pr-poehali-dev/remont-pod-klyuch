import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Client {
  id: number;
  phone: string;
  name: string;
  company_name?: string;
  email?: string;
  is_active: boolean;
  last_login_at?: string;
  notes?: string;
}

const AdminPanel = () => {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    company_name: '',
    email: '',
    notes: ''
  });

  useEffect(() => {
    const adminToken = localStorage.getItem('admin_token');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }
    loadClients();
  }, [navigate]);

  const loadClients = () => {
    const demoClients: Client[] = [
      {
        id: 1,
        phone: '+7 (927) 123-45-67',
        name: 'Иван Петров',
        company_name: 'ООО "Агро-Плюс"',
        email: 'petrov@example.com',
        is_active: true,
        last_login_at: '30.01.2026 14:32',
        notes: 'Тариф АГРО, оплачено до 15.02.2026'
      },
      {
        id: 2,
        phone: '+7 (927) 234-56-78',
        name: 'Мария Сидорова',
        company_name: 'ИП Сидорова М.А.',
        email: 'sidorova@example.com',
        is_active: true,
        last_login_at: '29.01.2026 10:15',
        notes: 'Тариф СТАРТ'
      },
      {
        id: 3,
        phone: '+7 (927) 345-67-89',
        name: 'Алексей Козлов',
        company_name: 'КФХ "Рассвет"',
        is_active: false,
        notes: 'Доступ приостановлен до оплаты'
      }
    ];
    setClients(demoClients);
  };

  const handleAddClient = () => {
    if (!formData.phone || !formData.name) {
      toast.error('Заполните обязательные поля: телефон и имя');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newClient: Client = {
        id: clients.length + 1,
        phone: formData.phone,
        name: formData.name,
        company_name: formData.company_name,
        email: formData.email,
        is_active: true,
        notes: formData.notes
      };

      setClients([...clients, newClient]);
      toast.success(`СМС с кодом доступа отправлена на ${formData.phone}`);
      setShowAddDialog(false);
      setFormData({ phone: '', name: '', company_name: '', email: '', notes: '' });
      setLoading(false);
    }, 1000);
  };

  const handleEditClient = () => {
    if (!selectedClient) return;

    setLoading(true);
    setTimeout(() => {
      const updatedClients = clients.map(c => 
        c.id === selectedClient.id 
          ? { ...c, ...formData }
          : c
      );
      setClients(updatedClients);
      toast.success('Данные клиента обновлены');
      setShowEditDialog(false);
      setSelectedClient(null);
      setFormData({ phone: '', name: '', company_name: '', email: '', notes: '' });
      setLoading(false);
    }, 500);
  };

  const handleToggleAccess = (clientId: number) => {
    const updatedClients = clients.map(c => 
      c.id === clientId 
        ? { ...c, is_active: !c.is_active }
        : c
    );
    setClients(updatedClients);
    const client = updatedClients.find(c => c.id === clientId);
    toast.success(client?.is_active ? 'Доступ активирован' : 'Доступ приостановлен');
  };

  const handleSendNewCode = (phone: string) => {
    toast.success(`Новый код отправлен на ${phone}`);
  };

  const openEditDialog = (client: Client) => {
    setSelectedClient(client);
    setFormData({
      phone: client.phone,
      name: client.name,
      company_name: client.company_name || '',
      email: client.email || '',
      notes: client.notes || ''
    });
    setShowEditDialog(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-40 bg-primary text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="Shield" size={28} className="text-white" />
              <div>
                <h1 className="text-xl font-bold">Админ-панель БухКонтроль</h1>
                <p className="text-xs opacity-90">Управление клиентами</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20" onClick={handleLogout}>
              <Icon name="LogOut" size={18} className="mr-2" />
              Выход
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Всего клиентов</p>
                  <p className="text-3xl font-bold">{clients.length}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Icon name="Users" size={24} className="text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Активных</p>
                  <p className="text-3xl font-bold text-green-600">
                    {clients.filter(c => c.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Приостановленных</p>
                  <p className="text-3xl font-bold text-red-600">
                    {clients.filter(c => !c.is_active).length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <Icon name="XCircle" size={24} className="text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Список клиентов</CardTitle>
              <Button onClick={() => setShowAddDialog(true)}>
                <Icon name="UserPlus" size={18} className="mr-2" />
                Добавить клиента
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {clients.map((client) => (
                <Card key={client.id} className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="User" size={24} className="text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{client.name}</h3>
                          <Badge variant={client.is_active ? 'default' : 'destructive'}>
                            {client.is_active ? 'Активен' : 'Приостановлен'}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{client.phone}</p>
                        {client.company_name && (
                          <p className="text-sm text-muted-foreground">{client.company_name}</p>
                        )}
                        {client.email && (
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        )}
                        {client.last_login_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            Последний вход: {client.last_login_at}
                          </p>
                        )}
                        {client.notes && (
                          <p className="text-xs text-muted-foreground mt-1 italic">
                            {client.notes}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button variant="outline" size="sm" onClick={() => openEditDialog(client)}>
                        <Icon name="Edit" size={16} className="mr-1" />
                        Изменить
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleToggleAccess(client.id)}
                      >
                        <Icon name={client.is_active ? 'Lock' : 'Unlock'} size={16} className="mr-1" />
                        {client.is_active ? 'Приостановить' : 'Активировать'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleSendNewCode(client.phone)}
                      >
                        <Icon name="MessageSquare" size={16} className="mr-1" />
                        Отправить код
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить нового клиента</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Телефон (логин) *</Label>
              <Input
                id="phone"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="company">Компания</Label>
              <Input
                id="company"
                placeholder="ООО 'Пример'"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="client@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="notes">Примечания</Label>
              <Textarea
                id="notes"
                placeholder="Тариф, срок оплаты и другие заметки"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleAddClient} disabled={loading}>
              {loading ? 'Создание...' : 'Создать и отправить СМС'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать клиента</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-phone">Телефон (логин) *</Label>
              <Input
                id="edit-phone"
                placeholder="+7 (___) ___-__-__"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-name">Имя *</Label>
              <Input
                id="edit-name"
                placeholder="Иван Иванов"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-company">Компания</Label>
              <Input
                id="edit-company"
                placeholder="ООО 'Пример'"
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                placeholder="client@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-notes">Примечания</Label>
              <Textarea
                id="edit-notes"
                placeholder="Тариф, срок оплаты и другие заметки"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              Отмена
            </Button>
            <Button onClick={handleEditClient} disabled={loading}>
              {loading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminPanel;
