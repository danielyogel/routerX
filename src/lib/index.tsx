import React from 'react';
import createRouter from 'router5';
import browserPlugin from 'router5-plugin-browser';
import { observable, computed } from 'mobx';
import { mapValues, omitBy } from '../utils/functionalProgramming';

export default function RouterX<T extends Record<string, string>>(routes: T, defaultRoute: keyof T, defaultParams: Record<string, string | number>) {
  const ROUTE_ENTERIES_ARRAY = Object.entries(routes).map(([name, path]) => ({
    name,
    path
  }));

  type RouteName = keyof typeof routes;

  const router = createRouter(ROUTE_ENTERIES_ARRAY, { defaultRoute: defaultRoute.toString(), defaultParams });
  router.usePlugin(browserPlugin({}));
  router.start();

  const selectedPage = observable.box(router.getState().name as RouteName);
  const activeNodes = mapValues(routes, (_, key) => observable.box(router.isActive(key, router.getState().params)));
  const params = observable.box(router.getState().params as { [key in string]: string });

  router.subscribe(({ route }) => {
    selectedPage.set(route.name as RouteName);
    const { params: currParams } = router.getState();
    params.set(currParams);
    ROUTE_ENTERIES_ARRAY.forEach(e => activeNodes[e.name].set(router.isActive(e.name, currParams)));
  });

  const navigate = {
    ...mapValues(routes, (_, currRouteName) => {
      return (p?: Record<string, string | null> | ((prevParams: Record<string, string>) => Record<string, string | null>)) => {
        if (!p) {
          router.navigate(currRouteName, params.get());
        } else if (typeof p === 'function') {
          const oldParams = { ...params.get() };
          const newParams = p(oldParams);
          const omittedNulls = omitBy(newParams, v => v === null);
          router.navigate(currRouteName, omittedNulls);
        } else {
          const newParams = { ...p };
          const omittedNulls = omitBy(newParams, v => v === null);
          router.navigate(currRouteName, omittedNulls);
        }
      };
    }),
    currentRoute: (p?: Record<string, string | null> | ((prevParams: Record<string, string>) => Record<string, string | null>)) => {
      const currRouteName = selectedPage.get() as string;
      if (!p) {
        router.navigate(currRouteName, params.get());
      } else if (typeof p === 'function') {
        const oldParams = { ...params.get() };
        const newParams = p(oldParams);
        const omittedNulls = omitBy(newParams, v => v === null);
        router.navigate(currRouteName, omittedNulls);
      } else {
        const newParams = { ...p };
        const omittedNulls = omitBy(newParams, v => v === null);
        router.navigate(currRouteName, omittedNulls);
      }
    }
  };

  const link = mapValues(routes, (currRoutePath, currRouteName) => {
    return () => (
      <a
        href={currRoutePath}
        style={{ textTransform: 'capitalize' }}
        onClick={e => {
          e.preventDefault();
          router.navigate(currRouteName);
        }}
      >
        {currRouteName.toLowerCase()}
      </a>
    );
  });

  return {
    selectedPage,
    navigate,
    link,
    activeNodes,
    params: computed(() => params.get())
  };
}

export type routerType = ReturnType<typeof RouterX>;
