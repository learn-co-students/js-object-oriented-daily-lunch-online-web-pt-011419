// global datastore
let store = { neighborhoods: [], meals: [], customers: [], deliveries: [] };

let neighborhood = 0;

class Neighborhood {
  constructor(name) {
    this.name = name
    this.id = ++neighborhood
    store.neighborhoods.push(this)
  }

  deliveries() {
    return store.deliveries.filter( (delivery) => {
      return delivery.neighborhoodId === this.id;
    });
  }

  customers() {
    return store.customers.filter( (customer) => {
      return customer.neighborhoodId === this.id;
    });
  }

  meals() {
    let meals_array = []
    this.deliveries().map( delivery => {
      meals_array.push(delivery.meal());
    });
    return [...new Set(meals_array)];
  }
}

let customerId = 0

class Customer {
  constructor(name, neighborhood) {
    this.name = name
    this.neighborhoodId = neighborhood
    this.id = ++customerId
    store.customers.push(this)
  }

  deliveries() {
    return store.deliveries.filter( (delivery) => {
      return (delivery.customerId === this.id);
    });
  }

  meals() {
    return this.deliveries().map( (delivery) => {
      return delivery.meal();
    })
  }

  totalSpent() {
    let total = 0;
    this.meals().forEach(meal => {
      total += meal.price;
    });
    return total;
  }
}

let mealId = 0

class Meal {
  constructor(title, price) {
    this.title = title
    this.price = price
    this.id = ++mealId
    store.meals.push(this)
  }

  deliveries() {
    return store.deliveries.filter( (delivery) => {
      return (delivery.mealId === this.id);
    });
  }

  customers() {
    return this.deliveries().map( (delivery) => {
      return delivery.customer();
    })
  }

  static byPrice() {
    return store.meals.sort( (mealA, mealB) => {
      return mealB.price - mealA.price;
    });
  }
}

let deliveryId = 0

class Delivery {
  constructor(mealId, neighborhoodId, customerId) {
    this.mealId = mealId
    this.neighborhoodId = neighborhoodId
    this.customerId = customerId
    this.id = ++deliveryId
    store.deliveries.push(this)
  }

  customer() {
    return store.customers.find(customer => customer.id === this.customerId);
  }

  meal() {
    return store.meals.find(meal => meal.id === this.mealId);
  }

  neighborhood() {
    return store.neighborhoods.find(neighborhood => neighborhood.id === this.neighborhoodId);
  }
}
