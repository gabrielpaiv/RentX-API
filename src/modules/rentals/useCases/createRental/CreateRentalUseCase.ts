import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental'
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  user_id: string
  car_id: string
  expected_return_date: Date
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider
  ) {}
  async execute({
    car_id,
    expected_return_date,
    user_id
  }: IRequest): Promise<Rental> {
    const minimumTime = 24

    const carUnavailable = await this.rentalsRepository.findOpenRentalByCar(
      car_id
    )

    if (carUnavailable) {
      throw new AppError('Car is unavailable')
    }

    const rentalOpenToUser = await this.rentalsRepository.findOpenRentalByUser(
      user_id
    )

    if (rentalOpenToUser) {
      throw new AppError("There's a rental in progress for the user")
    }

    const today = this.dateProvider.today()
    const compare = this.dateProvider.compareInHours(
      today,
      expected_return_date
    )

    if (compare < minimumTime) {
      throw new AppError('Invalid return time')
    }

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date
    })

    return rental
  }
}

export { CreateRentalUseCase }
