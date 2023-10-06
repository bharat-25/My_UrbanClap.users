import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../databases/connection";
import User from "./user.model";

class Token extends Model {
//   public id!: number;
//   public username!: string;
//   public phone_number!: string;
//   public email!: string;
//   public password!: string;
//   public address!: string;
//   public session!: boolean;
//   public status!: boolean;
//   public readonly createdAt!: Date;
//   public readonly updatedAt!: Date;
}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    UserId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:User,
            key:"id"
        }
    },
    accessToken: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    refreshToken: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    

  },
  {
    sequelize,
    modelName: "tokens",
    timestamps:true
  }
);
Token.sync({alter:true})

export default Token;