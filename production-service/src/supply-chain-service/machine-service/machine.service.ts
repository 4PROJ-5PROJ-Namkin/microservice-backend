import { HttpException, HttpStatus, Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { Machine } from "../entities/machine.entity";

@Injectable()
export class MachineService {
    constructor(
        @InjectRepository(Machine)
        private readonly machineRepository: Repository<Machine>
    ) { }

    async findOneMachine(id: number): Promise<Machine> {
        const machine = await this.machineRepository.findOne({ where: { id: id } });
        if (!machine) {
            throw new HttpException('Machine not found', HttpStatus.NOT_FOUND);
        }
        return machine;
    }

    async findAllMachines(): Promise<Machine[]> {
        return this.machineRepository.find();
    }

    async createOneMachine(): Promise<Machine> {
        try {
            const machine = this.machineRepository.create();
            return this.machineRepository.save(machine);
        }
        catch (error) {
            throw new HttpException('Error in creating a machine file information.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async createManyMachines(quantity: number): Promise<Machine[]> {
        try {
            const machines = Array.from({ length: quantity }, () => this.machineRepository.create());
            return await this.machineRepository.save(machines);
        }
        catch (error) {
            throw new HttpException('Error in creating machine information.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async deleteOneMachine(id: number): Promise<void> {
        const machineToDelete = await this.machineRepository.delete(id);
        if (machineToDelete.affected === 0) {
            throw new HttpException('Machine not found', HttpStatus.NOT_FOUND);
        }
    }

    async deleteManyMachines(machineIds: number[]): Promise<void> {
        const deleteResult = await this.machineRepository.delete(machineIds);

        if (deleteResult.affected !== machineIds.length) {
            throw new HttpException('Some machines were not found and could not be deleted.',
                HttpStatus.NOT_FOUND
            );
        }
    }
}

