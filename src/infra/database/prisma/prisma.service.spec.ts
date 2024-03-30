import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let prismaService: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prismaService = module.get<PrismaService>(PrismaService);
    app = module.createNestApplication();
  });

  afterEach(async () => {
    await prismaService.$disconnect();
  });

  it('should be defined', () => {
    expect(prismaService).toBeDefined();
  });

  it('should be call onModuleInit', () => {
    jest.spyOn(prismaService, '$connect').mockImplementation();

    prismaService.onModuleInit();

    expect(prismaService.$connect).toHaveBeenCalled();
  });

  it('should be call onModuleDestroy', () => {
    jest.spyOn(prismaService, '$disconnect').mockImplementation();
    jest.spyOn(app, 'enableShutdownHooks').mockImplementation();
    jest.spyOn(app, 'use').mockImplementation((middleware) => {
      const req = {};
      const res = {};
      const next = jest.fn();
      middleware(req, res, next);
      return app;
    });

    prismaService.enableShutdownHooks(app);

    expect(app.use).toHaveBeenCalled();
    expect(app.enableShutdownHooks).toHaveBeenCalled();
    expect(prismaService.$disconnect).toHaveBeenCalled();
  });
});
