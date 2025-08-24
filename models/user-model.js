const mongoose = require('mongoose');

const userScehma = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:String, 
    querySets:[
        {type:mongoose.Schema.Types.ObjectId, ref: 'textqueryset'}
    ],
})

module.exports = mongoose.model("User", userScehma);

// insert sample data
// module.exports.insertSampleUser = async()=> {
//   try {
//     const sampleUser = new User({
//       firstName: "Zaid",
//       lastName: "Akhtar",
//       email: "zaidakhtar@gmail.com",
//       querySets: [], // or put ObjectId references if you have them
//     });

//     const savedUser = await sampleUser.save();
//     console.log("User saved:", savedUser);
//   } catch (err) {
//     console.error("Error saving user:", err);
//   } finally {
//     mongoose.connection.close(); // close after insert
//   }
// }

