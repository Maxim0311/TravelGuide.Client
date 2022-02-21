import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Map, Placemark, YMaps } from 'react-yandex-maps';
import { API_URL } from '../api';
import Loader from '../components/Loader';
import { useHttp } from '../hooks/http.hook';

export default function RouteDetails() {
  const pageParams = useParams();
  const navigate = useNavigate();
  const [route, setRoute] = useState();
  const { loading, request } = useHttp();

  const fetchRoutes = useCallback(async () => {
    try {
      const data = await request(
        `${API_URL}/Route/GetRouteById/${pageParams.id}`,
        'GET',
        null
      );
      setRoute(data);
    } catch (e) {}
    console.log(route);
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  const removeHandler = useCallback(async () => {
    try {
      const data = await request(
        `${API_URL}/Route/DeleteRoute/${pageParams.id}`,
        'DELETE',
        null
      );
      navigate('/Routes');
    } catch (e) {}
  });

  if (loading) return <Loader />;

  return (
    <>
      <div className="container">
        <p>Название:</p> <p>{route?.title}</p>
        <p>Страна:</p> <p>{route?.country}</p>
        <p>Ретинг:</p> <p>{route?.rating}</p>
        <YMaps>
          <div>
            <Map
              width={'auto'}
              height={400}
              defaultState={{ center: [55.75, 37.57], zoom: 9 }}
            >
              {route?.points?.map((point, index) => (
                <Placemark geometry={[point.latitude, point.longitude]} />
              ))}
            </Map>
          </div>
        </YMaps>
        <p>Точки: </p>
        {route?.points?.map((point, index) => {
          return (
            <div>
              {index + 1} точка:
              {point.latitude}, {point.longitude}
            </div>
          );
        })}
        <button
          className="btn yellow darken-4"
          onClick={removeHandler}
          disabled={loading}
        >
          Удалить маршрут
        </button>
      </div>
    </>
  );
}
