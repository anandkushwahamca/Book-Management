import { Test } from '@nestjs/testing';
import { DataSource } from 'typeorm';
import { UserRepository } from '../repository/users.repository';

describe('Given BeneficiariesRepository', () => {
  let userRepository: UserRepository;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: DataSource,
          useFactory: () => ({
            createEntityManager: jest.fn(),
          }),
        },
      ],
    }).compile();

    userRepository = moduleRef.get<UserRepository>(UserRepository);
  });

  it('userRepository should be defiend', () => {
    expect(userRepository).toBeDefined();
  });
});
