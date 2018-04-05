
const mongoose = require('mongoose');
const Quotable = require('../../models/quotableModel');

const request = require('axios');
const queryString = require('querystring');


module.exports = function (req, res, next) {

    // PULL MAIN DATA FROM THE REQUEST OBJECT
    const initialData = req.body || null;

    this.getQuotableById = async () => {
      const retrieved = await mongoose.model('Quotable').findById(req.params.id);

      if (!retrieved) {
        const err = new Error('Cannot find that Quotable');
        err.name = 'BadRequestError';
        err.status = 400;
        throw err;
      }

      return retrieved;
    };

    // *********************
    // *** PUT FUNCTIONS ***
    // *********************

    this.updateQuotable = (mongooseResult) => {
      mongooseResult.set(initialData);
      return mongooseResult.save();
    }


    // ************************
    // *** DELETE FUNCTIONS ***
    // ************************

    this.deleteQuotable = (mongooseResult) => mongooseResult.remove();

    // ***********************
    // *** ERROR FUNCTIONS ***
    // ***********************

    this.quotableErrorHandler = err => {
      console.error('PROBLEM WITH QUOTABLE API');
      console.log(err);

      if (err.status) {
        const {name, status, message} = err;
        res.json({ status, message, name })
      } else {
        res.sendStatus(500);
      }

    }

}
