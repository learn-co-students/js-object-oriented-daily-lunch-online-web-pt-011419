// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };
let neighborhoodId = 1
class Neighborhood {
    constructor(name) {
        this.id = neighborhoodId++;
        this.name = name;
        store.neighborhoods.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery => {
            return delivery.neighborhoodId == this.id;
          });
    }
    customers(){
        return store.customers.filter(customer => {
            return customer.neighborhoodId == this.id;
        });
    }
    meals(){
       const allMeals = this.customers().map(customer => customer.meals());
       return [...new Set(allMeals.flat())];
    };
}


let customerId = 1
class Customer{
    constructor(name, neighborhoodId ){
        this.id = customerId++;
        this.name = name;
        this.neighborhoodId = neighborhoodId;
        store.customers.push(this);
    }
    deliveries(){
        return store.deliveries.filter(delivery => {return delivery.customerId == this.id;});
    }
    meals(){
        return this.deliveries().map(delivery => delivery.meal());
    }
    totalSpent(){
        return this.meals().reduce((total, meal) => (total += meal.price), 0);
    }
}

let mealId = 1
class Meal {
    constructor(title, price = 0){
        this.id = mealId++;
        this.title = title;
        this.price = price;
        store.meals.push(this);  
    }
    deliveries(){
        return store.deliveries.filter(delivery => {return delivery.mealId == this.id;});
    }
    customers(){
        const allCustomers = this.deliveries().map(delivery => delivery.customer());
        return [...new Set(allCustomers)];
    }

    static byPrice() {
        return store.meals.sort((a, b) => b.price - a.price);
    
      }
}

let deliveryId = 1
class Delivery {
    constructor(mealId, neighborhoodId, customerId){
        this.id = deliveryId++;
        this.mealId = mealId;
        this.neighborhoodId = neighborhoodId;
        this.customerId = customerId;
        store.deliveries.push(this);
    }
    meal(){
        return store.meals.find(meal => meal.id === this.mealId );
    }
    customer(){
        return store.customers.find(customer => customer.id === this.customerId );
    }
    neighborhood(){
        return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId );
    }
}