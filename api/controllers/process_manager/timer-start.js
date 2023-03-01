/**
 * process_manager/timer-start.js
 *
 *
 * url:     put /process/timer/:ID/start
 * header:  X-CSRF-Token : [token]
 * params:
 */

var inputParams = {
   ID: { string: { uuid: true }, required: true },
};

// make sure our BasePath is created:
module.exports = function (req, res) {
   // Package the Find Request and pass it off to the service

   req.ab.log(`process_manager::timer-start`);

   // verify your inputs are correct:
   if (
      !(req.ab.validUser(/* false */)) ||
      !(req.ab.validBuilder(/* false */)) ||
      !req.ab.validateParameters(inputParams /*, false , valuesToCheck*/)
   ) {
      // an error message is automatically returned to the client
      // so be sure to return here;
      return;
   }

   // create a new job for the service
   let jobData = {
      uuid: req.ab.param("ID"),
   };

   // pass the request off to the uService:
   req.ab.serviceRequest("process_manager.timer-start", jobData, (err, results) => {
      if (err) {
         res.ab.error(err);
         return;
      }
      res.ab.success(results);
   });
};
