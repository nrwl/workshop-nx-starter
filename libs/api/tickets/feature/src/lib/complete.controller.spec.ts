import { Test, TestingModule } from '@nestjs/testing';
import { CompleteController } from './complete.controller';

describe('Complete Controller', () => {
  let controller: CompleteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompleteController],
    }).compile();

    controller = module.get<CompleteController>(CompleteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
