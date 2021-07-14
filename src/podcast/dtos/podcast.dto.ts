import { Field, ObjectType, InputType, Int, PickType } from "@nestjs/graphql";
import { CoreOutput } from "./output.dto";
import { Category, Podcast } from "../entities/podcast.entity";
import { IsInt } from "class-validator";
import { Episode } from "../entities/episode.entity";
import { PaginationOutput } from "./pagination.dto";

@ObjectType()
export class GetAllPodcastsOutput extends CoreOutput {
    @Field((type) => [Podcast], { nullable: true })
    podcasts?: Podcast[];
}

@ObjectType()
export class GetPodcastsPagenationOutput extends PaginationOutput {
    @Field((type) => [Podcast], { nullable: true })
    podcasts?: Podcast[];
}

@InputType()
export class GetPodcastsPagenationInput {
    @Field((type) => Int)
    @IsInt()
    page: number;
}

@InputType()
export class GetPodcastsCategoryPagenationInput {
    @Field((type) => Int)
    @IsInt()
    page: number;

    @Field((type) => Category)
    selectCategory: Category;
}

@InputType()
export class PodcastSearchInput extends PickType(Podcast, ["id"], InputType) {}

@ObjectType()
export class PodcastOutput extends CoreOutput {
    @Field((type) => Podcast, { nullable: true })
    podcast?: Podcast;
}

@ObjectType()
export class EpisodesOutput extends CoreOutput {
    @Field((type) => [Episode], { nullable: true })
    episodes?: Episode[];
}

@InputType()
export class EpisodesSearchInput {
    @Field((type) => Int)
    @IsInt()
    podcastId: number;

    @Field((type) => Int)
    @IsInt()
    episodeId: number;
}

export class GetEpisodeOutput extends CoreOutput {
    episode?: Episode;
}
