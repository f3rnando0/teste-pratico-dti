import { Router } from "express";
import { UserController } from "../controllers/userController";
import { authMiddleware } from "../middleware/authMiddleware";

export const router = Router();

const userController = new UserController();

router.post("/auth/register", userController.create);
router.post('/auth/login', userController.authorize);

router.get('/user/me', authMiddleware, userController.me);

router.post('/user/annotation/create', authMiddleware, userController.createAnnotation);
router.delete('/user/annotation/:annotationId', authMiddleware, userController.deleteAnnotation)
router.patch('/user/annotation', authMiddleware, userController.patchAnnotation)