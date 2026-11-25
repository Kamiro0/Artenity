import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/categorias.css';
import { getCategorias } from '../services/api';

interface Categoria {
  id_categoria: number;
  nombre: string;
  descripcion: string;
}

const useAuth = () => ({
  token: localStorage.getItem('token'),
  usuario: JSON.parse(localStorage.getItem('usuario') || '{}'),
});

const CategoriasPage: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    const fetchCategorias = async () => {
      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const data = await getCategorias();
        setCategorias(data);
        setError(null);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
        setError('Error al cargar las categorías. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategorias();
  }, [token, navigate]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/busqueda?q=${encodeURIComponent(searchTerm)}&type=categoria`);
    }
  };

  const handleCategoryClick = (categoria: Categoria) => {
    navigate(
      `/busqueda?categoria=${encodeURIComponent(categoria.nombre)}&id=${categoria.id_categoria}`
    );
  };

  const filteredCategorias = categorias.filter(
    (cat) =>
      cat.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (nombre: string) => {
    const lowerName = nombre.toLowerCase();

    if (lowerName.includes('danza')) return '💃';
    if (lowerName.includes('música')) return '🎵';
    if (lowerName.includes('cine')) return '🎬';
    if (lowerName.includes('literatura')) return '📚';
    if (lowerName.includes('visuales')) return '🎨';
    if (lowerName.includes('arquitectura')) return '🏛️';
    if (lowerName.includes('pintura')) return '🖼️';
    if (lowerName.includes('teatro')) return '🎭';
    if (lowerName.includes('escultura')) return '🗿';
    if (lowerName.includes('fotografía')) return '📸';

    return '🎨';
  };

  const getColorClass = (nombre: string) => {
    const hash = nombre.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5', 'color-6'];
    return colors[hash % colors.length];
  };

  if (loading) {
    return (
      <div className="categorias-loading">
        <div className="spinner"></div>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="categorias-error">
        <div className="error-icon">⚠️</div>
        <h2>Error al cargar</h2>
        <p>{error}</p>
        <button onClick={() => window.location.reload()} className="reload-btn">
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="categorias-container">
      {/* Fondo decorativo */}
      <div className="background-art"></div>

      <div className="categorias-content">
        <header className="categorias-header">
          <h1 className="categorias-title">
            <span className="title-gradient">Explora el Mundo del Arte</span>
          </h1>
          <p className="categorias-subtitle">
            Descubre y conecta con diferentes expresiones artísticas
          </p>
        </header>

        {/* Barra de búsqueda */}
        <form onSubmit={handleSearch} className="search-container">
          <div className="search-box">
            <input
              type="text"
              placeholder="BUSCAR UNA CATEGORÍA ESPECÍFICA..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-btn">
              <svg className="search-icon" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" fill="none" stroke="currentColor" strokeWidth="2" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </form>

        {/* Estadísticas */}
        <div className="categorias-stats">
          <div className="stat-card">
            <div className="stat-number">{categorias.length}</div>
            <div className="stat-label">Categorías</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">∞</div>
            <div className="stat-label">Oportunidades</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Creatividad</div>
          </div>
        </div>

        {/* Grid de categorías */}
        <div className="categorias-grid">
          {filteredCategorias.length > 0 ? (
            filteredCategorias.map((cat) => (
              <div
                key={cat.id_categoria}
                className={`categoria-card ${getColorClass(cat.nombre)}`}
                onClick={() => handleCategoryClick(cat)}
              >
                <div className="categoria-icon">
                  <span className="icon-emoji">{getIcon(cat.nombre)}</span>
                </div>
                <div className="categoria-content">
                  <h3 className="categoria-name">{cat.nombre}</h3>
                  <p className="categoria-description">{cat.descripcion}</p>
                </div>
                <div className="categoria-footer">
                  <span className="explore-text">Explorar →</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No se encontraron resultados</h3>
              <p>No hay categorías que coincidan con &quot;{searchTerm}&quot;</p>
              <button onClick={() => setSearchTerm('')} className="clear-search-btn">
                Limpiar búsqueda
              </button>
            </div>
          )}
        </div>

        {/* Información adicional */}
        <div className="categorias-info">
          <div className="info-card">
            <h3>💡 Consejo</h3>
            <p>Haz clic en cualquier categoría para explorar publicaciones relacionadas</p>
          </div>
          <div className="info-card">
            <h3>🎯 Propósito</h3>
            <p>Conecta artistas y entusiastas de todas las disciplinas artísticas</p>
          </div>
          <button onClick={() => navigate('/principal')} className="back-btn">
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoriasPage;
