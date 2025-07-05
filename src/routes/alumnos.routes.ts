import { Router } from "express";
import { AlumnoController } from "../controllers/alumnos.controllers";

const router = Router();
const alumnoController = new AlumnoController();

router.get("/verificarUsuarioDni/:a_dni/:a_periodo_academico/:a_anio", alumnoController.verificarUsuarioDni.bind(alumnoController));
router.post("/consulta_alumnos", alumnoController.consulta_alumnos.bind(alumnoController));
router.post("/mostrar_alumnos_programa_turno_semestre", alumnoController.mostrar_alumnos_programa_turno_semestre.bind(alumnoController));
router.get("/recuperar_alumno/:a_idalumnos", alumnoController.recuperar_alumno.bind(alumnoController));
router.post("/insertar_alumnos", alumnoController.insertar_alumnos.bind(alumnoController));
router.put("/actualizar_alumnos", alumnoController.actualizar_alumnos.bind(alumnoController));
router.post("/insertMultipleRegistros", alumnoController.insertMultipleRegistros.bind(alumnoController));

export default router;