import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { API_URL } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export default function AuthPage() {
  const { request, loading, error, clearError } = useHttp();
  const auth = useContext(AuthContext);

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const loginHandler = async () => {
    clearError();
    try {
      const data = await request(`${API_URL}/User/Authenticate`, 'POST', {
        ...form,
      });
      console.log(data);
      auth.login(data.token, data.id);
    } catch (e) {}
  };
  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center-align">TravelGuide</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизация</span>
            <div>
              <div className="input-field">
                <input
                  placeholder="Введите логин"
                  id="username"
                  type="text"
                  name="username"
                  className="yellow-input"
                  value={form.username}
                  onChange={changeHandler}
                />
                <label htmlFor="username" className="active">
                  Логин
                </label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите пароль"
                  id="password"
                  type="password"
                  name="password"
                  className="yellow-input"
                  value={form.password}
                  onChange={changeHandler}
                />
                <label htmlFor="password" className="active">
                  Пароль
                </label>
              </div>

              <div>{error && <p className="error">{error}</p>}</div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={loginHandler}
              disabled={loading}
            >
              Войти
            </button>
            <Link to={!loading ? '/Registration' : '#'} disabled={loading}>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
              >
                Регистрация
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
