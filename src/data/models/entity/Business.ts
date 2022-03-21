import {Association, DataTypes, HasOneGetAssociationMixin, Model, Sequelize, UUIDV4} from 'sequelize';
import UserEntity from './UserEntity'

export default class BusinessEntity extends Model {
    public id!: string; // Note that the `null assertion` `!` is required in strict mode.
    public businessName!: string;
    public category!: string;
    public subCategory!: string;
    public description!: string;
    public active!: boolean;

    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public getUser!: HasOneGetAssociationMixin<UserEntity>; // Note the null assertions!

    // You can also pre-declare possible inclusions, these will only be populated if you
    // actively include a relation.
    public readonly user?: UserEntity; // Note this is optional since it's only populated when explicitly requested in code

    public static associations: {
        user: Association<BusinessEntity, UserEntity>;
    };
}

export function initBusiness(sequelize: Sequelize): void {
    BusinessEntity.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        businessName: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        subCategory: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: false,
            allowNull: false,
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
        modelName: 'business',
        tableName: "business",
        sequelize: sequelize, // this bit is important
    });

}

export function associateBusiness(): void {
    // Here we associate which actually populates out pre-declared `association` static and other methods.
    BusinessEntity.belongsTo(UserEntity, {targetKey: 'id'});
}

