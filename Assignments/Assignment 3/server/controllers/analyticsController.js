const apiLogModel = require("../models/apiLogModel");
const apiErrorLogModel = require("../models/apiErrorLogModel");
const asyncWrapper = require("../utils/asyncWrapper");

const getApiAnalytics = asyncWrapper(async (req, res, next) => {
    try {
        const data = await apiLogModel.find({});
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

const getApiErrorAnalytics = asyncWrapper(async (req, res, next) => {
    try {
        const data = await apiErrorLogModel.find({});
        res.send(data);
    } catch (err) {
        console.log(err);
    }
});

module.exports = {
    getApiAnalytics,
    getApiErrorAnalytics,
}