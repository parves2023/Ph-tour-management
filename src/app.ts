import express, { Request, Response } from "express";



const app = express(); //set it on the app


app.get("/", (req: Request, res: Response)=>{ // also sent this into app
    res.status(200).json({
        message: "Welcome tour management backend system"
    })
})

export default app;
