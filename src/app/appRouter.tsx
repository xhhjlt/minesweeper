import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AppRoutes } from '../types/routes';
import Root from 'routes/root';
import ErrorPage from 'components/common/errorPage';
import Game from 'routes/game';
import Leaderboard from 'routes/leaders';
export default function AppRouter() {
  const router = createBrowserRouter([
    {
      path: AppRoutes.Game,
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Game />,
        },
        {
          path: AppRoutes.Leaders,
          element: <Leaderboard />,
        },
      ]
    },
  ]);

  return <RouterProvider router={router} />;
}
