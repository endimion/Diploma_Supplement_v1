    var mailstoRemove = [];

    function removeUser(email,key){
      mailstoRemove.push(email);
      $("#"+key).hide();
    }


    function saveShareChanges(event, supplementId){
      event.preventDefault();
      let data = {};
      data.supId = supplementId;
      data.emails = mailstoRemove;

      mailstoRemove.forEach( (elt,ind) =>{
        console.log(elt);
      });
      //ajax call to save changes to hl
      $("#preloader").show();
      $.post("/supplement/rest/removeInvites",data)
      .done(res =>{
        console.log(res);
        $("#preloader").hide();
        $("#meassageDiv").text("changes saved!");
      })
      .fail(err =>{
        $("#preloader").hide();
        $("#meassageDiv").text("Something went wrong!");
        console.log(err);
      });
    }



    // function paintSupplement(sup){
    //   var supInfo = $("#supInfo");
    //   for (var name in sup) {
    //     supInfo.append(displaySupAttribute(sup,sup[name]));
    //   }
    // }
    //
    // function displaySupAttribute(name, value,node="<p>", properties={}){
    //   if(name !== "Signature" && name !== "Authorized"){
    //     if(typeof(value) === "string"){
    //
    //         let result = $(node,properties);
    //         result.text(name+": " + value);
    //         return result;
    //     }else{
    //       let result = $(node);
    //       // result.text(name+": ");
    //       let list = $("<ul>",{"class":"collection with-header"});
    //       result.append(list);
    //       let header = $("<li>",{"class":"collection-header","style":"font-weight: bold;"});
    //       header.text(name);
    //       list.append(header);
    //       for (var name in value) {
    //         list.append(displaySupAttribute(name,value[name],"<li>",{"class":"collection-item"}));
    //       }
    //       return result;
    //     }
    //  }
    // }
