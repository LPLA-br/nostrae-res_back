import { Controller } from '@nestjs/common';
import { Get, Post, Patch } from '@nestjs/common';
import { Body, Req } from '@nestjs/common';
import { Request } from 'express';
import { MoveisProvedores } from './moveis.service';
import { Validacao } from './pipes/validacao.pipe';
import { Movel } from './entidades/movel.entidade';
import { CriarRegistroDto } from './dto/criarRegistro.dto';
import { EditarRegistroDto } from './dto/editarRegistro.dto';

import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

import { Retorno } from './moveis.service';

@Controller('moveis')
export class MoveisControladoresController
{
  constructor( private moveisProvedores: MoveisProvedores )
  {}

	@Get()
  @UseGuards(AuthGuard)
	async listarTodosRegistros( @Req() req: Request )
	{
    return await this.moveisProvedores.buscarTodos( req.header('Authorization') );
	}

	@Post()
  @UseGuards(AuthGuard)
	async criarRegistro(
    @Body(new Validacao()) criarRegistroDto: CriarRegistroDto
  ): Promise<Retorno>
	{
		return await this.moveisProvedores.criarRegistro( criarRegistroDto );
	}

	@Patch()
  @UseGuards(AuthGuard)
	async atualizarRegistroParcialmente(
    @Body(new Validacao()) editarRegistroDto : EditarRegistroDto
  ): Promise<any>
	{
    return await this.moveisProvedores.editarRegistroDinamicamente( editarRegistroDto );
	}

}
