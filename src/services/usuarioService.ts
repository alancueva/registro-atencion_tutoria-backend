import { CreateUserDto, UpdateUserDto, User, UserQueryParams } from '../models/interface/usuario.interface';
import { UserRepository } from '../repositories/usuarioRepository';
import {IUsuario} from '../models/interface/usuario.interface';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    /**
     * BUSCAR USUARIO
     * @param params 
     * @returns 
     */
    public async buscarUsuario(params: UserQueryParams): Promise<User[]> {
        try {
            return await this.userRepository.buscar_usuario(params);
        } catch (error) {
            console.error('Error en UserService.buscarUsuario:', error);
            throw error;
        }
    }

    /**
     * RECUPERAR USUARIO
     * @param idusuario 
     * @returns 
     */
    public async recuperarUsuario(idusuario: number):Promise<IUsuario[]>{        
        try {
            return await this.userRepository.recuperar_usuario(idusuario);
        } catch (error) {
            console.error('Error al recuperar usuario:', error);
            throw error;
        }
    }

    public async verificarClave(idusuario: number, clave_antigua: string, clave_nueva: string): Promise<string> {
        try {
            return await this.userRepository.verificar_clave(idusuario, clave_antigua, clave_nueva);
        } catch (error) {
            console.error('Error en UserService.verificarClave:', error);
            throw error;
        }
    }

    public async update_usuario_imagenPerfil(idusuario: number, imagen: string): Promise<string | null> {
        try {
            return await this.userRepository.update_usuario_imagenPerfil(idusuario, Buffer.from(imagen, 'base64'));
        } catch (error) {
            console.error('Error en UserService.update_usuario_imagenPerfil:', error);
            throw error;
        }
    }

    public async verificar_dni(dni: string): Promise<boolean> {
        try {
            return await this.userRepository.verificar_dni(dni);
        } catch (error) {
            console.error('Error en UserService.verificar_dni:', error);
            throw error;
        }
    }

    /**
     * INSERTAR USUARIO
     * @param userData 
     * @returns 
     */
    public async insertuser(userData: CreateUserDto): Promise<boolean> {
        try {
            return await this.userRepository.insert_usuario(userData);
        } catch (error) {
            console.error('Error en UserService.insertuser:', error);
            throw error;
        }
    }
    

    /**
     * ACTUALIZAR USUARIO
     * @param userData 
     * @returns 
     */
    async updateUser(userData: UpdateUserDto): Promise<boolean> {
        try {
            return await this.userRepository.update_usuario(userData);
        } catch (error) {
            console.error('Error en UserService.updateUser:', error);
            throw error;
        }
    }
}