const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/projectTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAdmin = async () => {
  const adminExists = await User.findOne({ role: "admin" });
  if (adminExists) {
    console.log("Admin user already exists");
    return process.exit();
  }

  const adminPassword = await bcrypt.hash("nachiket", 10);

  const adminUser = new User({
    username: "admin",
    password: adminPassword,
    role: "admin",
  });

  await adminUser.save();
  console.log("Admin user created");
  process.exit();
};

seedAdmin().catch((error) => {
  console.error("Error seeding admin user:", error);
  process.exit(1);
});
