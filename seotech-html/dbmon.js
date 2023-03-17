const mongoose = require("mongoose")

try {
    mongoose.connect('mongodb://127.0.0.2/studLearn')
    console.log("db connected");
} catch (error) {
    console.log(error)
}


const studentSchema = new mongoose.Schema({
    name:{type:String},
    div:{type:String},
    grade:{type:Number},
});

const Student = mongoose.model('Student', studentSchema, 'loginCred')

try {
    const firstStudent=new Student({
        name:'JOHN',
        div:"A",
        grade:3,

    })
    firstStudent.save()
} catch (error) {
    console.log(error);
}

