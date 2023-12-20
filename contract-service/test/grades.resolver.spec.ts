import { Test, TestingModule } from '@nestjs/testing';
import { GradesResolver } from '../src/grades/grades.resolver';
import { GradesService } from '../src/grades/grades.service';

describe('GradesResolver', () => {
  let resolver: GradesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GradesResolver, GradesService],
    }).compile();

    resolver = module.get<GradesResolver>(GradesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
