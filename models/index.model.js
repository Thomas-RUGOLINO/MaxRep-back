// Model Listing to create associations between them
const Sport = require('./sport.model');
const User = require('./user.model');
const Category = require('./category.model');
const Session = require('./session.model');
const Best_performance = require('./best_performance.model');


// How to bind Models ? 

// One-To-One
// One-To-Many : hasMany + BelongsTo
// Many-To-Many : belongsToMany + belongsToMany

// Category <--------> Sport (One-to-Many)

Category.hasMany(Sport,{
    as:"sports",
    foreignKey: "category_id"

});

Sport.belongsTo(Category,{
    as: "category",
    foreignKey: "category_id"

});


// User <--------> Sport (Many-to-Many)

User.hasMany(Sport,{
    as: "sports",
    through:"user_has_sport",
    foreignKey:"user_id",
    otherKey:"sport_id"

});

Sport.hasMany(User, {
    as : "users",
    through:"user_has_sport",
    foreignKey:"sport_id",
    otherKey:"user_id"
});

// User <--------> Session (One-to-Many)

User.hasMany(Session, {
    as: "sessions",
    foreignKey:"user_id"

});

Session.belongsTo(User, {
    as :"user",
    foreignKey:"user_id"

});

// Sport <--------> Session (One-To-Many)

Sport.hasMany(Session, {
    as: "sessions",
    foreignKey:"sport_id"

});

Session.belongsTo(Sport, {
    as:"sport",
    foreignKey:"sport_id"
});

// User <--------> Best Performance (One-to-Many)

User.hasMany(Best_performance, {
    as: "best_performance",
    foreignKey: "user_id"

});

Best_performance.belongsTo(User, {
    as: "user",
    foreignKey: "user_id"
});

// Sport <--------> Best_performance (One-To-Many)

Sport.hasMany(Best_performance, {
    as: "best_performance",
    foreignKey:"sport_id"
        
});

Best_performance.belongsTo(Sport, {
    as: "sport",
    foreignKey:"sport_id"
});


module.exports = { Sport, User, Session, Best_performance, Category };