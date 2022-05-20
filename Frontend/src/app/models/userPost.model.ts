export interface UserPost {
    id: number;
    userId: number;
    createdAt: Date;
    text: string;
    imagePath: string;
    reactions: Reaction[];
    comments: Comment[];
}

export interface  Reaction{
    userId: number;
    liked: boolean;
    disliked: boolean;
}

export interface  Comment{
    userId: number;
    createdAt: Date;
    text: string;
}