export const responseHandler = (res, statusCode, message, payload) => {
    return res.status(statusCode).json({
        success: true,
        message,
        payload: {},
    })
}
