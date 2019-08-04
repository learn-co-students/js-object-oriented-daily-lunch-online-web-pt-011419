// global datastore
let store = { neighborhoods: [], customers: [], meals: [], deliveries: [] };

let neighborhoodId = 0;

class Neighborhood {
    constructor(name) {
      this.id = ++neighborhoodId;
      this.name = name;

      store.neighborhoods.push(this);
    }

    deliveries() {
       return store.deliveries.filter(
           function(delivery) {
               return delivery.neighborhoodId === this.id;
           }.bind(this)
       );
   }

   customers() {
      return store.customers.filter(
          function(customer) {
              return customer.deliveries().filter(
                function(delivery) {
                  return delivery.neighborhoodId === this.id;
                }.bind(this)
              );
          }.bind(this)
      );
  }

  meals() {
     return store.meals.filter(
         function(meal) {
             return meal.deliveries().filter(
               function(delivery) {
                 return delivery.neighborhoodId === this.id;
               }.bind(this)
             );
         }.bind(this)
     );
 }



}

let customerId = 0;

class Customer {
    constructor (name, neighborhood) {
      this.id = ++customerId;
      this.name = name;
      if (neighborhood) {
            this.neighborhoodId = neighborhood
        }

      store.customers.push(this);
    }

    setNeighborhood(neighborhood) {
      this.neighborhoodId = neighborhood.id;
  }
    neighborhood() {
      return store.neighborhoods.find(
          function(neighborhood) {
              return neighborhood.id === this.neighborhoodId;
          }.bind(this)
      );
  }

    deliveries() {
       return store.deliveries.filter(
           function(delivery) {
               return delivery.customerId === this.id;
           }.bind(this)
       );
   }


   meals() {
    return this.deliveries().map(function(element) {
      return element.meal()
    })
  }

  totalSpent() {
       return this.meals().reduce((total, meal) => (total += meal.price), 0);
     }



}

let mealId = 0;

class Meal {
    constructor(title, price) {
      this.id = ++mealId;
      this.title = title;
      this.price = price;


      store.meals.push(this);
    }

    deliveries() {
       return store.deliveries.filter(
           function(delivery) {
               return delivery.mealId === this.id;
           }.bind(this)
       );
   }


   customers() {
      return store.customers.filter(
          function(customer) {
              return customer.deliveries().filter(
                function(delivery) {
                  return delivery.mealId === this.id;
                }.bind(this)
              );
          }.bind(this)
      );
  }

  static byPrice() {
      return store.meals.sort((a, b) => (a.price < b.price) ? 1 : -1)

  }
}
let deliveryId = 0;

class Delivery {
    constructor(meal, neighborhood, customer) {
      this.id = ++deliveryId;
      if (meal) {
           this.mealId = meal
       }

       if (neighborhood) {
               this.neighborhoodId = neighborhood
           }
      if (customer) {
            this.customerId = customer
        }

      store.deliveries.push(this);
    }

    setMeal(meal) {
        this.mealId = meal;
    }
    meal() {
        return store.meals.find(
            function(meal) {
                return meal.id === this.mealId;
            }.bind(this)
        );
    }

    setCustomer(customer) {
        this.customerId = customer;
    }
    customer() {
        return store.customers.find(
            function(customer) {
                return customer.id === this.customerId;
            }.bind(this)
        );
    }

    setNeighboorhood(neighborhood) {
        this.neighborhoodId = neighborhood;
    }
    neighborhood() {
        return store.neighborhoods.find(
            function(neighborhood) {
                return neighborhood.id === this.neighborhoodId;
            }.bind(this)
        );
    }


}
