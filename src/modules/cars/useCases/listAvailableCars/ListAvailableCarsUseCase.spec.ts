import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory'
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase'

let carsRepositoryInMemory: CarsRepositoryInMemory
let listAvailableCarsUseCase: ListAvailableCarsUseCase

describe('List Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory()
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    )
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
    const cars = await listAvailableCarsUseCase.execute({})
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by brand', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 123.4,
      license_plate: 'ABC-1234',
      fine_amount: 123,
      brand: 'Car_Brand_Test',
      category_id: 'Category'
    })
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'Car_Brand_Test'
    })
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by name', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car_Name_Test',
      description: 'Car description',
      daily_rate: 123.4,
      license_plate: 'ABC-1234',
      fine_amount: 123,
      brand: 'Car Brand',
      category_id: 'Category'
    })
    const cars = await listAvailableCarsUseCase.execute({
      name: 'Car_Name_Test'
    })
    expect(cars).toEqual([car])
  })
  it('should be able to list all available cars by category', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'Car1',
      description: 'Car description',
      daily_rate: 123.4,
      license_plate: 'ABC-1234',
      fine_amount: 123,
      brand: 'Car Brand',
      category_id: 'Category_Test'
    })
    const cars = await listAvailableCarsUseCase.execute({
      category_id: 'Category_Test'
    })
    expect(cars).toEqual([car])
  })
})
