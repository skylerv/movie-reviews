import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let movies // Stores the reference to DB


// Access object to allow us to retrieve the movies from the database
export default class MoviesDAO{
    static async injectDB(conn) {
        if(movies) { // If the reference already exists, return
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection('movies') // Connect to DB name and collection
        } catch (e) {
            console.error(`Unable to connected in MoviesDAO: ${e}`) // Throw error if an error is found
        }
    }

    static async getMovieById(id) {
        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id),
                    }
                } ,
                {   $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews',
                    }

                }
            ]).next()
        } catch(e) {
            console.error(`Something went wrong in getMovieById: ${e}`)
            throw e
        }
    }

    // Retreiving movies
    static async getMovies({ // Default filters
        filters = null,
        page = 0,
        moviesPerPage = 20,// only 20 movies at once
    } = {}){
        let query
        if(filters){
            if("title" in filters){
                query = { $text: {$search:filters['title']}}
            } else if("rated" in filters) {
                query = {"rated":{$eq:filters['rated']}}
            }
        }
        let cursor
        try {
            // Building a cursor that finds our query, limits it to the movies per page, and skips the desired number of pages
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)
            const moviesList = await cursor.toArray() // Converts to array
            const totalNumMovies = await movies.countDocuments(query) // Counts the number of movies
            return {moviesList, totalNumMovies}

        } catch (e) {
            console.error(`Unable to issue find command, ${e}`)
            return {moviesList: [], totalNumMovies:0}
        }
    }
    static async getRatings(){
        let ratings = []
        try {
            ratings = await movies.distinct("rated")
            return ratings
        } catch(e) {
            console.error(`unable to get ratings, ${e}`)
            return ratings
        }
    }


}

