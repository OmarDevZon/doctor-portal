import { Router } from 'express';
import { adminRoutes } from '../app/modules/admin/admin.routes';
const router = Router();

const moduleRoutes = [
  {
    path: '/',
    route: adminRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;