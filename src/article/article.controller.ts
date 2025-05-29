import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('article')
export class ArticleController {
    @Get()
    findAll(): string {
        return 'get all article'
    }

    @Get('/:id')
    findOne(@Param() params:any): string {
        return `show article ${params.id}`
    }

    @Post()
    create(): string {
        return 'create article'
    }

    @Put('/:id')
    update(@Param() params:any): string {
        return `update article ${params.id}`
    }

    @Delete('/:id')
    delete(@Param() params:any): string {
        return `delete article ${params.id}`
    }
}
