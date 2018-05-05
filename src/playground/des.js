console.log("Hello");

const person = {
  name: "Andrew",
  age: 26,
  location: {
    city: "Philadelphia",
    temp: 92
  }
}

const { name, age } = person;

console.log(`${name} is ${age}`);

const { city, temp } = person.location;

console.log(`${name} lives in ${city} and it is ${temp}`)

const book = {
  //name: "Enemy",
  author: "Ryan",
  publisher: {
    name: "Penguin"
  }
};

const { name: publisherName = "Self" } = book;
console.log(publisherName);