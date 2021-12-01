const mongoose = require('mongoose');

// Connecting mongoose to MongoDB using the

// environment variable below

mongoose.connect(process.env.MONGO_URI, 

    {   
        
        useNewUrlParser: true, 
        useUnifiedTopology: true

    }

)

.then(() => {

    console.log('Connected to MongoDB');

})

.catch((err) => {

    console.log(err);
    
});