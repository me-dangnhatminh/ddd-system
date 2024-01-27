import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserBody, UsersController } from '@infrastructure';
import { CreateUserCommand, UserRole } from '@modules/auth';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

describe('UsersController', () => {
  let usersController: UsersController;
  let commandBus: CommandBus;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let queryBus: QueryBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        { provide: CommandBus, useValue: { execute: jest.fn() } },
        { provide: QueryBus, useValue: { execute: jest.fn() } },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    commandBus = module.get<CommandBus>(CommandBus);
    queryBus = module.get<QueryBus>(QueryBus);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('createUser', () => {
    it('should execute CreateUserCommand', async () => {
      const body: CreateUserBody = {
        name: 'test',
        email: '',
        password: '',
        role: UserRole.USER,
      };
      await usersController.createUser(body);
      expect(commandBus.execute).toHaveBeenCalledWith(
        new CreateUserCommand(body.name, body.email, body.password, body.role),
      );
    });
  });
});
