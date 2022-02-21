import React, { useCallback, useEffect, useState } from 'react';
import { API_URL } from '../api';
import Loader from '../components/Loader';
import RouteList from '../components/RouteList';
import { useHttp } from '../hooks/http.hook';

export default function RoutesPage() {
  const [routes, setRoutes] = useState([]);
  const { loading, request } = useHttp();

  const fetchRoutes = useCallback(async () => {
    try {
      const data = await request(`${API_URL}/Route/GetAllRoutes`, 'GET', null);
      setRoutes(data);
    } catch (e) {}
  });

  useEffect(() => {
    fetchRoutes();
  }, []);

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );

  return <div>{!loading && <RouteList routes={routes} />}</div>;
}
