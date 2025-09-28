import { Topic } from "src/entity/topic.entity";
import { Repository } from "typeorm";
export declare class TopicService {
    private readonly topicRepository;
    constructor(topicRepository: Repository<Topic>);
    findById(id: string): Promise<Topic | null>;
    findbyName(name: string): Promise<Topic | null>;
    createTopic(name: string): Promise<Topic>;
    deleteTopic(id: string): Promise<{
        message: string;
    }>;
}
