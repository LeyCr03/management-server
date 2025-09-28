import { ChoiceService } from "src/service/choices.service";
export declare class ChoiceController {
    private readonly choiceService;
    constructor(choiceService: ChoiceService);
    createSub(content: string): Promise<import("../entity/choices.entity").Choice>;
    deleteSub(id: string): Promise<{
        message: string;
    }>;
}
