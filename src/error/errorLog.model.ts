import { Date } from 'mongoose';
import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class errorLog extends Model {
  @Column
  errorDate: Date;

  @Column
  errorRoute: string;

  @Column
  error: string;
}