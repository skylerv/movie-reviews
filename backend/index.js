import app from './server.js'
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from './dao/moviesDAO.js'

async function main() {
    dotenv.config()

    // Creates new db client object
    const client = new mongodb.MongoClient(
        process.env.MOVIEREVIEWS_DB_URI
    )
    const port = process.env.PORT || 8000

    try {
        await client.connect() // Connects to the DB
        await MoviesDAO.injectDB(client) // Gets initial reference to movies collection

        app.listen(port, () =>{
            console.log('server is running on port: ' + port);
        })
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
    main().catch(console.error);
