import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import {userRouter} from "./controller/user.controller";

dotenv.config();


const bootstrap = async () => {
    const app = express();

    app.use(cors());
    app.use(express.json())
    app.use(express.urlencoded({extended: true, limit: '50mb'}));

    
    const port: number = Number(process.env.NODE_ENV_PORT) | 3030;

    app.use("/api/v1", userRouter);


    app.get("/api/v1", (_,res) => {
        res.send({
            message: "OKE V1"
        })
    })

    app.get("/", (_,res) => {
        res.send({
            message: "OKE"
        })
    })

    app.listen(port, () => {
        console.log(`Server running on PORT : ${port}`)
    })

    return app;
}


bootstrap();