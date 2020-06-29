var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxlength: 100},
        family_name: {type: String, required: true, maxlength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for full name
AuthorSchema.virtual('name').get(function() {
    // To avoid errors in cases where an author does not have either a family name or first name
    // we want to make sure we handle the exception by returning an empty string for that case

    var fullname = '';
    if (this.first_name && this.family_name) {
        fullname = this.family_name + ', ' + this.first_name;
    }

    return fullname;
});

// Virtual for authors' URL
AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
})

// Export model
module.exports = mongoose.model('Author', AuthorSchema);