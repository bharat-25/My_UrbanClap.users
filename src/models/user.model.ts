import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../databases/connection";

class User extends Model {
  public id!: number;
  public username!: string;
  public phone_number!: string;
  public email!: string;
  public password!: string;
  public address!: string;
  public session!: boolean;
  public status!: boolean;
  public role!:string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address:{
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Assuming default status is false (inactive)
    },
    role:{
      type:DataTypes.STRING,
      defaultValue:"user"
    }
  },
  {
    sequelize,
    modelName: "users",
    timestamps:true
  }
);
User.sync({alter:true})
export default User;