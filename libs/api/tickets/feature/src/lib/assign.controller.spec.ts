import { Test, TestingModule } from '@nestjs/testing';
import { AssignController } from './assign.controller';

describe('Assign Controller', () => {
  let controller: AssignController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AssignController],
    }).compile();

    controller = module.get<AssignController>(AssignController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
