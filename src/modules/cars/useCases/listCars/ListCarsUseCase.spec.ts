import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListCarsUseCase } from './ListCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listCarsUseCase: ListCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory)
  })
  it('should be able to list all available cars', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 123.4,
      license_plate: 'ABC-1234',
      fine_amount: 123,
      brand: 'Car Brand',
      category_id: 'Category'
    })
    const cars = await listCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 123.4,
      license_plate: 'ABC-1234',
      fine_amount: 123,
      brand: 'Car_Brand_Test',
      category_id: 'Category'
    })
    const cars = await listCarsUseCase.execute({
      brand: 'Car_Brand_Test'
    })
    expect(cars).toEqual([car])
  })
})
