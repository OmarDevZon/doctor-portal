import { Router } from "express";
import { adminRoutes } from "../app/modules/admin/admin.routes";
import { userRoutes } from "../app/modules/user/user.routes";
const router = Router();

const moduleRoutes = [
  {
    path: "/",
    route: adminRoutes,
  },
  {
    path: "/",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
