import { CreateUserDto, UpdateUserDto, UserQueryParams } from '../models/interface/usuario.interface';
import { UserService } from '../services/usuarioService';
import { Request, Response } from 'express';

export class UsuarioController {
  private usuarioService: UserService;

  constructor() {
    this.usuarioService = new UserService();
  }

  public async searchUsers(req: Request, res: Response): Promise<void> {
    try {
      const queryParams: UserQueryParams = {
        dni: req.query.dni as string,
        nombre: req.query.nombre as string,
        ape_pat: req.query.ape_pat as string,
        ape_mat: req.query.ape_mat as string,
        es_docente: req.query.es_docente as string,
        es_tutor: req.query.es_tutor as string
      };

      const users = await this.usuarioService.buscarUsuario(queryParams);

      res.status(200).json({
        success: true,
        data: users
      });
    } catch (error) {
      console.error('Error in UserController.searchUsers:', error);
      res.status(500).json({
        success: false,
        message: 'Error al buscar usuarios',
        error: (error as Error).message
      });
    }
  };

  public async recuperarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const idusuario = parseInt(req.params.idusuario, 10);

      if (isNaN(idusuario)) {
        res.status(400).json({ message: 'ID de usuario no válido' });
        return;
      }

      const usuario = await this.usuarioService.recuperarUsuario(idusuario);

      if (usuario && usuario.length > 0) {
        res.status(200).json(usuario[0]);
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error en UsuarioController.recuperarUsuario:', error);
      res.status(500).json({ message: 'Error al recuperar el usuario' });
    }
  }


  public async verificarClave(req: Request, res: Response): Promise<void> {
    try {
      const { idusuario, clave_antigua, clave_nueva } = req.body;

      if (!idusuario || !clave_antigua || !clave_nueva) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
        return;
      }

      const result = await this.usuarioService.verificarClave(idusuario, clave_antigua, clave_nueva);

      res.status(200).json({
        success: true,
        message: 'Clave verificada exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error en UsuarioController.verificarClave:', error);
      res.status(500).json({ message: 'Error al verificar la clave' });
    }
  }

  public async verificarDNI(req: Request, res: Response): Promise<void> {
    try {
      const { dni } = req.body;

      if (!dni) {
        res.status(400).json({ message: 'Falta el DNI' });
        return;
      }

      const result = await this.usuarioService.verificar_dni(dni);

      res.status(200).json({
        success: true,
        message: 'DNI verificado exitosamente',
        data: result
      });
    } catch (error) {
      console.error('Error en UsuarioController.verificarDNI:', error);
      res.status(500).json({ message: 'Error al verificar el DNI' });
    }
  }


  public async updateUserImage(req: Request, res: Response): Promise<void> {
    try {
      const { idusuario, imagen } = req.body;

      if (!idusuario || !imagen) {
        res.status(400).json({ message: 'Faltan datos requeridos' });
        return;
      }

      const result = await this.usuarioService.update_usuario_imagenPerfil(idusuario, imagen);

      if (result) {
        res.status(200).json({
          success: true,
          message: 'Imagen de usuario actualizada exitosamente',
          data: result
        });
      } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
      }
    } catch (error) {
      console.error('Error en UsuarioController.updateUserImage:', error);
      res.status(500).json({ message: 'Error al actualizar la imagen de usuario' });
    }
  }

  public async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData: CreateUserDto = req.body;

      if (!userData.dni || !userData.nombre || !userData.ape_pat || !userData.ape_mat) {
        res.status(400).json({
          success: false,
          message: 'Faltan datos requeridos para crear el usuario'
        });
        return;
      }

      const userId = await this.usuarioService.insertuser(userData);

      res.status(201).json({
        success: true,
        message: 'Usuario creado exitosamente',
        data: { id: userId }
      });
    } catch (error) {
      console.error('Error in UserController.createUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error al crear usuario',
        error: (error as Error).message
      });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {

      const userData: UpdateUserDto = req.body;

      if (!userData.dni || !userData.nombre || !userData.ape_pat || !userData.ape_mat) {
        res.status(400).json({
          success: false,
          message: 'Faltan datos requeridos para actualizar el usuario'
        });
        return;
      }

      const success = await this.usuarioService.updateUser(userData);

      if (success) {
        res.status(200).json({
          success: true,
          message: 'Usuario actualizado exitosamente'
        });
      } else {
        res.status(404).json({
          success: false,
          message: 'Usuario no encontrado o no se realizaron cambios'
        });
      }
    } catch (error) {
      console.error('Error in UserController.updateUser:', error);
      res.status(500).json({
        success: false,
        message: 'Error al actualizar usuario',
        error: (error as Error).message
      });
    }
  }
}