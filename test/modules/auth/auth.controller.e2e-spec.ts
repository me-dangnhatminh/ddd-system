import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { RootModule } from '@infrastructure';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [RootModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should be defined', () => expect(app).toBeDefined());

  describe('/auth/login (POST)', () => {
    const login = (email, password) =>
      request(app.getHttpServer())
        .post('/auth/login')
        .send({ email, password });

    it('should be return success data', () => {
      return login('email_1@gmail.com', '123')
        .expect(200)
        .expect((res) => {
          expect(res.body).toStrictEqual({
            isSuccess: true,
            data: { accessToken: expect.any(String) },
          });
        });
    });

    it('should be return error when email or password not provided', () => {
      return login('', '')
        .expect(400)
        .expect((res) => {
          expect(res.body).toStrictEqual({
            isSuccess: false,
            error: { code: 'ERR_VALIDATION', message: expect.any(String) },
          });
        });
    });

    it('should be return error when email or password not correct', () => {
      return login('emailWrong@gmail.com', 'passwrong')
        .expect(401)
        .expect((res) => {
          expect(res.body).toStrictEqual({
            isSuccess: false,
            error: {
              code: 'ERR_AUTH_INVALID_CREDENTIALS',
              message: 'Invalid credentials',
            },
          });
        });
    });
  });

  describe('/auth/register (POST)', () => {
    it('should be return success data', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({ email: 'test1@gmail.com', password: 'test' })
        .expect(201)
        .expect((res) => {
          expect(res.body).toStrictEqual({
            isSuccess: true,
            data: {
              id: expect.any(Number),
              firstName: expect.any(String),
              lastName: expect.any(String),
              email: expect.any(String),
              avatarUrl: expect.any(String),
              isVerified: expect.any(Boolean),
            },
          });
        });
    });

    it('should be return error when email or password not provided', () => {
      return request(app.getHttpServer())
        .post('/auth/register')
        .send({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        })
        .expect(400)
        .expect((res) => {
          expect(res.body).toStrictEqual({
            isSuccess: false,
            error: { code: 'ERR_VALIDATION', message: expect.any(String) },
          });
        });
    });
  });

  afterAll(async () => await app.close());
});
