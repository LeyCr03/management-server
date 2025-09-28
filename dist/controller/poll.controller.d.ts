import { PollService } from '../service/poll.service';
import { DecodedRequest, PollResponse } from 'src/types';
import { Poll } from 'src/entity/poll.entity';
import { UpdatePollDto, CreatePollDto } from 'src/dto/poll.dto';
export declare class PollController {
    private readonly pollService;
    constructor(pollService: PollService);
    getUserSubs(id: string): Promise<PollResponse | null>;
    create(createPollDto: CreatePollDto): Promise<PollResponse>;
    update(id: string, updatePollDto: UpdatePollDto): Promise<{
        message: string;
    }>;
    delete(id: string): Promise<{
        message: string;
    }>;
    getPollSubs(id: string): Promise<number>;
    getPollById(id: string): Promise<Poll>;
    getPollMetrics(id: string, req: DecodedRequest): Promise<import("src/types").GetPollMetricsResponse>;
    getAll(): Promise<PollResponse[]>;
    getPollsBySubs(): Promise<PollResponse[]>;
    getPollsByTopic(topicName: string): Promise<PollResponse[]>;
}
