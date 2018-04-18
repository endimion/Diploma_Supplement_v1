

function makeSupplementCard(supplement,fullAccess){

  let card = $("<div>", {"class": "card"});
  let cardContent = $("<div>", {"class": "card-content","id":"textContent"});
  card.append(cardContent);
  let cardTitle = $("<span>", {"class": "card-title"});
  cardContent.append(cardTitle);
  let accordionList = $("<ul>",{"class":"collapsible","data-collapsible":"accordion"});
  for (var name in supplement) {
    accordionList.append(displaySupAttribute(name,supplement[name]));
  }
  cardContent.append(accordionList);
  let cardContentSvg = $("div",{"id":"svgContent","display":"none","background":"white","width":"16em"});
  card.append(cardContentSvg);

  let cardAction = $("<div>", {"class": "card-action"});
  let actionContent = $("<div>", {"class": "row card-content"});
  cardAction.append(actionContent);

  let downloadWrapper = $("<div>", {"class": "col s3 m3 l3"});
  actionContent.append(downloadWrapper);
  let download = $("<a>", {"class": "btn-floating btn-medium waves-effect waves-light blue darken-3","href":"rest/download/"+supplement.Id});
  let downloadIcon = $("<i>",{"class":"material-icons"});
  downloadIcon.text("file_download");
  download.append(downloadIcon);
  downloadWrapper.append(download);

  if(fullAccess){
    let editWrapper = $("<div>",{"class":"col s3 m3 l3"});
    actionContent.append(editWrapper);
    let edit = $("<a>", {"class": "btn-floating btn-medium waves-effect waves-light yellow darken-3","href":"edit/"+supplement.Id});
    let editIcon = $("<i>",{"class":"material-icons"});
    editIcon.text("edit");
    edit.append(editIcon);
    editWrapper.append(edit);

    let shareWrapper = $("<div>",{"class":"col s6 m6 l3"});
    actionContent.append(shareWrapper);
    let share = $("<div>", {"class": "fixed-action-btn horizontal click-to-toggle","style":"position: absolute; right: 24px;bottom:4em;"});
    let shareBtn = $("<a>",{"class":"btn-floating btn-medium red"})
    share.append(shareBtn);
    let shareIcon = $("<i>",{"class":"material-icons"});
    shareIcon.text("share");
    shareBtn.append(shareIcon);
    shareWrapper.append(share);

    let shareList = $("<ul>");
    let shareListItMail = $("<li>");
    let shareMail = $("<a>",{"class":"btn-floating yellow darken-1 modal-trigger","style":"transform: scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px); opacity: 0;", "href":"#modal" + supplement.Id})
    let mailIcon = $("<i>",{"class":"material-icons"});
    mailIcon.text("mail");

    shareList.append(shareListItMail);
    shareListItMail.append(shareMail);
    shareMail.append(mailIcon);

    let shareListItQR = $("<li>");
    let shareQR = $("<a>",{"class":"btn-floating blue darken-1 modal-trigger","style":"transform: scaleY(0.4) scaleX(0.4) translateY(0px) translateX(40px); opacity: 0;", "href":"#modalQR" + supplement.Id})
    let qrIcon = $("<i>",{"class":"material-icons"});
    qrIcon.text("dashboard");

    shareList.append(shareListItQR);
    shareListItQR.append(shareQR);
    shareQR.append(qrIcon);


    share.append(shareList);


    let modalMailWrapper = $("<div>",{"class":"modal","id":"modal"+supplement.Id});
    let modalContent = $("<div>",{"class":"modal-content"});
    modalMailWrapper.append(modalContent);
    let modalHeader = $("<h4>");
    modalHeader.text("Share By Email ");
    modalContent.append(modalHeader);
    let modalMessage = $("<p>",{"class":"modalMessage"});
    modalContent.append(modalMessage);
    modalMessage.text("Send a sharable link via email");
    let preloaderString = '<div style="display:none;" class="progress preloader"> <div class="indeterminate"></div> </div>';
    let preloader = $(preloaderString);
    modalContent.append(preloader);
    let modalForm = $("<form>",{"action":"#"});
    modalContent.append(modalForm);
    let modalFormGroupMail = $("<div>",{"class":"form-group"});
    let modalLabel = $("<label>",{"for":"email"});
    modalLabel.text("Receipient Email:");
    modalFormGroupMail.append(modalLabel);
    let mailInput = $("<input>",{"class":"form-control","id":"email"+supplement.Id,"type":"email"});
    let supIdInput = $("<input>",{"class":"form-control","type":"hidden","id":"supId"+supplement.Id,"name":"supId","value":supplement.Id});
    let sendMail = $("<a>",{"class":"waves-effect waves-green btn btn-primary","onclick":'sendEmail("email'+supplement.Id+'",'+'"supId'+supplement.Id+'","'+supplement.Id+'")'});
    sendMail.text("Send");
    modalFormGroupMail.append(mailInput);
    modalFormGroupMail.append(supIdInput);
    modalFormGroupMail.append(sendMail);
    modalForm.append(modalFormGroupMail);



    let modalQrWrapper = $("<div>",{"class":"modal","id":"modalQR"+supplement.Id});
    let modalQrContent = $("<div>",{"class":"modal-content"});
    modalQrWrapper.append(modalQrContent);
    let modalQrHeader = $("<h4>");
    modalQrHeader.text("Share By QR ");
    modalQrContent.append(modalQrHeader);
    let modalQrMessage = $("<p>",{"class":"modalMessage"});
    modalQrContent.append(modalQrMessage);
    modalQrMessage.text("Generate a QR code you can insert in your CV tha only the email owner can view!");
    let qrPreloaderString = '<div style="display:none;" class="progress preloader"> <div class="indeterminate"></div> </div>';
    let qrPreloader = $(qrPreloaderString);
    modalQrContent.append(qrPreloader);
    let modalQrForm = $("<form>",{"action":"#","class":"qrForm"});
    modalQrContent.append(modalQrForm);
    let modalQrFormGroupMail = $("<div>",{"class":"form-group"});
    let modalQrLabel = $("<label>",{"for":"email"});
    modalQrLabel.text("Receipient Email:");
    modalQrFormGroupMail.append(modalLabel);
    let qrMailInput = $("<input>",{"class":"form-control","id":"qrEmail"+supplement.Id,"type":"email"});
    let qrSupIdInput = $("<input>",{"class":"form-control","type":"hidden","id":"qrSupId"+supplement.Id,"name":"qrSupId","value":supplement.Id});
    let makeQR = $("<a>",{"class":"waves-effect waves-green btn btn-primary","onclick":'makeQRcode("qrEmail'+supplement.Id+'",'+'"qrSupId'+supplement.Id+'","'+supplement.Id+'")'});
    makeQR.text("Generate QR");
    modalQrFormGroupMail.append(qrMailInput);
    modalQrFormGroupMail.append(qrSupIdInput);
    modalQrFormGroupMail.append(makeQR);
    modalQrForm.append(modalQrFormGroupMail);

    let qrContainer = $("<div>",{"class":"qrCode container","style":"display:none"});
    let qrContainerRow = $("<div>",{"class":"row"});
    qrContainer.append(qrContainerRow) ;
    let qrColLeft = $("<div>",{"class":"col m6 s12"});
    qrContainerRow.append(qrColLeft);
    let canvas = $("<canvas>",{"id":"canvas"+supplement.Id,"style":"display:none"});
    qrColLeft.append(canvas);
    let imgContainer = $("<div>",{"id":"imgContainer"+supplement.Id,"style":"margin: 0 auto; display: block;"});
    qrColLeft.append(imgContainer);
    modalContent.append(qrContainer);
    let rightContainer = $("<div>",{"class":"col m6 s12 qrMessage"});
    let rightMessage = $("<span>");
    rightMessage.text("Qr code Generated! Save this image and add it to your CV. Only the owner of the email address will be able to view the DS");
    rightContainer.append(rightMessage);
    qrContainerRow.append(rightContainer);

    modalQrContent.append(qrContainer);
    card.append(modalMailWrapper); //modalQrWrapper
    card.append(modalQrWrapper);
  }

  card.append(cardAction);
  if(fullAccess){
    $("#supplements").append(card);
  }else{
    $("#supPreloader").hide();
    $("#validationForm").hide();
    $("#supplementView").append(card);
  }


  $('.collapsible').collapsible({
    accordion : true
  });
}


