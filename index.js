// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

class Neighborhood{
    constructor(name){
        this.name = name
        this.id = ++neighborhoodId
    }
    deliveries(){
        
    }
}

class Customer{
    constructor(name, neighborhoodId){
        this.name = name
        this.neighborhoodId = neighborhoodId
        this.id = ++customerId
    }
}

class Meal{
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++mealId
    }
}

class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        this.id = ++deliveryId
    }
}