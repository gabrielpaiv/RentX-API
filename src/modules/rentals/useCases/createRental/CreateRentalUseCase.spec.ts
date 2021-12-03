import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import dayjs from 'dayjs'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dayAdded24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    dayJsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider
    )
  })

  it('should be able to create a new rental', async () => {
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: '121212',
      expected_return_date: dayAdded24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('should not be able to create a new rental if there is another open to the same user', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test',
        expected_return_date: dayAdded24Hours
      })
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: 'test2',
        expected_return_date: dayAdded24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create a new rental if there is another open to the same car', () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '123',
        car_id: '121212',
        expected_return_date: dayAdded24Hours
      })
      await createRentalUseCase.execute({
        user_id: '321',
        car_id: '121212',
        expected_return_date: dayAdded24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })
  it('should not be able to create a new rental with invalid return time', async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: '12345',
        car_id: '121212',
        expected_return_date: dayAdded24Hours
      })
    }).rejects.toBeInstanceOf(AppError)
  })
})
