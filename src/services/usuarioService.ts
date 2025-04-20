import { CreateUserDto, UpdateUserDto, User, UserQueryParams } from '../models/usuarioDTO';
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
    async buscarUsuario(params: UserQueryParams): Promise<User[]> {
        try {
            return await this.userRepository.buscar_usuario(params);
        } catch (error) {
            console.error('Error in UserService.searchUsers:', error);
            throw error;
        }
    }

    /**
     * RECUPERAR USUARIO
     * @param idusuario 
     * @returns 
     */
    async recuperarUsuario(idusuario: number):Promise<IUsuario[]>{
        try {
            return await this.userRepository.recuperar_usuario(idusuario);
        } catch (error) {
            console.error('Error al recuperar usuario:', error);
            throw error;
        }
    }

    /**
     * INSERTAR USUARIO
     * @param userData 
     * @returns 
     */
    async insertuser(userData: CreateUserDto): Promise<boolean> {
        try {
            return await this.userRepository.insert_usuario(userData);
        } catch (error) {
            console.error('Error in UserService.updateUser:', error);
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
            console.error('Error in UserService.updateUser:', error);
            throw error;
        }
    }
}