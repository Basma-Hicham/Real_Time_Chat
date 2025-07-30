import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    match: [/^[A-Za-z]+ [A-Za-z]+$/, 'Name must be two words with letters only']
  },
  username: {
    type: String
  },
  age: {
    type: Number,
    min: 5,
    max: 100,
    validate: {
      validator: Number.isInteger,
      message: '{VALUE} is not an integer value'
    }
  },
  email: {
    type: String,
    lowercase: true,
    minlength: 10,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email']
  },
  password: {
    type: String,
    match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/, 
      'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character']
  },
  phone: {
    type: String,
    match: /^\d{11}$/
  },
  dateOfbirth: {
    type: Date
  },
  role: {
    type: String,
    enum: ['ceo', 'instructor', 'admin', 'student'],
    default: 'student'
  },
  address: addressSchema,
  wantHint: {
    type: Boolean,
    default: false
  },
  hint: {
    type: String,
    default: undefined
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  enrolledCourses: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course' // Changed to singular (Mongoose convention)
  }]
});
userSchema.pre('save', function(next) {
  if (this.name && !this.username) {
    const [first, last] = this.name.split(' ');
    this.username = `${first}_${last}`.toLowerCase();
  }
  next();
});



// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({
//    email: {
//     type: String,
//     required : true,
//     unique : true
//    },
//    userName : {
//     type: String,
//     required: true
//    },
//    password: {
//     type: String,
//     required: true
//    },


// }, { collection: "user" }, {timestamps: true} // adds createdAtand updatedAt)
// )
 const User = mongoose.model("user", userSchema )
 export default User