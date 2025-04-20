import { Request, Response } from 'express';
import { UserService } from '../services/usuarioService';
import { CreateUserDto, UpdateUserDto, UserQueryParams } from '../models/usuarioDTO';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const queryParams: UserQueryParams = {
        dni: req.query.dni as string,
        nombre: req.query.nombre as string,
        ape_pat: req.query.ape_pat as string,
        ape_mat: req.query.ape_mat as string,
        es_docente: req.query.es_docente as string,
        es_tutor: req.query.es_tutor as string
      };

      const users = await this.userService.searchUsers(queryParams);

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


  createUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userData: CreateUserDto = req.body;
      
      // Basic validation
      if (!userData.dni || !userData.nombres || !userData.ape_pat || !userData.ape_mat) {
        res.status(400).json({
          success: false,
          message: 'Faltan datos requeridos para crear el usuario'
        });
        return;
      }
      
      const userId = await this.userService.insertuser(userData);
      
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
  };

  updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.id);
      
      if (isNaN(userId)) {
        res.status(400).json({
          success: false,
          message: 'ID de usuario inválido'
        });
        return;
      }
      
      const userData: UpdateUserDto = {
        ...req.body,
        idusuario: userId
      };
      
      // Basic validation
      if (!userData.dni || !userData.nombres || !userData.ape_pat || !userData.ape_mat) {
        res.status(400).json({
          success: false,
          message: 'Faltan datos requeridos para actualizar el usuario'
        });
        return;
      }
      
      const success = await this.userService.updateUser(userData);
      
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
  };
}