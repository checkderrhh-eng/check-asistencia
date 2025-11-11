const { useState, useEffect } = React;

// Utilidades para LocalStorage
const Storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Error al leer de localStorage:', error);
      return null;
    }
  },
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error('Error al guardar en localStorage:', error);
      return false;
    }
  },
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error al eliminar de localStorage:', error);
      return false;
    }
  }
};

// Logo por defecto (SVG inline)
const DefaultLogo = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full">
    <circle cx="50" cy="50" r="45" fill="#38BDF8"/>
    <path d="M35 50 L45 60 L65 40" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Datos iniciales
const initializeData = () => {
  if (!Storage.get('usuarios')) {
    const usuariosIniciales = [
      {
        id: '1',
        legajo: '1001',
        nombre: 'Juan Pérez',
        email: 'juan@empresa.com',
        password: '1234',
        departamento: 'Ventas',
        rol: 'empleado',
        horarioEntrada: '08:00',
        horarioSalida: '17:00'
      },
      {
        id: '2',
        legajo: '1002',
        nombre: 'María López',
        email: 'maria@empresa.com',
        password: '1234',
        departamento: 'Administración',
        rol: 'empleado',
        horarioEntrada: '08:00',
        horarioSalida: '17:00'
      },
      {
        id: '3',
        legajo: '1003',
        nombre: 'Carlos Gómez',
        email: 'carlos@empresa.com',
        password: '1234',
        departamento: 'IT',
        rol: 'empleado',
        horarioEntrada: '08:00',
        horarioSalida: '17:00'
      },
      {
        id: 'admin',
        legajo: 'ADMIN',
        nombre: 'Administrador RRHH',
        email: 'admin@empresa.com',
        password: 'admin123',
        departamento: 'Recursos Humanos',
        rol: 'admin',
        horarioEntrada: '08:00',
        horarioSalida: '17:00'
      }
    ];
    Storage.set('usuarios', usuariosIniciales);
  }
  
  if (!Storage.get('marcaciones')) {
    Storage.set('marcaciones', []);
  }
  
  if (!Storage.get('solicitudes')) {
    Storage.set('solicitudes', []);
  }
};

// Función para descargar CSV
const downloadCSV = (data, filename) => {
  const csv = data.map(row => row.join(',')).join('\n');
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// Iconos SVG
const Icon = ({ name, className = "" }) => {
  const icons = {
    Clock: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    MapPin: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    Coffee: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    ),
    LogOut: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    ),
    LogIn: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
        <polyline points="10 17 15 12 10 7"></polyline>
        <line x1="15" y1="12" x2="3" y2="12"></line>
      </svg>
    ),
    Calendar: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    AlertCircle: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    Menu: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
    X: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    Users: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    UserPlus: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="8.5" cy="7" r="4"></circle>
        <line x1="20" y1="8" x2="20" y2="14"></line>
        <line x1="23" y1="11" x2="17" y2="11"></line>
      </svg>
    ),
    FileText: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
      </svg>
    ),
    BarChart3: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
      </svg>
    ),
    Download: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    ),
    Trash2: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
      </svg>
    )
  };
  
  const IconComponent = icons[name];
  return IconComponent ? React.createElement(IconComponent) : null;
};

// Pantalla de Login
const LoginScreen = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    const usuarios = Storage.get('usuarios') || [];
    const usuario = usuarios.find(u => u.email === email && u.password === password);
    
    if (usuario) {
      Storage.set('currentUser', usuario);
      onLogin(usuario);
    } else {
      setError('Email o contraseña incorrectos');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] rounded-full flex items-center justify-center mx-auto mb-4">
            <DefaultLogo />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Check de Asistencia</h1>
          <p className="text-gray-600 mt-2">Ingresa tus credenciales</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#38BDF8] focus:outline-none"
              placeholder="tu@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-[#38BDF8] focus:outline-none"
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border-2 border-red-200 rounded-xl p-3 text-red-700 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#38BDF8] to-[#0EA5E9] text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2"
          >
            <Icon name="LogIn" className="w-5 h-5" />
            <span>Ingresar</span>
          </button>
        </form>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl">
          <p className="text-xs font-semibold text-blue-900 mb-2">Usuarios de prueba:</p>
          <div className="text-xs text-blue-700 space-y-1">
            <p><strong>Empleado:</strong> juan@empresa.com / 1234</p>
            <p><strong>Admin:</strong> admin@empresa.com / admin123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal para agregar empleado
const AddEmployeeModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '1234',
    legajo: '',
    departamento: '',
    horarioEntrada: '08:00',
    horarioSalida: '17:00'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const usuarios = Storage.get('usuarios') || [];
    
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === formData.email)) {
      alert('Este email ya está registrado');
      return;
    }
    
    const newUser = {
      ...formData,
      id: Date.now().toString(),
      rol: 'empleado'
    };
    
    usuarios.push(newUser);
    Storage.set('usuarios', usuarios);
    onSave();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Agregar Nuevo Empleado</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre Completo *</label>
            <input
              type="text"
              value={formData.nombre}
              onChange={(e) => setFormData({...formData, nombre: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Contraseña *</label>
            <input
              type="text"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Legajo *</label>
            <input
              type="text"
              value={formData.legajo}
              onChange={(e) => setFormData({...formData, legajo: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Departamento *</label>
            <input
              type="text"
              value={formData.departamento}
              onChange={(e) => setFormData({...formData, departamento: e.target.value})}
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hora Entrada</label>
              <input
                type="time"
                value={formData.horarioEntrada}
                onChange={(e) => setFormData({...formData, horarioEntrada: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Hora Salida</label>
              <input
                type="time"
                value={formData.horarioSalida}
                onChange={(e) => setFormData({...formData, horarioSalida: e.target.value})}
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#38BDF8] text-white py-3 rounded-lg font-semibold hover:bg-[#0EA5E9]"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Aplicación principal
const AttendanceSystem = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [justification, setJustification] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    initializeData();
    
    const savedUser = Storage.get('currentUser');
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          setLocation({ lat: -25.2637, lng: -57.5759 });
        }
      );
    } else {
      setLocation({ lat: -25.2637, lng: -57.5759 });
    }

    return () => clearInterval(timer);
  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    Storage.remove('currentUser');
    setCurrentUser(null);
    setMenuOpen(false);
  };

  const handleMarcacion = (tipo) => {
    const now = new Date();
    const horaActual = now.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' });
    const fechaActual = now.toISOString().split('T')[0];
    
    let estado = 'normal';
    if (tipo === 'entrada' && horaActual > currentUser.horarioEntrada) {
      estado = 'tarde';
    } else if (tipo === 'salida' && horaActual < currentUser.horarioSalida) {
      estado = 'anticipada';
    }

    const marcaciones = Storage.get('marcaciones') || [];
    const newMarcacion = {
      id: Date.now().toString(),
      usuarioId: currentUser.id,
      usuarioNombre: currentUser.nombre,
      tipo,
      hora: horaActual,
      fecha: fechaActual,
      ubicacion: location,
      estado,
      timestamp: now.toISOString()
    };

    marcaciones.push(newMarcacion);
    Storage.set('marcaciones', marcaciones);
    setCurrentTime(new Date());
  };

  const handleSolicitud = (tipo) => {
    setModalType(tipo);
    setShowModal(true);
  };

  const submitSolicitud = () => {
    const solicitudes = Storage.get('solicitudes') || [];
    const newSolicitud = {
      id: Date.now().toString(),
      usuarioId: currentUser.id,
      usuarioNombre: currentUser.nombre,
      tipo: modalType,
      fecha: selectedDate,
      motivo: justification,
      estado: 'pendiente',
      timestamp: new Date().toISOString()
    };

    solicitudes.push(newSolicitud);
    Storage.set('solicitudes', solicitudes);
    
    setShowModal(false);
    setJustification('');
    setSelectedDate('');
    alert('Solicitud enviada correctamente');
  };

  const getTodayRecords = () => {
    const marcaciones = Storage.get('marcaciones') || [];
    const today = new Date().toISOString().split('T')[0];
    return marcaciones.filter(m => m.usuarioId === currentUser.id && m.fecha === today);
  };

  const getAllTodayRecords = () => {
    const marcaciones = Storage.get('marcaciones') || [];
    const today = new Date().toISOString().split('T')[0];
    return marcaciones.filter(m => m.fecha === today);
  };

  const getPendingSolicitudes = () => {
    const solicitudes = Storage.get('solicitudes') || [];
    return solicitudes.filter(s => s.estado === 'pendiente');
  };

  const handleApproveSolicitud = (solicitudId) => {
    const solicitudes = Storage.get('solicitudes') || [];
    const updated = solicitudes.map(s => 
      s.id === solicitudId ? { ...s, estado: 'aprobada' } : s
    );
    Storage.set('solicitudes', updated);
    setCurrentTime(new Date());
  };

  const handleRejectSolicitud = (solicitudId) => {
    const solicitudes = Storage.get('solicitudes') || [];
    const updated = solicitudes.map(s => 
      s.id === solicitudId ? { ...s, estado: 'rechazada' } : s
    );
    Storage.set('solicitudes', updated);
    setCurrentTime(new Date());
  };

  const generateReport = () => {
    const marcaciones = Storage.get('marcaciones') || [];
    const usuarios = Storage.get('usuarios') || [];
    
    // Preparar datos para CSV
    const csvData = [
      ['Fecha', 'Empleado', 'Legajo', 'Tipo', 'Hora', 'Estado', 'Latitud', 'Longitud']
    ];
    
    marcaciones.forEach(m => {
      const usuario = usuarios.find(u => u.id === m.usuarioId);
      csvData.push([
        m.fecha,
        m.usuarioNombre,
        usuario ? usuario.legajo : '',
        m.tipo.replace('_', ' '),
        m.hora,
        m.estado,
        m.ubicacion.lat.toFixed(6),
        m.ubicacion.lng.toFixed(6)
      ]);
    });
    
    const today = new Date().toISOString().split('T')[0];
    downloadCSV(csvData, `reporte_asistencia_${today}.csv`);
  };

  const clearAllData = () => {
    if (confirm('¿Estás seguro de que quieres borrar todos los datos? Esta acción no se puede deshacer.')) {
      Storage.remove('marcaciones');
      Storage.remove('solicitudes');
      initializeData();
      alert('Datos borrados correctamente');
      setCurrentTime(new Date());
    }
  };

  if (!currentUser) {
    return React.createElement(LoginScreen, { onLogin: handleLogin });
  }

  // Vista Empleado
  const EmpleadoView = () => {
    const todayRecords = getTodayRecords();
    const hasEntrada = todayRecords.some(r => r.tipo === 'entrada');
    const hasAlmuerzo = todayRecords.some(r => r.tipo === 'salida_almuerzo');
    const hasRegresoAlmuerzo = todayRecords.some(r => r.tipo === 'regreso_almuerzo');
    const hasSalida = todayRecords.some(r => r.tipo === 'salida');

    return (
      <div className="space-y-6 pb-24">
        <div className="bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center p-2">
              <DefaultLogo />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{currentUser.nombre}</h2>
              <p className="opacity-90">Legajo: {currentUser.legajo}</p>
              <p className="text-sm opacity-80">{currentUser.departamento}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MapPin" className="w-4 h-4" />
            <span>
              {location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Obteniendo ubicación...'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
          <div className="text-5xl font-bold text-gray-800 mb-2">
            {currentTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <div className="text-gray-600">
            {currentTime.toLocaleDateString('es-PY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 border-2 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">Tu Horario</h3>
          <div className="flex justify-between text-sm">
            <span className="text-blue-700">Entrada: <strong>{currentUser.horarioEntrada}</strong></span>
            <span className="text-blue-700">Salida: <strong>{currentUser.horarioSalida}</strong></span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleMarcacion('entrada')}
            disabled={hasEntrada}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              hasEntrada
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl active:scale-95'
            }`}
          >
            <Icon name="LogOut" className="w-8 h-8 mb-2 mx-auto transform rotate-180" />
            <div className="font-bold">Entrada</div>
          </button>

          <button
            onClick={() => handleMarcacion('salida_almuerzo')}
            disabled={!hasEntrada || hasAlmuerzo || hasSalida}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              !hasEntrada || hasAlmuerzo || hasSalida
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-xl active:scale-95'
            }`}
          >
            <Icon name="Coffee" className="w-8 h-8 mb-2 mx-auto" />
            <div className="font-bold text-sm">Salida Almuerzo</div>
          </button>

          <button
            onClick={() => handleMarcacion('regreso_almuerzo')}
            disabled={!hasAlmuerzo || hasRegresoAlmuerzo || hasSalida}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              !hasAlmuerzo || hasRegresoAlmuerzo || hasSalida
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white hover:shadow-xl active:scale-95'
            }`}
          >
            <Icon name="LogOut" className="w-8 h-8 mb-2 mx-auto transform rotate-180" />
            <div className="font-bold text-sm">Regreso Almuerzo</div>
          </button>

          <button
            onClick={() => handleMarcacion('salida')}
            disabled={!hasEntrada || hasSalida}
            className={`p-6 rounded-xl shadow-lg transition-all ${
              !hasEntrada || hasSalida
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-xl active:scale-95'
            }`}
          >
            <Icon name="LogOut" className="w-8 h-8 mb-2 mx-auto" />
            <div className="font-bold">Salida</div>
          </button>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">Solicitudes</h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleSolicitud('permiso')}
              className="bg-white border-2 border-purple-300 text-purple-700 p-4 rounded-xl hover:bg-purple-50 transition-all active:scale-95"
            >
              <Icon name="AlertCircle" className="w-6 h-6 mb-1 mx-auto" />
              <div className="text-sm font-semibold">Permiso</div>
            </button>
            <button
              onClick={() => handleSolicitud('vacaciones')}
              className="bg-white border-2 border-blue-300 text-blue-700 p-4 rounded-xl hover:bg-blue-50 transition-all active:scale-95"
            >
              <Icon name="Calendar" className="w-6 h-6 mb-1 mx-auto" />
              <div className="text-sm font-semibold">Vacaciones</div>
            </button>
            <button
              onClick={() => handleSolicitud('ausencia')}
              className="bg-white border-2 border-red-300 text-red-700 p-4 rounded-xl hover:bg-red-50 transition-all active:scale-95"
            >
              <Icon name="X" className="w-6 h-6 mb-1 mx-auto" />
              <div className="text-sm font-semibold">Ausencia</div>
            </button>
            <button
              onClick={() => handleSolicitud('llegada_tarde')}
              className="bg-white border-2 border-orange-300 text-orange-700 p-4 rounded-xl hover:bg-orange-50 transition-all active:scale-95"
            >
              <Icon name="Clock" className="w-6 h-6 mb-1 mx-auto" />
              <div className="text-sm font-semibold">Llegada Tarde</div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">Marcaciones de Hoy</h3>
          {todayRecords.length === 0 ? (
            <div className="bg-gray-50 rounded-xl p-6 text-center text-gray-500">
              <Icon name="Clock" className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No hay marcaciones registradas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {todayRecords.map((record) => (
                <div key={record.id} className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 capitalize">
                        {record.tipo.replace('_', ' ')}
                      </h4>
                      <p className="text-2xl font-bold text-[#38BDF8] mt-1">{record.hora}</p>
                      <p className="text-sm text-gray-500 flex items-center mt-2">
                        <Icon name="MapPin" className="w-3 h-3 mr-1" />
                        {record.ubicacion.lat.toFixed(4)}, {record.ubicacion.lng.toFixed(4)}
                      </p>
                    </div>
                    {record.estado !== 'normal' && (
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        record.estado === 'tarde' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {record.estado === 'tarde' ? 'Llegada Tarde' : 'Salida Anticipada'}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Vista Admin
  const AdminView = () => {
    const allRecords = getAllTodayRecords();
    const usuarios = Storage.get('usuarios') || [];
    const empleados = usuarios.filter(u => u.rol === 'empleado');
    const solicitudesPendientes = getPendingSolicitudes();

    const getEmpleadoStatus = (empleadoId) => {
      const marcaciones = allRecords.filter(m => m.usuarioId === empleadoId);
      
      const entrada = marcaciones.find(m => m.tipo === 'entrada');
      const salida = marcaciones.find(m => m.tipo === 'salida');

      if (!entrada) return { estado: 'ausente', entrada: null, salida: null };
      if (salida) return { estado: 'completo', entrada: entrada.hora, salida: salida.hora };
      if (entrada.estado === 'tarde') return { estado: 'tarde', entrada: entrada.hora, salida: null };
      return { estado: 'trabajando', entrada: entrada.hora, salida: null };
    };

    return (
      <div className="space-y-6 pb-24">
        <div className="bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] rounded-2xl p-6 text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-2">Panel Administrativo</h2>
          <p className="opacity-90">Recursos Humanos</p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <Icon name="Users" className="w-8 h-8 mx-auto text-green-500 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {empleados.filter(e => getEmpleadoStatus(e.id).estado !== 'ausente').length}
            </p>
            <p className="text-xs text-gray-600">Presentes</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <Icon name="AlertCircle" className="w-8 h-8 mx-auto text-orange-500 mb-2" />
            <p className="text-2xl font-bold text-gray-800">
              {empleados.filter(e => getEmpleadoStatus(e.id).estado === 'tarde').length}
            </p>
            <p className="text-xs text-gray-600">Llegadas Tarde</p>
          </div>
          <div className="bg-white rounded-xl p-4 shadow text-center">
            <Icon name="FileText" className="w-8 h-8 mx-auto text-purple-500 mb-2" />
            <p className="text-2xl font-bold text-gray-800">{solicitudesPendientes.length}</p>
            <p className="text-xs text-gray-600">Solicitudes</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddEmployeeModal(true)}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <Icon name="UserPlus" className="w-5 h-5" />
          <span>Agregar Nuevo Empleado</span>
        </button>

        {solicitudesPendientes.length > 0 && (
          <div>
            <h3 className="font-bold text-gray-800 mb-3">Solicitudes Pendientes</h3>
            <div className="space-y-3">
              {solicitudesPendientes.map((sol) => (
                <div key={sol.id} className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{sol.usuarioNombre}</h4>
                      <p className="text-sm text-gray-600">{sol.tipo}</p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                      Pendiente
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">Fecha: {sol.fecha}</p>
                  {sol.motivo && <p className="text-sm text-gray-500 mb-3 italic">"{sol.motivo}"</p>}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApproveSolicitud(sol.id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600 active:scale-95 transition-all"
                    >
                      Aprobar
                    </button>
                    <button 
                      onClick={() => handleRejectSolicitud(sol.id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 active:scale-95 transition-all"
                    >
                      Rechazar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="font-bold text-gray-800 mb-3">Estado del Personal</h3>
          <div className="space-y-3">
            {empleados.map((emp) => {
              const status = getEmpleadoStatus(emp.id);
              return (
                <div key={emp.id} className="bg-white rounded-xl p-4 shadow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-gray-800">{emp.nombre}</h4>
                      <p className="text-sm text-gray-500">Legajo: {emp.legajo}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      status.estado === 'completo' ? 'bg-green-100 text-green-700' :
                      status.estado === 'trabajando' ? 'bg-blue-100 text-blue-700' :
                      status.estado === 'tarde' ? 'bg-orange-100 text-orange-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {status.estado === 'completo' ? 'Completo' :
                       status.estado === 'trabajando' ? 'Trabajando' :
                       status.estado === 'tarde' ? 'Tarde' : 'Ausente'}
                    </span>
                  </div>
                  {status.entrada && (
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <span className="flex items-center">
                        <Icon name="Clock" className="w-4 h-4 mr-1 text-green-500" />
                        Entrada: {status.entrada}
                      </span>
                      {status.salida && (
                        <span className="flex items-center">
                          <Icon name="Clock" className="w-4 h-4 mr-1 text-red-500" />
                          Salida: {status.salida}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={generateReport}
          className="w-full bg-[#38BDF8] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#0EA5E9] transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <Icon name="Download" className="w-5 h-5" />
          <span>Descargar Reporte CSV</span>
        </button>

        <button 
          onClick={clearAllData}
          className="w-full bg-red-500 text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-red-600 transition-all flex items-center justify-center space-x-2 active:scale-95"
        >
          <Icon name="Trash2" className="w-5 h-5" />
          <span>Borrar Todos los Datos</span>
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-md mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8">
              <DefaultLogo />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Check de Asistencia</h1>
          </div>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-600">
            {menuOpen ? <Icon name="X" className="w-6 h-6" /> : <Icon name="Menu" className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="bg-white shadow-lg absolute top-16 right-4 rounded-xl p-4 z-50 w-64">
          <div className="space-y-2">
            <div className="px-4 py-2 border-b border-gray-200">
              <p className="text-sm font-semibold text-gray-700">{currentUser.nombre}</p>
              <p className="text-xs text-gray-500">{currentUser.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-50 text-red-600 font-semibold flex items-center space-x-2"
            >
              <Icon name="LogOut" className="w-4 h-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-md mx-auto px-4 py-6">
        {currentUser.rol === 'empleado' ? <EmpleadoView /> : <AdminView />}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4 capitalize">
              Solicitud de {modalType.replace('_', ' ')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Fecha(s)
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Motivo / Justificación
                </label>
                <textarea
                  value={justification}
                  onChange={(e) => setJustification(e.target.value)}
                  className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none h-24"
                  placeholder="Describe el motivo de tu solicitud..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 active:scale-95 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={submitSolicitud}
                disabled={!selectedDate || !justification}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  selectedDate && justification
                    ? 'bg-[#38BDF8] text-white hover:bg-[#0EA5E9] active:scale-95'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Enviar Solicitud
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddEmployeeModal && (
        <AddEmployeeModal
          onClose={() => setShowAddEmployeeModal(false)}
          onSave={() => setCurrentTime(new Date())}
        />
      )}
    </div>
  );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AttendanceSystem));
