import { Resource } from 'src/entities/resource.entity';
import { ResourceDto, ResourceFilterDto, UpdateResourceDto } from './resource.dto';
import { ResourceRepository } from './resource.repository';


export class ResourceService {
    private repository: ResourceRepository;

    constructor() {
        this.repository = new ResourceRepository();
    }

    async create(createResourceDto: ResourceDto): Promise<Resource> {
        return this.repository.create(createResourceDto);
    }

    async get(filters?: ResourceFilterDto): Promise<Resource[]> {
        return this.repository.get(filters);
    }

    async getOne(id: number): Promise<Resource> {
        return this.repository.getOne(id);
    }

    async update(id: number, updateResourceDto: UpdateResourceDto): Promise<Resource | null> {
        return this.repository.update(id, updateResourceDto);
    }

    async delete(id: number): Promise<boolean> {
        return this.repository.delete(id);
      }
}