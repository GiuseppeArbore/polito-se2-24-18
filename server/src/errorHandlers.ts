import { validationResult } from "express-validator"
import { Router } from "websocket-express";

function validateRequest(req: any, res: any, next: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        let error = "The parameters are not formatted properly\n\n"
        errors.array().forEach((e: any) => {
            error += "- Parameter: **" + e.param + "** - Reason: *" + e.msg + "* - Location: *" + e.location + "*\n\n"
        })
        return res.status(422).json({ error: error })
    }
    return next()
}

function validateWsRequest(req: any, res: any, next: any) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422)
    }
    return next()
}

function registerErrorHandler(router: Router) {
    router.use((err: any, req: any, res: any, next: any) => {
        return res.status(err.customCode || 400).json({
            error: err.customMessage || "Internal Server Error",
            status: err.customCode || 400
        });
    })
}


export { validateRequest, validateWsRequest, registerErrorHandler }