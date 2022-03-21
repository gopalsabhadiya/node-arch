import {
    Association,
    DataTypes,
    HasManyAddAssociationMixin,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
    HasManyGetAssociationsMixin,
    HasManyHasAssociationMixin,
    Model,
    Sequelize,
    UUIDV4
} from 'sequelize';
import {AddressEntity} from './Address';

export default class UserEntity extends Model {
    public id!: string;
    public type!: string;
    public contactNo!: string;
    public fullName!: string;
    public userName!: string;
    public emailId!: string;
    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getAddress!: HasManyGetAssociationsMixin<AddressEntity>; // Note the null assertions!
    public addAddress!: HasManyAddAssociationMixin<AddressEntity, number>;
    public hasAddress!: HasManyHasAssociationMixin<AddressEntity, number>;
    public countAddress!: HasManyCountAssociationsMixin;
    public createAddress!: HasManyCreateAssociationMixin<AddressEntity>;

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly address?: AddressEntity[]; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        identities: Association<UserEntity, AddressEntity>;
    };

}

export function initUser(sequelize: Sequelize): void {
    UserEntity.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        type: {
            type: DataTypes.STRING,
            defaultValue: false,
        },
        contactNo: {
            field: 'contact_no',
            type: DataTypes.STRING,
            defaultValue: false,
            unique: true,
        },
        fullName: {
            field: 'full_name',
            type: DataTypes.STRING,
        },
        userName: {
            field: 'user_name',
            type: DataTypes.STRING,
        },
        emailId: {
            field: 'email_id',
            type: DataTypes.STRING,
        },
        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        },
        createdAt: {
            field: 'created_at',
            type: DataTypes.DATE,
        },
        updatedAt: {
            field: 'updated_at',
            type: DataTypes.DATE,
        }
    }, {
        modelName: 'user',
        tableName: "user",
        sequelize: sequelize, // this bit is important
    });


}

export function associateUser(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    UserEntity.hasMany(AddressEntity, {
        sourceKey: 'id',
        foreignKey: 'userId',
        as: 'addresses' // this determines the name in `associations`!
    });
}

