import { Poll } from "src/entity/poll.entity";
import { User } from "src/entity/user.entity";
import { Repository } from "typeorm";
import { Sub } from "src/entity/sub.entity";
import { GetPollMetricsResponse, PollResponse } from "src/types";
import { CreatePollDto, UpdatePollDto } from "src/dto/poll.dto";
import { Topic } from "src/entity/topic.entity";
import { TopicService } from "./topic.service";
import { Vote } from "src/entity/vote.entity";
import { ChoiceService } from "./choices.service";
import { Choice } from "src/entity/choices.entity";
import { UserService } from "./user.service";
export declare class PollService {
    private readonly userRepository;
    private readonly pollRepository;
    private readonly topicRepository;
    private readonly subRepository;
    private readonly voteRepository;
    private readonly choiceRepository;
    private topicService;
    private userService;
    private choiceService;
    constructor(userRepository: Repository<User>, pollRepository: Repository<Poll>, topicRepository: Repository<Topic>, subRepository: Repository<Sub>, voteRepository: Repository<Vote>, choiceRepository: Repository<Choice>, topicService: TopicService, userService: UserService, choiceService: ChoiceService);
    findById(id: string): Promise<Poll | null>;
    getPollById(id: string): Promise<PollResponse | null>;
    createPoll(createPollDto: CreatePollDto): Promise<PollResponse>;
    deletePoll(id: string): Promise<{
        message: string;
    }>;
    updatePoll(id: string, updatePollDto: UpdatePollDto): Promise<{
        message: string;
    }>;
    getPollSubsCount(id: string): Promise<number>;
    getPollSubs(pollId: string): Promise<User[]>;
    getPollsByTopic(topicName: string): Promise<PollResponse[]>;
    getPollsBySubs(): Promise<PollResponse[]>;
    getAllPolls(): Promise<PollResponse[]>;
    getPollsByVotes(): Promise<PollResponse[]>;
    getPollVotesCount(id: string): Promise<number | undefined>;
    getUserVote(id: string, userId: string): Promise<number | null>;
    getPollMetrics(id: string, userId: string): Promise<GetPollMetricsResponse>;
}
