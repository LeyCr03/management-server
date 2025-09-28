import { CreateCommentDto } from "src/dto/comment.dto";
import { CommentService } from "src/service/comment.service";
import { DecodedRequest } from "src/types";
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    createComment(createCommentDto: CreateCommentDto, req: DecodedRequest): Promise<{
        message: string;
    }>;
    getCommentById(id: string): Promise<import("../entity/comment.entity").Comment>;
    deleteComment(id: string): Promise<{
        message: string;
    }>;
}
