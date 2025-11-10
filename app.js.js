const { useState, useEffect } = React;

// Componente de iconos SVG
const LucideIcon = ({ name, className = "", ...props }) => {
  const icons = {
    Clock: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
      </svg>
    ),
    MapPin: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>
    ),
    Coffee: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 8h1a4 4 0 1 1 0 8h-1"></path>
        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"></path>
        <line x1="6" y1="2" x2="6" y2="4"></line>
        <line x1="10" y1="2" x2="10" y2="4"></line>
        <line x1="14" y1="2" x2="14" y2="4"></line>
      </svg>
    ),
    LogOut: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
    ),
    Calendar: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
      </svg>
    ),
    AlertCircle: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    ),
    Menu: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
    X: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    ),
    BarChart3: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M3 3v18h18"></path>
        <path d="M18 17V9"></path>
        <path d="M13 17V5"></path>
        <path d="M8 17v-3"></path>
      </svg>
    ),
    Users: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
    FileText: () => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    )
  };
  
  const Icon = icons[name];
  return Icon ? <Icon /> : null;
};

const AttendanceSystem = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [location, setLocation] = useState(null);
  const [todayRecords, setTodayRecords] = useState([]);
  const [view, setView] = useState('empleado');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [justification, setJustification] = useState('');
  const [selectedDate, setSelectedDate] = useState('');

  const currentUser = {
    nombre: 'Ana García',
    legajo: '1234',
    departamento: 'Administración',
    horarioEntrada: '08:00',
    horarioSalida: '17:00'
  };

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        () => {
          setLocation({ lat: -25.2637, lng: -57.5759, accuracy: 0 });
        }
      );
    } else {
      setLocation({ lat: -25.2637, lng: -57.5759, accuracy: 0 });
    }

    const recordsEjemplo = [
      {
        id: 1,
        tipo: 'entrada',
        hora: '08:05',
        ubicacion: { lat: -25.2637, lng: -57.5759 },
        estado: 'tarde'
      }
    ];
    setTodayRecords(recordsEjemplo);

    return () => clearInterval(timer);
  }, []);

  const handleMarcacion = (tipo) => {
    const now = new Date();
    const horaActual = now.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit' });
    
    let estado = 'normal';
    if (tipo === 'entrada' && horaActual > currentUser.horarioEntrada) {
      estado = 'tarde';
    } else if (tipo === 'salida' && horaActual < currentUser.horarioSalida) {
      estado = 'anticipada';
    }

    const newRecord = {
      id: todayRecords.length + 1,
      tipo,
      hora: horaActual,
      ubicacion: location,
      estado,
      fecha: now.toISOString().split('T')[0]
    };

    setTodayRecords([...todayRecords, newRecord]);
  };

  const handleSolicitud = (tipo) => {
    setModalType(tipo);
    setShowModal(true);
  };

  const submitSolicitud = () => {
    console.log('Solicitud enviada:', { tipo: modalType, justification, selectedDate });
    setShowModal(false);
    setJustification('');
    setSelectedDate('');
  };

  const EmpleadoView = () => {
    const hasEntrada = todayRecords.some(r => r.tipo === 'entrada');
    const hasAlmuerzo = todayRecords.some(r => r.tipo === 'salida_almuerzo');
    const hasRegresoAlmuerzo = todayRecords.some(r => r.tipo === 'regreso_almuerzo');
    const hasSalida = todayRecords.some(r => r.tipo === 'salida');

    return React.createElement('div', { className: 'space-y-6 pb-24' },
      React.createElement('div', { className: 'bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] rounded-2xl p-6 text-white shadow-lg' },
        React.createElement('div', { className: 'flex items-center space-x-4 mb-4' },
          React.createElement('div', { className: 'w-16 h-16 bg-white rounded-full flex items-center justify-center' },
            React.createElement('img', { 
              src: 'https://github.com/user-attachments/assets/b8c8e5dc-bfa1-485c-a9f9-84332c5ef7d1', 
              alt: 'Logo', 
              className: 'w-12 h-12' 
            })
          ),
          React.createElement('div', null,
            React.createElement('h2', { className: 'text-2xl font-bold' }, currentUser.nombre),
            React.createElement('p', { className: 'opacity-90' }, 'Legajo: ', currentUser.legajo),
            React.createElement('p', { className: 'text-sm opacity-80' }, currentUser.departamento)
          )
        ),
        React.createElement('div', { className: 'flex items-center space-x-2 text-sm' },
          React.createElement(LucideIcon, { name: 'MapPin', className: 'w-4 h-4' }),
          React.createElement('span', null,
            location ? `${location.lat.toFixed(4)}, ${location.lng.toFixed(4)}` : 'Obteniendo ubicación...'
          )
        )
      ),
      React.createElement('div', { className: 'bg-white rounded-2xl p-6 shadow-lg text-center' },
        React.createElement('div', { className: 'text-5xl font-bold text-gray-800 mb-2' },
          currentTime.toLocaleTimeString('es-PY', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
        ),
        React.createElement('div', { className: 'text-gray-600' },
          currentTime.toLocaleDateString('es-PY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
        )
      ),
      React.createElement('div', { className: 'bg-blue-50 rounded-xl p-4 border-2 border-blue-200' },
        React.createElement('h3', { className: 'font-semibold text-blue-900 mb-2' }, 'Tu Horario'),
        React.createElement('div', { className: 'flex justify-between text-sm' },
          React.createElement('span', { className: 'text-blue-700' }, 
            'Entrada: ', React.createElement('strong', null, currentUser.horarioEntrada)
          ),
          React.createElement('span', { className: 'text-blue-700' }, 
            'Salida: ', React.createElement('strong', null, currentUser.horarioSalida)
          )
        )
      ),
      React.createElement('div', { className: 'grid grid-cols-2 gap-4' },
        React.createElement('button', {
          onClick: () => handleMarcacion('entrada'),
          disabled: hasEntrada,
          className: `p-6 rounded-xl shadow-lg transition-all ${
            hasEntrada
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-green-500 to-green-600 text-white hover:shadow-xl'
          }`
        },
          React.createElement(LucideIcon, { name: 'LogOut', className: 'w-8 h-8 mb-2 mx-auto transform rotate-180' }),
          React.createElement('div', { className: 'font-bold' }, 'Entrada')
        ),
        React.createElement('button', {
          onClick: () => handleMarcacion('salida_almuerzo'),
          disabled: !hasEntrada || hasAlmuerzo || hasSalida,
          className: `p-6 rounded-xl shadow-lg transition-all ${
            !hasEntrada || hasAlmuerzo || hasSalida
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white hover:shadow-xl'
          }`
        },
          React.createElement(LucideIcon, { name: 'Coffee', className: 'w-8 h-8 mb-2 mx-auto' }),
          React.createElement('div', { className: 'font-bold text-sm' }, 'Salida Almuerzo')
        ),
        React.createElement('button', {
          onClick: () => handleMarcacion('regreso_almuerzo'),
          disabled: !hasAlmuerzo || hasRegresoAlmuerzo || hasSalida,
          className: `p-6 rounded-xl shadow-lg transition-all ${
            !hasAlmuerzo || hasRegresoAlmuerzo || hasSalida
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white hover:shadow-xl'
          }`
        },
          React.createElement(LucideIcon, { name: 'LogOut', className: 'w-8 h-8 mb-2 mx-auto transform rotate-180' }),
          React.createElement('div', { className: 'font-bold text-sm' }, 'Regreso Almuerzo')
        ),
        React.createElement('button', {
          onClick: () => handleMarcacion('salida'),
          disabled: !hasEntrada || hasSalida,
          className: `p-6 rounded-xl shadow-lg transition-all ${
            !hasEntrada || hasSalida
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-br from-red-500 to-red-600 text-white hover:shadow-xl'
          }`
        },
          React.createElement(LucideIcon, { name: 'LogOut', className: 'w-8 h-8 mb-2 mx-auto' }),
          React.createElement('div', { className: 'font-bold' }, 'Salida')
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', { className: 'font-bold text-gray-800 mb-3' }, 'Solicitudes'),
        React.createElement('div', { className: 'grid grid-cols-2 gap-3' },
          React.createElement('button', {
            onClick: () => handleSolicitud('permiso'),
            className: 'bg-white border-2 border-purple-300 text-purple-700 p-4 rounded-xl hover:bg-purple-50 transition-all'
          },
            React.createElement(LucideIcon, { name: 'AlertCircle', className: 'w-6 h-6 mb-1 mx-auto' }),
            React.createElement('div', { className: 'text-sm font-semibold' }, 'Permiso')
          ),
          React.createElement('button', {
            onClick: () => handleSolicitud('vacaciones'),
            className: 'bg-white border-2 border-blue-300 text-blue-700 p-4 rounded-xl hover:bg-blue-50 transition-all'
          },
            React.createElement(LucideIcon, { name: 'Calendar', className: 'w-6 h-6 mb-1 mx-auto' }),
            React.createElement('div', { className: 'text-sm font-semibold' }, 'Vacaciones')
          ),
          React.createElement('button', {
            onClick: () => handleSolicitud('ausencia'),
            className: 'bg-white border-2 border-red-300 text-red-700 p-4 rounded-xl hover:bg-red-50 transition-all'
          },
            React.createElement(LucideIcon, { name: 'X', className: 'w-6 h-6 mb-1 mx-auto' }),
            React.createElement('div', { className: 'text-sm font-semibold' }, 'Ausencia')
          ),
          React.createElement('button', {
            onClick: () => handleSolicitud('llegada_tarde'),
            className: 'bg-white border-2 border-orange-300 text-orange-700 p-4 rounded-xl hover:bg-orange-50 transition-all'
          },
            React.createElement(LucideIcon, { name: 'Clock', className: 'w-6 h-6 mb-1 mx-auto' }),
            React.createElement('div', { className: 'text-sm font-semibold' }, 'Llegada Tarde')
          )
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', { className: 'font-bold text-gray-800 mb-3' }, 'Marcaciones de Hoy'),
        todayRecords.length === 0 
          ? React.createElement('div', { className: 'bg-gray-50 rounded-xl p-6 text-center text-gray-500' },
              React.createElement(LucideIcon, { name: 'Clock', className: 'w-12 h-12 mx-auto mb-2 opacity-50' }),
              React.createElement('p', null, 'No hay marcaciones registradas')
            )
          : React.createElement('div', { className: 'space-y-3' },
              todayRecords.map((record) =>
                React.createElement('div', { key: record.id, className: 'bg-white rounded-xl p-4 shadow' },
                  React.createElement('div', { className: 'flex justify-between items-start' },
                    React.createElement('div', null,
                      React.createElement('h4', { className: 'font-semibold text-gray-800 capitalize' },
                        record.tipo.replace('_', ' ')
                      ),
                      React.createElement('p', { className: 'text-2xl font-bold text-[#38BDF8] mt-1' }, record.hora),
                      React.createElement('p', { className: 'text-sm text-gray-500 flex items-center mt-2' },
                        React.createElement(LucideIcon, { name: 'MapPin', className: 'w-3 h-3 mr-1' }),
                        `${record.ubicacion.lat.toFixed(4)}, ${record.ubicacion.lng.toFixed(4)}`
                      )
                    ),
                    record.estado !== 'normal' && React.createElement('span', {
                      className: `px-3 py-1 rounded-full text-xs font-semibold ${
                        record.estado === 'tarde' ? 'bg-orange-100 text-orange-700' : 'bg-yellow-100 text-yellow-700'
                      }`
                    },
                      record.estado === 'tarde' ? 'Llegada Tarde' : 'Salida Anticipada'
                    )
                  )
                )
              )
            )
      )
    );
  };

  const AdminView = () => {
    const empleados = [
      { id: 1, nombre: 'Juan Pérez', legajo: '1001', entrada: '08:00', salida: null, estado: 'trabajando' },
      { id: 2, nombre: 'María López', legajo: '1002', entrada: '07:55', salida: '17:05', estado: 'completo' },
      { id: 3, nombre: 'Carlos Gómez', legajo: '1003', entrada: '08:15', salida: null, estado: 'tarde' },
      { id: 4, nombre: 'Ana García', legajo: '1234', entrada: '08:05', salida: null, estado: 'trabajando' },
    ];

    const solicitudesPendientes = [
      { id: 1, empleado: 'Pedro Martínez', tipo: 'Vacaciones', fecha: '2025-11-05 al 2025-11-12', estado: 'pendiente' },
      { id: 2, empleado: 'Laura Benítez', tipo: 'Permiso', fecha: '2025-11-01', motivo: 'Trámite personal', estado: 'pendiente' },
    ];

    return React.createElement('div', { className: 'space-y-6 pb-24' },
      React.createElement('div', { className: 'bg-gradient-to-br from-[#7DD3FC] to-[#38BDF8] rounded-2xl p-6 text-white shadow-lg' },
        React.createElement('h2', { className: 'text-2xl font-bold mb-2' }, 'Panel Administrativo'),
        React.createElement('p', { className: 'opacity-90' }, 'Recursos Humanos')
      ),
      React.createElement('div', { className: 'grid grid-cols-3 gap-3' },
        React.createElement('div', { className: 'bg-white rounded-xl p-4 shadow text-center' },
          React.createElement(LucideIcon, { name: 'Users', className: 'w-8 h-8 mx-auto text-green-500 mb-2' }),
          React.createElement('p', { className: 'text-2xl font-bold text-gray-800' },
            empleados.filter(e => e.estado !== 'ausente').length
          ),
          React.createElement('p', { className: 'text-xs text-gray-600' }, 'Presentes')
        ),
        React.createElement('div', { className: 'bg-white rounded-xl p-4 shadow text-center' },
          React.createElement(LucideIcon, { name: 'AlertCircle', className: 'w-8 h-8 mx-auto text-orange-500 mb-2' }),
          React.createElement('p', { className: 'text-2xl font-bold text-gray-800' },
            empleados.filter(e => e.estado === 'tarde').length
          ),
          React.createElement('p', { className: 'text-xs text-gray-600' }, 'Llegadas Tarde')
        ),
        React.createElement('div', { className: 'bg-white rounded-xl p-4 shadow text-center' },
          React.createElement(LucideIcon, { name: 'FileText', className: 'w-8 h-8 mx-auto text-purple-500 mb-2' }),
          React.createElement('p', { className: 'text-2xl font-bold text-gray-800' }, solicitudesPendientes.length),
          React.createElement('p', { className: 'text-xs text-gray-600' }, 'Solicitudes')
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', { className: 'font-bold text-gray-800 mb-3' }, 'Solicitudes Pendientes'),
        React.createElement('div', { className: 'space-y-3' },
          solicitudesPendientes.map((sol) =>
            React.createElement('div', { key: sol.id, className: 'bg-white rounded-xl p-4 shadow' },
              React.createElement('div', { className: 'flex justify-between items-start mb-2' },
                React.createElement('div', null,
                  React.createElement('h4', { className: 'font-semibold text-gray-800' }, sol.empleado),
                  React.createElement('p', { className: 'text-sm text-gray-600' }, sol.tipo)
                ),
                React.createElement('span', { className: 'px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700' },
                  'Pendiente'
                )
              ),
              React.createElement('p', { className: 'text-sm text-gray-600 mb-3' }, sol.fecha),
              sol.motivo && React.createElement('p', { className: 'text-sm text-gray-500 mb-3 italic' }, '"', sol.motivo, '"'),
              React.createElement('div', { className: 'flex gap-2' },
                React.createElement('button', { className: 'flex-1 bg-green-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-600' },
                  'Aprobar'
                ),
                React.createElement('button', { className: 'flex-1 bg-red-500 text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600' },
                  'Rechazar'
                )
              )
            )
          )
        )
      ),
      React.createElement('div', null,
        React.createElement('h3', { className: 'font-bold text-gray-800 mb-3' }, 'Estado del Personal'),
        React.createElement('div', { className: 'space-y-3' },
          empleados.map((emp) =>
            React.createElement('div', { key: emp.id, className: 'bg-white rounded-xl p-4 shadow' },
              React.createElement('div', { className: 'flex justify-between items-start mb-2' },
                React.createElement('div', null,
                  React.createElement('h4', { className: 'font-semibold text-gray-800' }, emp.nombre),
                  React.createElement('p', { className: 'text-sm text-gray-500' }, 'Legajo: ', emp.legajo)
                ),
                React.createElement('span', {
                  className: `px-3 py-1 rounded-full text-xs font-semibold ${
                    emp.estado === 'completo' ? 'bg-green-100 text-green-700' :
                    emp.estado === 'trabajando' ? 'bg-blue-100 text-blue-700' :
                    emp.estado === 'tarde' ? 'bg-orange-100 text-orange-700' :
                    'bg-red-100 text-red-700'
                  }`
                },
                  emp.estado === 'completo' ? 'Completo' :
                  emp.estado === 'trabajando' ? 'Trabajando' :
                  emp.estado === 'tarde' ? 'Tarde' : 'Ausente'
                )
              ),
              React.createElement('div', { className: 'flex items-center text-sm text-gray-600 space-x-4' },
                React.createElement('span', { className: 'flex items-center' },
                  React.createElement(LucideIcon, { name: 'Clock', className: 'w-4 h-4 mr-1 text-green-500' }),
                  'Entrada: ', emp.entrada
                ),
                emp.salida && React.createElement('span', { className: 'flex items-center' },
                  React.createElement(LucideIcon, { name: 'Clock', className: 'w-4 h-4 mr-1 text-red-500' }),
                  'Salida: ', emp.salida
                )
              )
            )
          )
        )
      ),
      React.createElement('button', { className: 'w-full bg-[#38BDF8] text-white py-4 rounded-xl font-semibold shadow-lg hover:bg-[#0EA5E9] transition-all flex items-center justify-center space-x-2' },
        React.createElement(LucideIcon, { name: 'BarChart3', className: 'w-5 h-5' }),
        React.createElement('span', null, 'Generar Reporte Mensual')
      )
    );
  };

  return React.createElement('div', { className: 'min-h-screen bg-gray-100' },
    React.createElement('div', { className: 'bg-white shadow-md sticky top-0 z-50' },
      React.createElement('div', { className: 'max-w-md mx-auto px-4 py-4 flex justify-between items-center' },
        React.createElement('div', { className: 'flex items-center space-x-3' },
          React.createElement('img', { 
            src: 'https://github.com/user-attachments/assets/b8c8e5dc-bfa1-485c-a9f9-84332c5ef7d1', 
            alt: 'Logo', 
            className: 'w-8 h-8' 
          }),
          React.createElement('h1', { className: 'text-xl font-bold text-gray-800' }, 'Check de Asistencia')
        ),
        React.createElement('button', { 
          onClick: () => setMenuOpen(!menuOpen), 
          className: 'text-gray-600' 
        },
          menuOpen 
            ? React.createElement(LucideIcon, { name: 'X', className: 'w-6 h-6' })
            : React.createElement(LucideIcon, { name: 'Menu', className: 'w-6 h-6' })
        )
      )
    ),
    menuOpen && React.createElement('div', { className: 'bg-white shadow-lg absolute top-16 right-4 rounded-xl p-4 z-50 w-64' },
      React.createElement('div', { className: 'space-y-2' },
        React.createElement('button', {
          onClick: () => { setView('empleado'); setMenuOpen(false); },
          className: `w-full text-left px-4 py-2 rounded-lg ${view === 'empleado' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`
        }, 'Vista Empleado'),
        React.createElement('button', {
          onClick: () => { setView('admin'); setMenuOpen(false); },
          className: `w-full text-left px-4 py-2 rounded-lg ${view === 'admin' ? 'bg-blue-100 text-blue-700' : 'hover:bg-gray-100'}`
        }, 'Vista Administrador')
      )
    ),
    React.createElement('div', { className: 'max-w-md mx-auto px-4 py-6' },
      view === 'empleado' ? React.createElement(EmpleadoView) : React.createElement(AdminView)
    ),
    showModal && React.createElement('div', { className: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4' },
      React.createElement('div', { className: 'bg-white rounded-2xl p-6 max-w-md w-full' },
        React.createElement('h3', { className: 'text-xl font-bold text-gray-800 mb-4 capitalize' },
          'Solicitud de ', modalType.replace('_', ' ')
        ),
        React.createElement('div', { className: 'space-y-4' },
          React.createElement('div', null,
            React.createElement('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' },
              'Fecha(s)'
            ),
            React.createElement('input', {
              type: 'date',
              value: selectedDate,
              onChange: (e) => setSelectedDate(e.target.value),
              className: 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none'
            })
          ),
          React.createElement('div', null,
            React.createElement('label', { className: 'block text-sm font-semibold text-gray-700 mb-2' },
              'Motivo / Justificación'
            ),
            React.createElement('textarea', {
              value: justification,
              onChange: (e) => setJustification(e.target.value),
              className: 'w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-[#38BDF8] focus:outline-none h-24',
              placeholder: 'Describe el motivo de tu solicitud...'
            })
          )
        ),
        React.createElement('div', { className: 'flex gap-3 mt-6' },
          React.createElement('button', {
            onClick: () => setShowModal(false),
            className: 'flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300'
          }, 'Cancelar'),
          React.createElement('button', {
            onClick: submitSolicitud,
            disabled: !selectedDate || !justification,
            className: `flex-1 py-3 rounded-lg font-semibold ${
              selectedDate && justification
                ? 'bg-[#38BDF8] text-white hover:bg-[#0EA5E9]'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`
          }, 'Enviar Solicitud')
        )
      )
    )
  );
};

// Renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(AttendanceSystem));