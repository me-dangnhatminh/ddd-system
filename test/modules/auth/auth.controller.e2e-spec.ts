import { RootModule } from '@infrastructure';
import { Test, TestingModule } from '@nestjs/testing';

class AuthController {}

describe(AuthController, () => {
  let authController: AuthController;

  // Create module with controller
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [RootModule],
    }).compile();
    const app = moduleFixture.createNestApplication();
    await app.init();
    authController = app.get<AuthController>(AuthController);
  });

  it('', () => {
    authController; // TODO: fake use
  });
});
