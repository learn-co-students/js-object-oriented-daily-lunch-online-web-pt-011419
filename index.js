// meal
    // has many customers
// delivery
    // belongs to a meal
    // belongs to a customer
    // belongs to a neighborhood
// customer
    // has many deliveries
    // has many meals through deliveries
    // belongs to a neighborhood
// neighborhood
    // has many deliveries
    // has many customers through deliveries
    // has many meals through deliveries

// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0


class Neighborhood {
    constructor(name){
        this.name = name;
        this.id = ++neighborhoodId;
        store.neighborhoods.push(this)
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery) {
                return delivery.neighborhoodId === this.id
            }.bind(this)
        )
    }

    customers() {
        return store.customers.filter(
            function(customer) {
                return customer.neighborhoodId === this.id
            }.bind(this)
        )
    }

    meals() { 
        let mealArray = this.deliveries().map(
            function(delivery) {    
                return delivery.meal()
            }.bind(this)
        )
        return [...new Set(mealArray)]
    }
}

class Customer {
    constructor(name, neighborhoodId) {
        this.name = name
        this.id = ++customerId
        this.neighborhoodId = neighborhoodId

        store.customers.push(this)
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery) {
                return delivery.customerId === this.id
            }.bind(this)
        )
    }

    meals() {
        return this.deliveries().map(
            function(delivery) {
                return delivery.meal()
            }.bind(this)
        )
    }
    
    totalSpent() {
        let priceArray = []
        this.meals().filter(
            function(meal) {
                priceArray.push(meal.price)
            }
        )
        return priceArray.reduce(function(total, price){
            return price + total
        }, 0)
    }
}

class Meal {
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++mealId

        store.meals.push(this)
    }

    deliveries(){
        return store.deliveries.filter(
            function(delivery) {
                return delivery.mealId === this.id
            }.bind(this)
        )
    }

    customers() {
        return this.deliveries().map(
            function(delivery) {
                return delivery.customer()
            }.bind(this)
        )
    }

    static byPrice () {
        return store.meals.slice().sort(function(meal1, meal2){
            return meal2.price - meal1.price
        })
    }

    // come back to making it customer meals unique
    // come back to byPrice() - A class method that orders all meal instances by their price in descending order. Use the static keyword to write a class method.

}

class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        this.id = ++deliveryId

        store.deliveries.push(this)
    }

    meal() {
        return store.meals.find(
            function(meal) {
                return this.mealId === meal.id 
            }.bind(this)
        )
    }

    customer() {
        return store.customers.find(
            function(customer) {
                return this.customerId === customer.id
            }.bind(this)
        )
    }

    neighborhood() {
        return store.neighborhoods.find(
            function(neighborhood){
                return this.neighborhoodId === neighborhood.id
            }.bind(this)
        )
    }
}
