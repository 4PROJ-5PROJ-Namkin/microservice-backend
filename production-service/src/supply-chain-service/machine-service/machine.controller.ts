import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseIntPipe, Post, UseGuards } from "@nestjs/common";
import { MachineService } from "./machine.service";
import { ApiTags, ApiProperty } from "@nestjs/swagger";
import { RateLimiterGuard } from "nestjs-rate-limiter";
import { KafkaService } from "src/kafka-producer-service/kafka-producer.service";
import { Machine } from "../entities/machine.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@ApiTags('Machine')
@UseGuards(RateLimiterGuard)
@Controller('machine')
export class MachineController {
    constructor(
        private readonly machineService: MachineService,
        private readonly kafkaService: KafkaService,
        @InjectRepository(Machine)
        private readonly machineRepository: Repository<Machine>
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
            await this.kafkaService.sendMessage('machine', machine, 'POST');
        }
        return createdMachines;
    }

    @Post()
    @ApiProperty({ type: Machine, description: 'Create a new machine' })
    async createOneMachine() {
        const createdMachine = await this.machineService.createOneMachine();
        await this.kafkaService.sendMessage('machine', createdMachine, 'POST');
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
        const machineToDelete = await this.machineRepository.findOne({ where: { id: id } });
        await this.kafkaService.sendMessage('machine', machineToDelete, 'DELETE');
        return this.machineService.deleteOneMachine(id);
    }
}