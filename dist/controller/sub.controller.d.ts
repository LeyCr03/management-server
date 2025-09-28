import { SubService } from "src/service/sub.service";
import { DecodedRequest } from "src/types";
export declare class SubController {
    private readonly subService;
    constructor(subService: SubService);
    createSub(req: DecodedRequest, id: string): Promise<{
        message: string;
    }>;
    deleteSub(id: string): Promise<{
        message: string;
    }>;
}
