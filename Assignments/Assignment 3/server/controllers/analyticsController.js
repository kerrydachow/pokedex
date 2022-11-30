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

const getApi400ErrorAnalytics = asyncWrapper(async (req, res, next) => {
    try {
        const data = await apiErrorLogModel.find({responseCode: 400});
        console.log(data);
        res.send(data);
    } catch (err) {
        console.log(err);
    }
})

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
    getApi400ErrorAnalytics,
    getApiErrorAnalytics,
}