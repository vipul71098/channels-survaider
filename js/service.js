myapp.factory('dataShare',function($rootScope){
  var service = this;
  service.sendchain = function(cha){
  this.chain = cha;
  $rootScope.$broadcast("dddd");
  //  console.log("chchcchchch",this.chain)

  };
  service.send_data=function(data){
    this.s_data=data;
  //   console.log("cccccc",this.s_data)
     $rootScope.$broadcast("dddd");
};
 service.getchain = function(){
    return this.chain;
      console.log("get",this.chain)

  };
  service.get_data = function(){

   return this.s_data;
   };

    return service;
    });
