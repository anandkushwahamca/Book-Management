import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined();
    expect(appController).not.toBeUndefined();
  });

  describe('When getHello', () => {
    it('should return correct greeting', () => {
      const res = appController.getHello();
      expect(res).toBe('Good Morning');
    });
  });
});
