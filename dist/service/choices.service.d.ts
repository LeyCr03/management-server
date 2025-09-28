import { Choice } from "src/entity/choices.entity";
import { Repository } from "typeorm";
export declare class ChoiceService {
    private readonly choiceRepository;
    constructor(choiceRepository: Repository<Choice>);
    findById(id: string): Promise<Choice | null>;
    createChoice(content: string): Promise<Choice>;
    deleteChoice(id: string): Promise<{
        message: string;
    }>;
}
