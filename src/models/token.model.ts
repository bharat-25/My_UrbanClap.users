import { DataTypes, Model } from "sequelize";
import  {sequelize} from "../databases/connection";
import User from "./user.model";
import Session from "./userSession.model";

class Token extends Model {}

Token.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId:{
        type:DataTypes.INTEGER,
        references:{
              model:User,
              key:'id'
          },
        allowNull:true,
    },
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },

    refreshToken: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    device:{
      type:DataTypes.STRING,
      allowNull:false,
    //   references:{
    //     model:Session,
    //     key:'device'
    // }
    },
    // device:{
    //   type:DataTypes.STRING,
    //   allowNull:true
    // },

    

  },
  {
    sequelize,
    modelName: "tokens",
    timestamps:true
  }
);

Token.sync({alter:true})

export default Token;