function displaySupAttribute(name, value,node="<p>", properties={}){
  const entryCSS = {
        "display": "block",
        "cursor": "pointer",
        "min-height": "3rem",
        "line-height": "3rem",
        "padding": "0 1rem",
        "background-color": "#fff",
        "border-bottom": "1px solid #ddd"
  }

  const headerCSS = {
    "background-color": "aliceblue"
  }


  if(name !== "Signature" && name !== "Authorized"  && value !== "" && value){
    if(typeof(value) === "string"){
        let result = $(node,properties);
        let resultTag = $("<i>",{"style":"font-weight: bolder"});
        resultTag.text(name);
        let resultValue = $("<p>",{"style":"display: inline"});
        resultValue.text(": " + value);
        result.append(resultTag);
        result.append(resultValue);

        if(node =="<p>"){
          result.css(entryCSS);
        }
        return result;
    }else{
      if(name === "Programme_Details"){
        return renderProgrammeDetails(name, value)

      }else{
        let result = $(node);
        let listItem = $("<li>");
        let header = $("<div>",{"class":"collapsible-header"});
        header.text(name);
        header.css(headerCSS);
        let headerIcon = $("<i>",{"class":"material-icons"});
        headerIcon.text("expand_more");
        header.append(headerIcon);
        listItem.append(header);
        for (var name in value) {
          listItem.append(displaySupAttribute(name,value[name],"<div>",
                              {"class":"collapsible-body"}));
        }
        return listItem;
      }
    }
 }
}


