const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://22ucs096:mern123@cluster0.ptnxpzi.mongodb.net/GoFood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB connected successfully');

    const db = mongoose.connection.db;

    // ✅ Await both collections
    const foodItemsData = await db.collection("food_items").find({}).toArray();
    const foodCategoryData = await db.collection("foodCategory").find({}).toArray();

    // ✅ Store in global variables
    global.food_items = foodItemsData;
    global.foodCategory = foodCategoryData;

    console.log('✅ Food data loaded into global variables');

  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = mongoDB;
