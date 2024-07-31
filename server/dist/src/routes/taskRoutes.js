"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taskController_1 = require("../controllers/taskController");
const router = (0, express_1.Router)();
router.post('/tasks/add', taskController_1.createTask);
router.get('/tasks', taskController_1.getTasks);
router.put('/tasks/:id', taskController_1.updateTask);
router.delete('/tasks/:id', taskController_1.deleteTask);
exports.default = router;
//# sourceMappingURL=taskRoutes.js.map