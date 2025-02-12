import { Request, Response } from 'express';
import { ResourceService } from './resource.service';
import { ResourceDto, ResourceFilterDto, UpdateResourceDto } from './resource.dto';
import { ActiveFilterEnum } from './resource.enum';
import HttpStatusCodes from './../common/httpStatusCodes';

export class ResourceController {
    private service: ResourceService;

    constructor() {
        this.service = new ResourceService();
    }

    async create(req: Request, res: Response): Promise<void> {
        try {
            const resource = await this.service.create(req.body as ResourceDto);
            res.status(HttpStatusCodes.CREATED).json(resource);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Failed to create resource', error });
        }
    }

    async get(req: Request, res: Response): Promise<void> {
        try {
            const { keyword, isActive } = req.query;
            const filters: ResourceFilterDto = {
                keyword: keyword ? keyword as string : undefined,
                isActive: isActive ? isActive as ActiveFilterEnum : undefined,
            };
            const resources = await this.service.get(filters);
            res.status(HttpStatusCodes.OK).json(resources);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Failed to get resources', error });
        }
    }

    async getOne(req: Request, res: Response): Promise<void> {
        try {
            const resource = await this.service.getOne(Number(req.params.id));
            if (!resource) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
                return;
            }
            res.status(HttpStatusCodes.OK).json(resource);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Failed to get resource', error });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const resource = await this.service.update(
                Number(req.params.id),
                req.body as UpdateResourceDto
            );
            if (!resource) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
                return;
            }
            res.json(resource);
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Failed to update resource', error });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const success = await this.service.delete(Number(req.params.id));
            if (!success) {
                res.status(HttpStatusCodes.NOT_FOUND).json({ message: 'Resource not found' });
                return;
            }
            res.status(HttpStatusCodes.NO_CONTENT).send();
        } catch (error) {
            res.status(HttpStatusCodes.BAD_REQUEST).json({ message: 'Failed to delete resource', error });
        }
    }
}