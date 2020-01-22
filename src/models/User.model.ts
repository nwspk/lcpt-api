import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    OneToOne,
} from 'typeorm'
import Application from './Application.model';
import Campus from './Campus.model';

@Entity()
export default class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string
    @CreateDateColumn() createdAt: Date
    @UpdateDateColumn() updatedAt: Date


    @Column() name: string;
    @Column({ nullable: true }) email: string;
    @Column() phoneNumber: string;
    @Column({ nullable: true }) bio?: string;
    @Column({ nullable: true }) stripeSubId?: string;
    @Column({ default: false }) isAdmin: boolean;
    @Column({ default: false }) isMember: boolean;
    @Column({ default: false }) isFellow: boolean;
    @Column({ nullable: true }) receivedFellowshipAt?: Date;
    @ManyToOne(type => Campus, { nullable: true, eager: true }) campus?: Campus;
    @OneToOne(type => Application, { nullable: true }) application?: Application;
}
