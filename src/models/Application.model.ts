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
import User from './User.model';

export enum ApplicationStatus {
    PENDING,
    APPROVED,
    DECLINED
}

@Entity()
export default class Application extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string
    @CreateDateColumn() createdAt: Date
    @UpdateDateColumn() updatedAt: Date


    @Column() text: string;
    @Column() status: ApplicationStatus;
    @OneToOne(type => User, u => u.application) user?: User;
}
