import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { ApiTags, ApiProperty } from "@nestjs/swagger";
import { RateLimiterGuard } from "nestjs-rate-limiter";
import { KafkaService } from "src/kafka-producer-service/kafka-producer.service";
import { Machine } from "../entities/machine.entity";

@ApiTags('Machine')
@UseGuards(RateLimiterGuard)
@Controller('machine')
export class MachineController {
    constructor(
        private readonly machineService: MachineService,
        private readonly kafkaService: KafkaService
    ) { }

    @Get(':id')
    @ApiProperty({ description: 'Retrieve a machine by its ID' })
    async findOneMachine(@Param('id', ParseIntPipe) id: number) {
        return this.machineService.findOneMachine(id);
    }

    @Get()
    @ApiProperty({ type: [Machine], description: 'Retrieve all machines' })
    async findAllMachines() {
        return this.machineService.findAllMachines();
    }

    @Post('many-machines')
    @ApiProperty({ description: 'Create multiple machines by specifying quantity' })
    async createManyMachines(@Body('quantity') quantity: number) {
        if (!quantity || quantity <= 0) {
            throw new HttpException('Quantity must be a positive number', HttpStatus.BAD_REQUEST);
        }

        const createdMachines = await this.machineService.createManyMachines(quantity);
        for (const machine of createdMachines) {
            await this.kafkaService.sendMessage('machines', machine);
        }
        return createdMachines;
    }

    @Post()
    @ApiProperty({ type: Machine, description: 'Create a new machine' })
    async createOneMachine() {
        const createdMachine = await this.machineService.createOneMachine();
        await this.kafkaService.sendMessage('machines', createdMachine);

        return createdMachine;
    }

    @Delete('many-machines')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiProperty({ description: 'Delete multiple machines by specifying their IDs' })
    async deleteManyMachines(@Body('machineIds') machineIds: number[]) {
        return this.machineService.deleteManyMachines(machineIds);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiProperty({ description: 'Delete a machine by its ID' })
    async deleteOneMachine(@Param('id', ParseIntPipe) id: number) {
        return this.machineService.deleteOneMachine(id);
    }
}