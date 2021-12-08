import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository'
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider'
import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { inject, injectable } from 'tsyringe'

interface IRequest {
  token: string
  password: string
}

@injectable()
class ResetUserPasswordUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DayjsDateProvider')
    private dateProvider: IDateProvider,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken(token)

    if (!userToken) {
      throw new AppError('Invalid token!')
    }

    if (
      this.dateProvider.compareIfBefore(
        userToken.expire_date,
        this.dateProvider.today()
      )
    ) {
      throw new AppError('Token expired!')
    }

    const user = await this.usersRepository.findById(userToken.user_id)

    user.password = await hash(password, 8)

    await this.usersRepository.create(user)

    await this.usersTokensRepository.deleteById(userToken.id)
  }
}

export { ResetUserPasswordUseCase }
