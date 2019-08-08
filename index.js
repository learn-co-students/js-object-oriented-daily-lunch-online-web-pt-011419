// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhoodId = 0
let customerId = 0
let mealId = 0
let deliveryId = 0

class Neighborhood{
    constructor(name){
        this.name = name
        this.id = ++neighborhoodId
        store.neighborhoods.push(this)
    }
    deliveries(){
       return store.deliveries.filter(delivery => delivery.neighborhoodId === this.id)
    }

    customers(){
        return store.customers.filter(customer => customer.neighborhoodId === this.id)
    }

    meals() { 
        let mealArray = this.deliveries().map(delivery => delivery.meal())

        return [...new Set(mealArray)]
        // new Set(myArray) creates a Unique set of elements.
        // [...] creates a new array of those contents.
    }
}

class Customer{
    constructor(name, neighborhoodId){
        this.name = name
        this.neighborhoodId = neighborhoodId
        this.id = ++customerId
        store.customers.push(this)
    }
    
    deliveries(){
        return store.deliveries.filter(delivery => delivery.customerId === this.id)
    }

    meals(){
        return this.deliveries().map(delivery => delivery.meal())
    }

    totalSpent(){
        return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
}

class Meal{
    constructor(title, price){
        this.title = title
        this.price = price
        this.id = ++mealId
        store.meals.push(this)
    }

    deliveries(){
        return store.deliveries.filter(delivery => delivery.mealId === this.id)
    }

    customers(){
        return this.deliveries().map(delivery => delivery.customer())
    }

    static byPrice() {
        return store.meals.slice().sort((meal1, meal2) => meal2.price - meal1.price)
    }
}

class Delivery{
    constructor(mealId, neighborhoodId, customerId){
        this.mealId = mealId
        this.neighborhoodId = neighborhoodId
        this.customerId = customerId
        this.id = ++deliveryId
        store.deliveries.push(this)
    }

    meal(){
        return store.meals.find(meal => {
            return meal.id === this.mealId
        })
    }

    customer(){
        return store.customers.find(customer => {
            return customer.id === this.customerId
        })
    }

    neighborhood(){
        return store.neighborhoods.find(neighborhood => {
            return neighborhood.id === this.neighborhoodId
        })
    }
}


// For Testing
    let meal;
    let secondMeal;
    let customer;
    let secondCustomer;
    let delivery;
    let secondDelivery;
    let thirdDelivery;
    let neighborhood;
    let secondNeighborhood;

      neighborhood = new Neighborhood('Dumbo');
      secondNeighborhood = new Neighborhood('Hamsterdam');
      meal = new Meal('5 lbs of Fruity Pebbles', 25);
      secondMeal = new Meal('An entire large stuffed crust pizza from pizza hut', 20);
      customer = new Customer('Paul Rudd', neighborhood.id);
      secondCustomer = new Customer('Todd', secondNeighborhood.id);
      delivery = new Delivery(meal.id, neighborhood.id, customer.id);
      secondDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);
      thirdDelivery = new Delivery(secondMeal.id, secondNeighborhood.id, secondCustomer.id);

secondNeighborhood.meals()