import { createRouter, createWebHistory } from "vue-router";
import Favourites from "../views/Favourites.vue";
import Characters from "../views/Characters.vue";
import Details from "../views/Details.vue";
import NotFound from "../views/NotFound.vue";

const routes = [
  {
    path: "/",
    redirect: "/characters",
  },
  {
    path: "/characters",
    name: "Characters",
    component: Characters,
    props: (route) => ({
      page: parseInt(route.query.page) || 1,
      species: route.query.species || "",
      name: route.query.name || "",
    }),
  },
  {
    path: "/favourites",
    name: "Favourites",
    component: Favourites,
  },
  {
    path: "/details/:id",
    name: "Details",
    component: Details,
    props: (route) => ({
      id: route.params.id,
    }),
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
