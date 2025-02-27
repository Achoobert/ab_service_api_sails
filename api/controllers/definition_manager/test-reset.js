/**
 * definition_manager/test-reset.js
 *
 *
 * url:     post /test/reset
 * header:  X-CSRF-Token : [token]
 * params:
 */

// var inputParams = {
//    tenant: { string: true, required: true },
// };

// make sure our BasePath is created:
module.exports = function (req, res) {
   // Package the Find Request and pass it off to the service

   req.ab.log(`definition_manager::test-reset`);

   // if this isn't in the testing environment, 404!
   if (typeof process.env.AB_TESTING == "undefined") {
      return res.notFound();
   }

   req.ab.tenantID = req.param("tenant");

   // pass the request off to the uService:
   req.ab.serviceRequest(
      "definition_manager.json-reset",
      {},
      (err /*, results */) => {
         if (err) {
            req.ab.log("Error in json-reset : ", err);
            res.ab.error(err);
            return;
         }
         res.ab.success({ done: true });
      }
   );
};
