import mongodb from "mongodb"

const ObjectId = mongodb.ObjectId // Need object id to convert an id string to a MongoDB Object ID later on

let reviews


// If reviews is not filled, we access the DB.
export default class ReviewsDAO { 
    static async injectDB(conn) {
        if(reviews) {
            return
        }
        try {
            reviews = await conn.db(process.env.MOVIEREVIEWS_NS).collection('reviews')
        } catch (e) {
            console.error(`unable to establish connection handle in reviewDAO: ${e}`)
        }
    }

    // Creates a reviewDoc document object. We have to convert movieId string to a MongoDB object Id -- Insert into reviews collection
    static async addReview(movieId, user, review, date) {
        try {
            const reviewDoc = {
                name: user.name,
                user_id: user._id,
                date: date,
                review: review,
                movie_id: ObjectId(movieId)

            }
            return await reviews.insertOne(reviewDoc)
        } catch (e) {
            console.error(`unable to post review: ${e}`)
            return {error: e}
        }
    }

    // Updates a review -- updateResponse takes the database, filters the reviews collection by the userId and 
    // ObjectId, and replaces the current review with the new review
    static async updateReview(reviewId, userId, review, date) {
        try {
            const updateResponse = await reviews.updateOne(
                {user_id: userId, _id: ObjectId(reviewId)},
                {$set:{review:review, date: date}}
            )
            return updateResponse
        } catch (e) {
            console.error(`unable to update review: ${e}`)
            return {error: e}
        }
    }

    // Deletes a review -- using deleteOne will look for an exisiting review with reviewId and created by userId
    static async deleteReview(reviewId, userId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: ObjectId(reviewId),
                user_id: userId,
            })
            return deleteResponse
        } catch(e) {
            console.error(`unable to delete review: ${e}`)
            return {error: e}
        }
    }
}