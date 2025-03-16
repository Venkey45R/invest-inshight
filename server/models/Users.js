const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    monthly_income: {type: Number, required: true},
    monthly_expense: {type: Number, required: true},
    total_savings: {type: Number, required: true},
    total_debts: {type: Number, required: true},
    dependents: {type: Number, required: true},
    invested_value: {type: Number, required: true},
    total_assets: {type: Number, required: true},
    credit_score: {type: Number, required: true},
    debt_to_income: {type: Number, required: true},
    debt_to_asset: {type: Number, required: true},
    emergency_fund: {type: Number, required: true},
    investment_to_income: {type: Number, required: true},
    score: {type: Number, required: true},
});

const UsersModel = mongoose.model('User', userSchema);

module.exports = UsersModel;
