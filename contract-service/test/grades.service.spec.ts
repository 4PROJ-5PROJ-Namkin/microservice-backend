import { Test, TestingModule } from '@nestjs/testing';
import { GradesService } from '../src/grades/grades.service';

describe('GradesService', () => {
  let service: GradesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradesService],
    }).compile();

    service = module.get<GradesService>(GradesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
