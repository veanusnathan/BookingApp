
class HttpResponse{
    constructor(res, data){
        this.res = res;
        this.data = data;
        this.response = {isError: true, message: "", data: null, code: 500} 
        console.log(res)
    }

    error(message, code = 500){
        console.log(message)
        this.response = {isError: true, message, data: null, code} 
        return this;
    }

    send(){
        this.res.status(this.response.code).send(this.response)
    }
}




// function HttpResponse(res, body){
//     let response = {isError: true, message: "", data: null, code: 500}    
   
//     const error = (message, code = 500) => {
//         response = {...response, message, code}
//         return this;
//     }

//     const send = () => {
//         res.status(response.code).send(response)
//     }

//     return {error, send}

// }

module.exports = HttpResponse;