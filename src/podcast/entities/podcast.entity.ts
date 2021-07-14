import { Episode } from "./episode.entity";
import { ObjectType, Field, registerEnumType } from "@nestjs/graphql";
import { IsString, Min, Max, IsNumber } from "class-validator";
import {
    Column,
    Entity,
    OneToMany,
    ManyToOne,
    RelationId,
    ManyToMany,
} from "typeorm";
import { CoreEntity } from "./core.entity";
import { Review } from "./review.entity";
import { User } from "../../users/entities/user.entity";

export enum Category {
    News = "News",
    Culture = "Culture",
    Education = "Education",
    Business = "Business",
}

registerEnumType(Category, { name: "Category" });

@Entity()
@ObjectType()
export class Podcast extends CoreEntity {
    @Column()
    @Field((type) => String)
    @IsString()
    title: string;

    @Column({ type: "simple-enum", enum: Category })
    @Field((type) => Category)
    category: Category;

    @Column({ default: 0 })
    @Field((type) => Number)
    @IsNumber()
    @Min(0)
    @Max(5)
    rating: number;

    @Column({ default: "" })
    @Field((type) => String)
    @IsString()
    description: string;

    @Column({ nullable: true })
    @Field((type) => String, { nullable: true })
    @IsString()
    coverImg?: string;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.podcasts, {
        onDelete: "CASCADE",
    })
    creator: User;

    @RelationId((podcast: Podcast) => podcast.creator)
    creatorId: number;

    @OneToMany(() => Episode, (episode) => episode.podcast)
    @Field((type) => [Episode])
    episodes: Episode[];

    @OneToMany(() => Review, (review) => review.podcast)
    @Field((type) => [Review], { nullable: true })
    reviews?: Review[];

    @ManyToMany(() => User, (user) => user.subsriptions)
    @Field(() => [User], { nullable: true })
    listeners?: User[];
}
