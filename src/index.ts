import express,{Express} from "express"
import {  sequelize } from "./databases/connection";
import { userRouter } from "./routes/user.route";
import { portNumber, userContext } from "./constants/constant";
import {loggers} from "./middlewares/logger/logger.middleware"


class App{
    private app!:Express;
    private port!:number|string;
    private context!: string;

    constructor() {
        this.startApp();
    }
    startApp(){
        this.app=express();
        this.port=process.env.PORT
        this.loadGlobalMiddleWare();
        sequelize;
        this.loadRouter();
        this.Server();
        
    } 
    loadGlobalMiddleWare() {
        this.context = userContext;
        this.app.use(express.json());
        this.port = portNumber;
    
    }
    loadRouter() {
        this.app.use(this.context ,userRouter.userRouter());
      }
    Server() {
        this.app.listen(this.port, this.callback);
    }
      private callback = () => {
            loggers.info(`Server listing on port: ${this.port}`);
          };
    }
    new App();