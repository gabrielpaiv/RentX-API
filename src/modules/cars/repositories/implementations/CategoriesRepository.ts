import { getRepository, Repository } from 'typeorm'
import { Category } from '../../entities/Category'
import { ICreateCategoryDTO } from '../ICategoriesRepository'

class CategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category)
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      description,
      name
    })

    await this.repository.save(category)
  }

  async list(): Promise<Category[]> {
    return await this.repository.find()
  }

  async findByName(name: string): Promise<Category> {
    return await this.repository.findOne({ name })
  }
}

export { CategoriesRepository }
