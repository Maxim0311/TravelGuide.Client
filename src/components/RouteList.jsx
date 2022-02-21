import React from 'react';
import { Link } from 'react-router-dom';

export default function RouteList({ routes }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Название</th>
          <th>Страна</th>
          <th>Рейтинг</th>
          <th>Дата создания</th>
          <th>Количество точек</th>
          <th>Составитель</th>
        </tr>
      </thead>

      <tbody>
        {routes?.items?.map((route, index) => (
          <tr key={route.id}>
            <td>{route.title}</td>
            <td>{route.country}</td>
            <td>{route.rating}</td>
            <td>{route.createdDate}</td>
            <td>{route.pointsCount}</td>
            <td>{route.author}</td>
            <td>
              <Link
                class="waves-effect waves-light btn"
                to={`/RouteDetails/${route.id}`}
              >
                Открыть
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
