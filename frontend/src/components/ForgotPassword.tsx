import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../services/api';

type ForgotPasswordProps = {
  onClose?: () => void;
};

export default function ForgotPassword({ onClose }: ForgotPasswordProps) {
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!onClose) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCargando(true);
    setMensaje('');
    setError('');

    try {
      const response = await fetch(`${API_URL}/olvidaste-contrasena`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });

      const data = await response.json();
      if (response.ok) {
        setMensaje(data.mensaje);
      } else {
        setError(data.detail || 'Error al procesar la solicitud.');
      }
    } catch {
      setError('No se pudo conectar con el servidor.');
    } finally {
      setCargando(false);
    }
  };

  const dialog = (
    <section
      id="forgot-password-dialog"
      className="auth-panel forgot-password-dialog"
      role={onClose ? 'dialog' : undefined}
      aria-modal={onClose ? true : undefined}
      aria-labelledby="forgot-password-title"
      onClick={(event) => event.stopPropagation()}
    >
      {onClose ? (
        <button
          type="button"
          className="forgot-password-close"
          onClick={onClose}
          aria-label="Cerrar recuperación de contraseña"
        >
          ×
        </button>
      ) : null}

      <h2 id="forgot-password-title">Recuperar contraseña</h2>
      <p className="forgot-password-description">
        Te enviaremos un enlace para restablecer tu contraseña.
      </p>

      <form className="forgot-password-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="forgot-password-email">Correo electrónico</label>
          <input
            id="forgot-password-email"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            autoFocus={Boolean(onClose)}
            required
          />
        </div>

        <button type="submit" className="auth-primary-btn" disabled={cargando}>
          {cargando ? 'Enviando...' : 'Enviar enlace de recuperación'}
        </button>
      </form>

      {mensaje && (
        <p className="forgot-password-message success" role="status">
          {mensaje}
        </p>
      )}
      {error && (
        <p className="forgot-password-message error" role="alert">
          {error}
        </p>
      )}

      {!onClose && (
        <button type="button" className="forgot-password-return" onClick={() => navigate('/login')}>
          Volver al inicio de sesión
        </button>
      )}
    </section>
  );

  if (onClose) {
    return (
      <div className="forgot-password-backdrop" onClick={onClose}>
        {dialog}
      </div>
    );
  }

  return <main className="auth-page forgot-password-page">{dialog}</main>;
}
