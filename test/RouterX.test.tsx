import { observable } from 'mobx';
import { expectType } from 'tsd';
import { RouterX } from '../src';

const router = RouterX(
  {
    HOMEPAGE: '/',
    ACTIVATION: '/user/:userId/:userCode',
    LOGIN: '/login',
    SIGNUP: '/signup',
    APP: '/app',
    'APP.CAMPAIGNS': '/campaigns',
    'APP.CAMPAIGNS.NEW': '/new',
    'APP.CAMPAIGNS.EDIT': '/:id'
  },
  'HOMEPAGE'
);

describe('RouterX', () => {
  it('INITS AS EXPECTED', () => {
    expect(router.selectedPage.get()).toEqual('HOMEPAGE');
  });

  it('navigates ', () => {
    router.navigate['APP']();
    expect(router.selectedPage.get()).toEqual('APP');
  });

  it('t ', () => {
    expectType<typeof router['selectedPage']>(
      observable.box<'HOMEPAGE' | 'ACTIVATION' | 'LOGIN' | 'SIGNUP' | 'APP' | 'APP.CAMPAIGNS' | 'APP.CAMPAIGNS.NEW' | 'APP.CAMPAIGNS.EDIT'>()
    );
  });
});
