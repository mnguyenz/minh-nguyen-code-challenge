import { AppDataSource } from './../config/database.config';
import { Resource } from './../entities/resource.entity';
import { ILike, Repository } from 'typeorm';
import { ResourceDto, ResourceFilterDto, UpdateResourceDto } from './resource.dto';
import { ActiveFilterEnum } from './resource.enum';

export class ResourceRepository {
    private repository: Repository<Resource>;

    constructor() {
        this.repository = AppDataSource.getRepository(Resource);
    }

    async create(createResourceDto: ResourceDto): Promise<Resource> {
        const resource = this.repository.create({
            ...createResourceDto,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        return await this.repository.save(resource);
    }

    async get(filters?: ResourceFilterDto): Promise<Resource[]> {
        const { keyword, isActive } = filters;
        const whereConditions: any[] = keyword
            ? [{ name: ILike(`%${keyword}%`) }, { description: ILike(`%${keyword}%`) }]
            : [];

        if (isActive && isActive !== ActiveFilterEnum.ALL) {
            const isActiveValue = isActive === ActiveFilterEnum.ACTIVE;
            whereConditions.length
                ? whereConditions.forEach(condition => condition.isActive = isActiveValue)
                : whereConditions.push({ isActive: isActiveValue });
        }

        return await this.repository.find({
            where: whereConditions
        });
    }

    async getOne(id: number): Promise<Resource | null> {
        return await this.repository.findOneBy({ id });
    }

    async update(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource | null> {
        const resource = await this.repository.findOne({ where: { id } });
        if (!resource) return null;

        Object.assign(resource, {
            ...updateResourceDto,
            updatedAt: new Date(),
        });

        return this.repository.save(resource);
    }

    async delete(id: number): Promise<boolean> {
        const result = await this.repository.delete(id);
        console.log(result);
        return result.affected ? result.affected > 0 : false;
    }
}