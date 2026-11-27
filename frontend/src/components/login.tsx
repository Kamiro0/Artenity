import React, { useState } from 'react';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';

import brushImg from '../assets/img/loginmusic.png';
import logoImg from '../assets/img/logo.png';
import googleImg from '../assets/img/google.png';
import facebookImg from '../assets/img/facebook.png';
import discordImg from '../assets/img/discord.png';
import instagramImg from '../assets/img/instagram.png';

import { loginWithGoogle, loginWithFacebook } from '../services/firebase';
import { loginUsuario } from '../services/api';
import { useAuth } from '../context/AuthContext';
import ForgotPassword from './ForgotPassword';

const Login: React.FC = () => {
  const [correo_electronico, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await loginUsuario(correo_electronico, contrasena);

      if (res && res.token) {
        login(res.token, res.usuario);
        navigate('/principal');
      } else {
        alert('❌ No se recibió token válido. Verifica el backend.');
      }
    } catch {
      alert('❌ Credenciales incorrectas o error de conexión');
    }
  };

  // -----------------------------------------
  //  LOGIN GOOGLE
  // -----------------------------------------
  const googleLogin = async () => {
    try {
      const result = await loginWithGoogle();
      const email = result.user.email;

      if (!email) {
        alert('❌ No se pudo obtener el correo del usuario.');
        return;
      }

      const res = await loginUsuario(email, 'firebase_oauth');
      login(res.token, res.usuario);
      navigate('/principal');
    } catch {
      alert('❌ Error iniciando sesión con Google');
    }
  };

  // -----------------------------------------
  //  LOGIN FACEBOOK
  // -----------------------------------------
  const facebookLogin = async () => {
    try {
      const result = await loginWithFacebook();
      const email = result.user.email;

      if (!email) {
        alert('❌ Facebook no devolvió un email válido.');
        return;
      }

      const res = await loginUsuario(email, 'firebase_oauth');
      login(res.token, res.usuario);
      navigate('/principal');
    } catch {
      alert('❌ Error iniciando sesión con Facebook');
    }
  };

  return (
    <main className="auth-page">
      <img src={brushImg} alt="" aria-hidden="true" className="auth-art auth-art-top-left" />
      <img src={brushImg} alt="" aria-hidden="true" className="auth-art auth-art-bottom-right" />
      <span className="auth-note auth-note-one" aria-hidden="true">
        ♪
      </span>
      <span className="auth-note auth-note-two" aria-hidden="true">
        ♫
      </span>
      <span className="auth-note auth-note-three" aria-hidden="true">
        ♬
      </span>

      <section className="auth-panel" aria-labelledby="login-title">
        <div className="header-box">
          <button
            className="logo-btn"
            type="button"
            onClick={() => navigate('/')}
            aria-label="Volver a la página principal de Artevora"
          >
            <img src={logoImg} alt="" className="logo" />
          </button>
          <div>
            <h1 id="login-title">ARTEVORA</h1>
            <p className="auth-tagline">Un universo donde el arte cobra vida</p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="login-email">CORREO ELECTRÓNICO</label>
            <input
              id="login-email"
              type="email"
              placeholder="CORREO ELECTRÓNICO"
              value={correo_electronico}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="login-password">CONTRASEÑA</label>
            <input
              id="login-password"
              type="password"
              placeholder="CONTRASEÑA"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="auth-primary-btn">
            Iniciar Sesión!!
          </button>
        </form>

        <div className="social-icons">
          <button
            type="button"
            className="social-login"
            onClick={googleLogin}
            aria-label="Iniciar sesión con Google"
          >
            <img src={googleImg} alt="" />
          </button>
          <button
            type="button"
            className="social-login"
            onClick={facebookLogin}
            aria-label="Iniciar sesión con Facebook"
          >
            <img src={facebookImg} alt="" />
          </button>
          <button
            type="button"
            className="social-login"
            onClick={() => (window.location.href = '/oauth/discord')}
            aria-label="Iniciar sesión con Discord"
          >
            <img src={discordImg} alt="" />
          </button>
          <button
            type="button"
            className="social-login"
            onClick={() => (window.location.href = '/oauth/instagram')}
            aria-label="Iniciar sesión con Instagram"
          >
            <img src={instagramImg} alt="" />
          </button>
        </div>

        <p className="register">
          ¿No tienes una cuenta? <Link to="/register">Regístrate</Link>
          <br />
          <button
            type="button"
            className="forgot-password-trigger"
            aria-haspopup="dialog"
            aria-expanded={mostrarRecuperacion}
            onClick={() => setMostrarRecuperacion(true)}
          >
            Olvidé mi contraseña
          </button>
        </p>
      </section>
      {mostrarRecuperacion && <ForgotPassword onClose={() => setMostrarRecuperacion(false)} />}
    </main>
  );
};

export default Login;
