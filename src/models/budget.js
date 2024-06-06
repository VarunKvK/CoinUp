const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Budgetdetails = new Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true, default: Date.now },
});

const BudgetSchema = new Schema({
  owner: { type: String, required: true },
  budget:[ 
    {title: { type: String, required: true },
    entries: [{type: Budgetdetails}],}
]
});

const Budget = mongoose.models.Budget || model("Budget", BudgetSchema);

export default Budget;
