import { CreateCommentDto } from "src/dto/comment.dto";
import { Comment } from "src/entity/comment.entity";
import { Repository } from "typeorm";
import { UserService } from "./user.service";
import { PollService } from "./poll.service";
export declare class CommentService {
    private readonly commentRepository;
    private userService;
    private pollService;
    constructor(commentRepository: Repository<Comment>, userService: UserService, pollService: PollService);
    findById(id: string): Promise<Comment | null>;
    findbyUserName(userName: string): Promise<Comment | null>;
    createComment(createCommentDto: CreateCommentDto): Promise<{
        message: string;
    }>;
    deleteComment(id: string): Promise<{
        message: string;
    }>;
}
