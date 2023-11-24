import { Controller } from '@nestjs/common';
import { Post, Get, HttpCode } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { UsuarioService } from '../usuario.services/usuario';

import { Res } from '@nestjs/common';
import { Response } from 'express';

import { CreateUserDto } from '../dto/criarUsuario.dto';
import { Autenticar } from '../dto/autenticar.dto';
import { Sal } from '../dto/sal.dto';
import { Usuario } from '../entities/usuario.entidade';

@Controller('usuario')
export class UsuarioController
{
  constructor(
    private servicoUsuario :UsuarioService
  )
  {}

  /** Cria a conta única de usuário
  *   @param {CreateUserDto} createUserDto - dados para validacao.
  *   @returns {CreateUserDto} representação do usuário.
  * */
  @Post()
  @HttpCode(201)
  async criarUsuarioUnico(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto
  ): Promise<Usuario|string>
  {
    return this.criarUsuarioUnico( createUserDto );
  }

  /** retorna sal para usuário indicado no cliente
  *   @param {Sal} username - obter sal através do username.
  * */
  @Post()
  async salUsuario(
		@Body(new ValidationPipe()) username: Sal
	): Promise<any>
  {
		return this.servicoUsuario.obterSal( username );
	}

  /** Cliente gera hash e o envia para o servidor.
   *  @param {Autenticar} auth - validacao para hash enviado pelo cliente.
  * */
  @Post()
  async usuarioAutenticar(
    @Body(new ValidationPipe()) auth: Autenticar,
    @Res() resp: Response
  ): Promise<void>
  {
		const verif = this.servicoUsuario.autenticar( auth );
  }
}
