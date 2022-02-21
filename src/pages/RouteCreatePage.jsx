import React, { useContext, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { API_URL } from '../api';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';

export default function RouteCreatePage() {
  const auth = useContext(AuthContext);

  const { request, loading, error, clearError } = useHttp();

  const [form, setForm] = useState({
    title: '',
    country: '',
    rating: 0,
    userId: auth.userId,
    points: [],
  });

  const [points, setPoints] = useState([]);

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log(form);
  };

  const mapHandler = (e) => {
    let coords = e.get('coords');
    let point = { title: 'test', latitude: coords[0], longitude: coords[1] };
    points.push(point);
    setPoints([...points]);
  };

  const removePoint = (index) => {
    let newArr = points.filter((el, i) => i != index);
    setPoints([...newArr]);
  };

  const submitHandler = () => {
    setForm({ ...form, points: points });
    clearError();
    try {
      const data = request(`${API_URL}/Route/CreateRoute`, 'POST', {
        ...form,
      });

      console.log(data);
    } catch {}
  };

  return (
    <div>
      <h3 className="center-align">Создание нового маршрута</h3>

      <div className="row">
        <div className="col s6 offset-s3">
          <div className="card blue darken-1">
            <div className="card-content white-text">
              <span className="card-title">Информация о маршруте</span>
              <div>
                <div className="input-field">
                  <input
                    placeholder="Введите название маршрута"
                    id="title"
                    type="text"
                    name="title"
                    className="yellow-input"
                    value={form.title}
                    onChange={changeHandler}
                  />
                  <label htmlFor="title" className="active">
                    Название маршрута
                  </label>
                </div>

                <div className="input-field">
                  <input
                    placeholder="Введите страну"
                    id="country"
                    type="password"
                    name="country"
                    className="yellow-input"
                    value={form.country}
                    onChange={changeHandler}
                  />
                  <label htmlFor="country" className="active">
                    Страна
                  </label>
                </div>

                <div>
                  <p>Укажите точки на карте</p>

                  <YMaps>
                    <div>
                      <Map
                        width={'auto'}
                        height={400}
                        defaultState={{ center: [55.75, 37.57], zoom: 9 }}
                        onClick={mapHandler}
                      >
                        {points.map((point, index) => (
                          <Placemark
                            geometry={[point.latitude, point.longitude]}
                            onClick={() => removePoint(index)}
                          />
                        ))}
                      </Map>
                    </div>
                  </YMaps>

                  <p>Выбранные точки: </p>
                  {points.map((point, index) => {
                    return (
                      <div>
                        {index + 1} точка:
                        {point.latitude}, {point.longitude}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <p className="error">{error && error}</p>
            <div className="card-action">
              <button className="btn yellow darken-4" onClick={submitHandler}>
                Войти
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
