import React, { ElementType, lazy, Suspense } from "react";
import { RouteObject, useRoutes } from "react-router";

/*
 * Suspense is a component that wraps the custom components and enables them to communicate
 *  to React that they're waiting for some data to load before the component is rendered.
 * */
const Loadable = (Component: ElementType) => (props: any) =>
  (
    <Suspense fallback={<h1>Loading</h1>}>
      <Component {...props} />
    </Suspense>
  );

/* Lazy Loaded Todos Pages for code splitting*/
const HomePage = Loadable(lazy(() => import("./pages/HomePage")));
const AntiHeroesPage = Loadable(lazy(() => import("./pages/AntiHeroesPage")));
const HeroesPage = Loadable(lazy(() => import("./pages/HeroesPage")));
const VillainsPage = Loadable(lazy(() => import("./pages/VillainsPage")));

/* we will reuse this in creating todos */
export const pathNames: any = {
  home: "/",
  antiHeroes: "/anti-heroes",
  heroes: "/heroes",
  villains: "/villains",
};

/*
 *object-based routes
 *nesting routes is another way of writing routes
 */
const lazyRoutes: RouteObject[] = [
  {
    path: pathNames.home,
    element: <HomePage />,
  },
  {
    path: pathNames.antiHeroes,
    element: <AntiHeroesPage />,
  },
  {
    path: pathNames.heroes,
    element: <HeroesPage />,
  },
  {
    path: pathNames.villains,
    element: <VillainsPage />,
  },
];

const LazyRoutes = () => {
  const contents = useRoutes(lazyRoutes);
  return <>{contents}</>;
};

export default LazyRoutes;
