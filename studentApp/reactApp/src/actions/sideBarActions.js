// constructor () {
//     super()
//     this.showModal = this.showModal.bind(this);
//     this.id = 'yo'
//   }
//
//   showModal () {
//     $(`#${this.id}`).modal('open');
//   }


export function sideBarOnOff(status,nav) {
   console.log(nav.id);
  if(!status){
    $("#"+nav.id).sideNav('show');
    return {
        type: "SIDE_BAR_OPEN",
        payload: {}
      }
  }else{
    $(nav).sideNav('hide');
    return {
        type: "SIDE_BAR_CLOSE",
        payload: {}
      }
  }

}
