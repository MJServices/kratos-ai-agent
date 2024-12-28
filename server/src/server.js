import app from "./app.js";
import connectDB from "./db/DBConfig.js";
import "dotenv/config";

connectDB()
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`);
    });
})
.catch((error) => {
    console.error(error);
    process.exit(1);
});