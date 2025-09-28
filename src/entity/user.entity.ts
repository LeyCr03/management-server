import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';
@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', unique: true })
    email: string

    @Column({ type: 'varchar' })
    image?: string | null

    @Column({ type: 'varchar' })
    name: string

    @Column({ type: 'text' })
    description: string 

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text', nullable: true })
    refreshTokenHash?: string | null;

}