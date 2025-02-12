import { Router } from 'express';
import { ResourceController } from './resource.controller';
import { validateDto } from './../common/validate.dto';
import { ResourceDto, ResourceFilterDto, UpdateResourceDto } from './resource.dto';

export class ResourceModule {
    public router: Router;
    private resourceController: ResourceController;

    constructor() {
        this.router = Router();
        this.resourceController = new ResourceController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.post('/', validateDto(ResourceDto), (req, res) => this.resourceController.create(req, res));
        this.router.get('/', validateDto(ResourceFilterDto, 'query'), (req, res) => this.resourceController.get(req, res));
        this.router.get('/:id', (req, res) => this.resourceController.getOne(req, res));
        this.router.put('/:id', validateDto(UpdateResourceDto), (req, res) => this.resourceController.update(req, res));
        this.router.delete('/:id', (req, res) => this.resourceController.delete(req, res));
    }
}