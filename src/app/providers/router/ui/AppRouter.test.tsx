import { screen } from '@testing-library/react';
import {
  getRouteAbout,
  getRouteAdmin,
  getRouteProfile,
} from '@/shared/const/router';
import { componentRender } from '@/shared/lib/tests/componentRender/componentRender';
import AppRouter from './AppRouter';
import { UserRole } from '@/entities/User';

describe('app/router/AppRouter', () => {
  test('страница должна отрендерится', async () => {
    componentRender(<AppRouter />, {
      route: getRouteAbout(),
    });

    const page = await screen.findByTestId('AboutPage');
    expect(page).toBeInTheDocument();
  });

  test('страница не найдена', async () => {
    componentRender(<AppRouter />, {
      route: '/fffffff',
    });

    const page = await screen.findByTestId('NotFoundPage');
    expect(page).toBeInTheDocument();
  });

  test('редирект неавторизованного пользователя на главную страницу', async () => {
    componentRender(<AppRouter />, {
      initialState: {},
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('MainPage');
    expect(page).toBeInTheDocument();
  });

  test('доступ к закрытой странице для аторизованного пользователя', async () => {
    componentRender(<AppRouter />, {
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
      route: getRouteProfile('1'),
    });

    const page = await screen.findByTestId('ProfilePage');
    expect(page).toBeInTheDocument();
  });

  test('доступ запрещен (отсутствует роль)', async () => {
    componentRender(<AppRouter />, {
      initialState: {
        user: {
          _inited: true,
          authData: {},
        },
      },
      route: getRouteAdmin(),
    });

    const page = await screen.findByTestId('ForbiddenPage');
    expect(page).toBeInTheDocument();
  });

  test('доступ разрешен (присутствует роль)', async () => {
    componentRender(<AppRouter />, {
      initialState: {
        user: {
          _inited: true,
          authData: { roles: [UserRole.ADMIN] },
        },
      },
      route: getRouteAdmin(),
    });

    const page = await screen.findByTestId('AdminPanelPage');
    expect(page).toBeInTheDocument();
  });
});
