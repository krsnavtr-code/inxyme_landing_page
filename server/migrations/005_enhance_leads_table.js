const db = require('../config/db');

module.exports = async function () {
    try {
        const [columns] = await db.execute("SHOW COLUMNS FROM leads");
        const existingColNames = columns.map((col) => col.Field.toLowerCase());

        if (!existingColNames.includes('specialisation')) {
            await db.execute("ALTER TABLE leads ADD COLUMN specialisation VARCHAR(150) NULL AFTER qualification");
            console.log("Added specialisation column to leads table");
        }

        if (!existingColNames.includes('university')) {
            await db.execute("ALTER TABLE leads ADD COLUMN university VARCHAR(150) NULL AFTER specialisation");
            console.log("Added university column to leads table");
        }

        if (!existingColNames.includes('program')) {
            await db.execute("ALTER TABLE leads ADD COLUMN program VARCHAR(150) NULL AFTER university");
            console.log("Added program column to leads table");
        }

        if (!existingColNames.includes('time_slot')) {
            await db.execute("ALTER TABLE leads ADD COLUMN time_slot VARCHAR(100) NULL AFTER program");
            console.log("Added time_slot column to leads table");
        }

        console.log("Leads table schema verified/enhanced successfully");
    } catch (err) {
        console.warn("Migration 005 note:", err.message);
    }
};
