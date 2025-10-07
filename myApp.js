require('dotenv').config();
const mongoose = require('mongoose');
console.log("Mongo URI:", process.env.MONGO_URI); 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));
// 1. Define the schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true },   
  age: Number,                              
  favoriteFoods: [String]                  
});
let Person=mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  const person=new Person({name:'Elon',age:30,favoriteFoods:['biriyani','burger','chai']})
  person.save((err,data)=>{
    if(err) return done(err);
      return done(null,data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({name:personName},(err,data)=>{
    if(err) return done(err);
    return done(null,data);
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) return done(err)
      return done(null,data);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId,(err,data)=>{
    if(err) return done(err)
      return done(null,data);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId,(err,person)=>{
    if(err) return done(err);

  person.favoriteFoods.push(foodToAdd)
  person.save((err,updatePerson)=>{
    if(err) return done(err)
      return done(null,updatePerson);
  })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,updatePerson)=>{
    if(err) return done(err)
      return done(null,updatePerson);
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId,(err,data)=>{
    if(err) return done(err)
      return done(null,data);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.deleteMany({name:nameToRemove},(err,result)=>{
    if(err) return done(err)
      return done(null,result);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch})
   .sort({name:1})
   .limit(2)
   .select('name favoriteFoods')
   .exec((err,data)=>{
    if(err) return done(err)
      return done(null,data);
   })
  };

/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
