import { TopicService } from "src/service/topic.service";
export declare class TopicController {
    private readonly topicService;
    constructor(topicService: TopicService);
    getTopicById(id: string): Promise<import("../entity/topic.entity").Topic>;
    createTopic(name: string): Promise<import("../entity/topic.entity").Topic>;
    deleteTopic(id: string): Promise<{
        message: string;
    }>;
}
