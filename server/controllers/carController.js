// The controller to handle car related requests

const CarModel = require("../models/carModel");

const CarController = {

    getCars: function(request,response){
        CarModel.getAllCars(function(error,result){
            if(error){
                console.log("error fetching the cars",error);
                return response
                .status(500)
                .json({success:false, message: "Database error"});

            }
            response.json(result);
        })
    }
}
module.exports = CarController;
