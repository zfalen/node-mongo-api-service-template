
const express = require('express');
const router = express.Router();

function filterRoutesList(arr) {
  return arr.map(el => ({
      path: el.route.path,
      availableMethods: Object.keys(el.route.methods).filter(key => key !== '_all').map(m => m.toUpperCase())
    }))
}


// REQUIRE LOGINS FOR STAGING
const checkAuthentication = (req, res, next) => {
  if( process.env.HOST_MODE === 'staging' && !req.isAuthenticated() ) {
    res.redirect('/login');
  } else {
    return next();
  };
}

// *****************************
// ********* ROUTES ************
// *****************************

 // INDEX ROUTE - APP SERVES HERE
 router.route('/')
      .all(checkAuthentication)
      .get( (req, res) => {
          res.status(200).send({
            message: 'This is the root of the api',
            availableRoutes: filterRoutesList(router.stack),
          })
      })

// ----------------------------------------------------------------------------------------------------------------------------------------

 router.route('/quotables')
      .all( (req, res, next) => {
        // SEE THIS FILE FOR ALL FUNCTIONS
        require('./functions/allQuotablesFunctions')(req, res);
        next();
      })

      .get( (req, res) => {
        getAllQuotables()
          .then(allQuotables => {
            res.json({ message: 'Got all Quotables successfully', allQuotables})
          })
          .catch(quotableErrorHandler)
      })

      .post( (req, res) => {
        createQuotable()
          .then(newQuotable => {
            res.json({ message: 'Created a new Quotable successfully!', newQuotable });
          })
          .catch(quotableErrorHandler)
      })

// ----------------------------------------------------------------------------------------------------------------------------------------

router.route('/quotables/:id')
     .all( (req, res, next) => {
       // SEE THIS FILE FOR ALL FUNCTIONS
       require('./functions/specificQuotablesFunctions')(req, res);
       next();
     })

     .get( (req, res) => {
       getQuotableById()
         .then((returnedQuotable) => {
           res.json({ message: 'Got Quotable successfully', returnedQuotable})
         })
         .catch(quotableErrorHandler)
     })

     .put( (req, res) => {
       getQuotableById()
        .then(updateQuotable)
        .then((updatedQuotable) => {
          res.json({ message: 'Updated Quotable successfully', updatedQuotable})
        })
        .catch(quotableErrorHandler)
     })

     .delete( (req, res) => {
       getQuotableById()
        .then(deleteQuotable)
        .then((removedQuotable) => {
          res.json({ message: 'Deleted Quotable successfully', removedQuotable})
        })
        .catch(quotableErrorHandler)
     })


// ----------------------------------------------------------------------------------------------------------------------------------------


// ******************************
// *** ROUTES FOR DEV ONLY ******
// ******************************
if ( process.env.NODE_ENV !== 'production') {

  // DEV ROUTES GO HERE

}



module.exports = router;
