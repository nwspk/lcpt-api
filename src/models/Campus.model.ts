import {
    BaseEntity,
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Column,
    ManyToOne,
    OneToOne,
    OneToMany,
} from 'typeorm'
import User from './User.model';

@Entity()
export default class Campus extends BaseEntity {
    @PrimaryGeneratedColumn('uuid') id: string
    @CreateDateColumn() createdAt: Date
    @UpdateDateColumn() updatedAt: Date

    @Column() name: string;
    @Column() address: string;
    @Column() webUrl: string;
    @Column() calendarUrl: string;
    @ManyToOne(type => User) dean: User;
    @OneToMany(type => User, u => u.campus) users: User[];
}
