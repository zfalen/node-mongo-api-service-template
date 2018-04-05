
const mongoose = require('mongoose');
const Quotable = require('../../models/quotableModel');

const request = require('axios');
const queryString = require('querystring');


module.exports = function (req, res, next) {

    // PULL MAIN DATA FROM THE REQUEST OBJECT
    this.initialData = req.body || null;

    // *********************
    // *** GET FUNCTIONS ***
    // *********************

    this.getAllQuotables = () => mongoose.model('Quotable').find({});


    // **********************
    // *** POST FUNCTIONS ***
    // **********************

    this.createQuotable = () => {
      const { quote, author, context, interpretation, theme } = req.body;
      const quotable = new Quotable({ quote, author, context, interpretation, theme });
      return quotable.save();
    }


    // ***********************
    // *** ERROR FUNCTIONS ***
    // ***********************

    this.quotableErrorHandler = err => {
      console.error('PROBLEM WITH QUOTABLE API');
      console.error(err);

      res.sendStatus(500);
    }

}