function renderProgrammeDetails(name, details){
  const entryCSS = {
        "display": "block",
        "cursor": "pointer",
        "min-height": "3rem",
        "line-height": "3rem",
        "padding": "0 1rem",
        "background-color": "#fff",
        "border-bottom": "1px solid #ddd"
  }

  const headerCSS = {
    "background-color": "aliceblue"
  }

  const modulesCSS = {
    "background-color": "lightgrey",
    "box-shadow": "none"

  }

//	<div class="row">
				// <div class="col s12 m12">
					// <ul class="collapsible" data-collapsible="accordion">
  //this boilerplate is neede to nest collabsibles with materialize

  let body = $("<div>",{"class":"collapsible-body"});



  let result = $("<li>");
  let header = $("<div>",{"style":"padding-bottom: 0.8em;font-size: larger;font-weight: bold"});
  header.text(name);
  result.append(header);

  let attributesList = $("<ul>");
  let descr  = renderDetailsTag("Description",details.Description);// $("<li>");
  // descr.text("Description: " + details.Description);
  // let descrTag = $("<i>",{"style":"font-weight: bold"});
  // descrTag.text("Description");
  // let descrVal = $("<p>",{"style":"display:inline"});
  // descr.append(descrTag);
  // desr.append(descrVal);

  attributesList.append(descr);

  let modList = $("<li>");
  let row = $("<div>",{"class":"row"});
  modList.append(row);
  let col = $("<div>",{"class":"col s12 m12"});
  row.append(col);

  let modules = $("<ul>",{"class":"collapsible","data-collapsible":"accordion"});
  col.append(modules);
  let moduleItem = $("<li>");
  let modHeader = $("<div>",{"class":"collapsible-header"});
  modHeader.css(modulesCSS);
  // let headerText = $("<p>");
  modHeader.text("Modules");
  let headerIcon = $("<i>",{"class":"material-icons"});
  headerIcon.text("expand_more");
  // modHeader.append(headerText);
  modHeader.append(headerIcon);

  modHeader.css(headerCSS);
  moduleItem.append(modHeader);
  let colBody  = $("<div>",{"class":"collapsible-body"});
  moduleItem.append(colBody);
  modules.append(moduleItem);
  details.Modules.forEach(mod =>{
    // let listItem = $("<li>");
    // let itemHeader = $("<div>")
    let item = $("<div>");

    let wrapper = $("<ul>",{"style":"border-bottom: 1px solid #ddd"});
    let mCode = renderDetailsTag("ModuleCode",mod.ModuleCode);// $("<li>");
    //mCode.text("ModuleCode:" + mod.ModuleCode);
    wrapper.append(mCode);

    let mName = renderDetailsTag("NameOfTheModule",mod.NameOfTheModule);//$("<li>");
    // mName.text("NameOfTheModule:" + mod.NameOfTheModule);
    wrapper.append(mName);

    let mType = renderDetailsTag("TypeOfModule",mod.TypeOfModule);//$("<li>");
    // mType.text("TypeOfModule:" + mod.TypeOfModule);
    wrapper.append(mType);

    let mExam = renderDetailsTag("ExamPeriod",mod.ExamPeriod);//$("<li>");
    // mExam.text("ExamPeriod:" + mod.ExamPeriod);
    wrapper.append(mExam);

    let mGrade = renderDetailsTag("Grade",mod.Grade);//$("<li>");
    // mGrade.text("Grade:" + mod.Grade);
    wrapper.append(mGrade);

    let mWriting = renderDetailsTag("InWriting",mod.InWriting);//$("<li>");
    // mWriting.text("InWriting:" + mod.InWriting);
    wrapper.append(mWriting);

    item.append(wrapper);
    colBody.append(item);
  });

    attributesList.append(modList);

  let ledgend  = renderDetailsTag("Legend",details.Legend);//$("<li>");
  // ledgend.text("Legend: " + details.Legend);
  attributesList.append(ledgend);
  result.append(attributesList);
  body.append(result);
  return body;
}


function renderDetailsTag(name,value){
  let node  = $("<li>");
  // descr.text("Description: " + details.Description);
  let nodeTag = $("<i>",{"style":"font-weight: bold"});
  nodeTag.text(name);
  let nodeVal = $("<p>",{"style":"display:inline"});
  nodeVal.text(": "+value)  ;
  node.append(nodeTag);
  node.append(nodeVal);
  return node;
}
