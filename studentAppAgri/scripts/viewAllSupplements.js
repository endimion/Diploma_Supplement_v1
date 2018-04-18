


$( document ).ready(function() {
//Error: Endpoint read failed
    let getSupplements = function(){
      $.get("rest/view")
        .then(resp =>{
          console.log(resp);
          if(typeof(resp) === "string"
              && (resp.indexOf("Timeout") >= 0 || resp.indexOf("Endpoint read failed") >= 0 )){
              getSupplements();
          }else{
            JSON.parse(resp).forEach(sup =>{
                  makeSupplementCard(sup,true);
            });
            $("#supPreloader").hide();
          }
          let onModalHide = function() {
            $(".sendEmail").show();
            $(".modalMessage").show();
            $(".preloader").hide();
            $(".qrCode").hide();
          };
          $('.modal').modal({
              complete : onModalHide
          });
         });
      }

      getSupplements();

});
