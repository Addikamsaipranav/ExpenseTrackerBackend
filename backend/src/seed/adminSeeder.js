require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");
const Admin = require("../models/Admin");

const seedAdmin = async () => {
    try {
        await connectDB();

        const existingAdmin = await Admin.findOne({
            username: process.env.ADMIN_USERNAME.toLowerCase()
        });

        if (existingAdmin) {
            console.log("✅ Admin already exists.");
            process.exit(0);
        }

        const admin = new Admin({
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            fullName: process.env.ADMIN_FULL_NAME,
            password: process.env.ADMIN_PASSWORD
        });

        await admin.save();

        console.log("✅ Admin created successfully.");
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeder Error");
        console.error(error);

        process.exit(1);
    }
};

seedAdmin();