export const reponseData = (data, message, status, reponse) => {
    reponse.status(status).json({
        statusCode: status, 
        message,
        content: data,
        data: new Date()
    })
}