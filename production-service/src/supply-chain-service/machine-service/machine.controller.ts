import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { ApiTags } from "@nestjs/swagger";
import { RateLimiterGuard } from "nestjs-rate-limiter";

@ApiTags('Machine')
@UseGuards(RateLimiterGuard)
@Controller('machine')
export class MachineController {
    constructor(private readonly machineService: MachineService) { }

    @Get(':id')
    async findOneMachine(@Param('id', ParseIntPipe) id: number) {
        return this.machineService.findOneMachine(id);
    }

    @Get()
    async findAllMachines() {
        return this.machineService.findAllMachines();
    }

    @Post('many-machines')
    async createManyMachines(@Body('quantity') quantity: number) {
        if (!quantity || quantity <= 0) {
            throw new HttpException('Quantity must be a positive number', HttpStatus.BAD_REQUEST);
        }
        return this.machineService.createManyMachines(quantity);
    }

    @Post()
    async createOneMachine() {
        return this.machineService.createOneMachine();
    }

    @Delete('many-machines')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteManyMachines(@Body('machineIds') machineIds: number[]) {
        return this.machineService.deleteManyMachines(machineIds);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteOneMachine(@Param('id', ParseIntPipe) id: number) {
        return this.machineService.deleteOneMachine(id);
    }
}