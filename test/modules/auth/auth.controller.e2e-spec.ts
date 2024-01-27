import { AuthController, RootModule } from '@infrastructure';
import { Test, TestingModule } from '@nestjs/testing';

describe('AuthController', () => {
  let authController: AuthController;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();

    const app = moduleFixture.createNestApplication();
    await app.init();
    authController = app.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it("should return a error if user doesn't exist", async () => {
      const dtos = [
        { email: 'wrong@gmail.com', password: '123' }, // wrong email
        { email: 'email_1@gmail.com', password: 'wrong' }, // wrong password
      ];

      for (const dto of dtos) {
        const result = await authController.login(dto).catch(() => null);
        expect(result).toEqual({
          isSuccess: false,
          error: {
            statusCode: 400,
            message: 'Bad Request',
          },
        });
      }
    });

    it('should return a JWT is accessToken', async () => {
      const dto = { email: 'email_1@gmail.com', password: '123' };
      const result = await authController.login(dto).catch(() => null);
      expect(result).toEqual({
        isSuccess: true,
        data: { accessToken: expect.any(String) },
      });
    });
  });

  describe('register', () => {
    it('should return a user', async () => {});
  });
});
