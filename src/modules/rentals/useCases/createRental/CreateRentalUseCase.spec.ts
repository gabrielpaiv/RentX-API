import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory'
import { AppError } from '@shared/errors/AppError'
import { CreateRentalUseCase } from './CreateRentalUseCase'
import dayjs from 'dayjs'
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider'
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'

let createRentalUseCase: CreateRentalUseCase
let rentalsRepositoryInMemory: RentalsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory
let dayJsDateProvider: DayjsDateProvider

describe('Create Rental', () => {
  const dayAdded24Hours = dayjs().add(1, 'day').toDate()
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    dayJsDateProvider = new DayjsDateProvider()
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory()
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory
    )
  })

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Test',
      description: 'Car Test',
      daily_rate: 100,
      license_plate: 'test',
      fine_amount: 40,
      category_id: '1234',
      brand: 'brand'
    })
    const rental = await createRentalUseCase.execute({
      user_id: '12345',
      car_id: car.id,
      expected_return_date: dayAdded24Hours
    })

    expect(rental).toHaveProperty('id')
    expect(rental).toHaveProperty('start_date')
  })
  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: '123456786',
      expected_return_date: dayAdded24Hours,
      user_id: '1234'
    })
    await expect(
      createRentalUseCase.execute({
        user_id: '1234',
        car_id: '111111',
        expected_return_date: dayAdded24Hours
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for the user"))
  })
  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await rentalsRepositoryInMemory.create({
      car_id: 'test',
      expected_return_date: dayAdded24Hours,
      user_id: '1234'
    })
    await expect(
      createRentalUseCase.execute({
        user_id: '321',
        car_id: 'test',
        expected_return_date: dayAdded24Hours
      })
    ).rejects.toEqual(new AppError('Car is unavailable'))
  })
  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: '12345',
        car_id: '1234',
        expected_return_date: dayjs().toDate()
      })
    ).rejects.toEqual(new AppError('Invalid return time'))
  })
})
