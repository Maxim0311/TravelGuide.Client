import React, { useState } from 'react';
import { API_URL } from '../api';
import { useHttp } from '../hooks/http.hook';
import { Link } from 'react-router-dom';

export default function RegistrationPage() {
  const { request, loading, error, clearError } = useHttp();

  const [form, setForm] = useState({
    username: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
  });

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registrationHandler = async () => {
    clearError();
    console.log(error);
    try {
      const data = await request(`${API_URL}/User/Registration`, 'POST', {
        ...form,
      });
      console.log(data);
    } catch (e) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1 className="center-align">TravelGuide</h1>
        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Регистрация</span>
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
                  placeholder="Введите имя"
                  id="firstName"
                  type="text"
                  name="firstName"
                  className="yellow-input"
                  value={form.firstName}
                  onChange={changeHandler}
                />
                <label htmlFor="firstName" className="active">
                  Имя
                </label>
              </div>

              <div className="input-field">
                <input
                  placeholder="Введите фамилию"
                  id="lastName"
                  type="text"
                  name="lastName"
                  className="yellow-input"
                  value={form.lastName}
                  onChange={changeHandler}
                />
                <label htmlFor="lastName" className="active">
                  Фамилия
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

              <div className="input-field">
                <input
                  placeholder="Повторите пароль"
                  id="passwordConfirm"
                  type="password"
                  name="passwordConfirm"
                  className="yellow-input"
                  value={form.passwordConfirm}
                  onChange={changeHandler}
                />
                <label htmlFor="passwordConfirm" className="active">
                  Подтверждение пароля
                </label>
              </div>

              <div>{error && <p className="error">{error}</p>}</div>
            </div>
          </div>
          <div className="card-action">
            <button
              className="btn yellow darken-4"
              onClick={registrationHandler}
              disabled={loading}
            >
              Зарегистрироваться
            </button>
            <Link to={!loading ? '/Auth' : '#'} disabled={loading}>
              <button
                className="btn grey lighten-1 black-text"
                disabled={loading}
              >
                Войти
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
