

  var myapp =angular.module("app",[ "ngRoute","checklist-model"]);

  myapp.config(function($routeProvider){
    $routeProvider
     .when('/', {
        templateUrl : 'channels.html',
        controller  : 'myctrl'
      })
  // .when('/channels', {
  //       templateUrl : 'channels.html',
  //       controller  : 'myctrl1'
  //     })
      .when('/channels_data', {
        templateUrl : 'channels_data.html',
        controller  : 'mainctrl'
      })
  });
  myapp.controller("myctrl1",function($scope){
$scope.message="hey";
  });
  myapp.controller("myctrl",function($scope,$http,$rootScope,dataShare){
    $(() => {
           'use strict';
           $('button').click(function() {
               $(this).toggleClass('pressed');
           });
       });
      $scope.csv=[];
      $scope.data={};
      var results=[];
      $scope.channels=[];
      $scope.link=[];


      $scope.updatechannels = function(chan){
        var index = $scope.channels.indexOf(chan);

        if(index == -1){
          $scope.channels.push(chan);
           console.log("channels :",$scope.channels)
        }
        else{
          $scope.channels.splice(index, 1);
           console.log("channels :",$scope.channels)
        }
      }
dataShare.sendchain($scope.channels);

      $scope.getdata = function(){
        var cha=$scope.get_e;
        var loc = $scope.get_loc;
        //console.log("ddfdf",cha);
        console.log("channels :",$scope.channels)
        for(i=0;i<$scope.channels.length;i++){
       $scope.data[$scope.channels[i]] = [];
       var y= function(callback){ $http.get("https://www.googleapis.com/customsearch/v1?key=AIzaSyA_zX8nDhpBDTyeRJFStDnfXTzexTsNM_I&cx=008935209388523953567:1zh7j-szwa4&q="+cha+" "+loc+" "+$scope.channels[i]).then(function(response){
         results = response.data;
 dataShare.send_data($scope.data);
         callback();
           });
        }
            var x=function(){
            for(k=0;k<$scope.channels.length;k++){
            for(j=0;j<results.items.length;j++){
           var link=results.items[j].link;
                  var re1 = new RegExp(cha,"ig")
                  var re = new RegExp(loc,"ig");

            if(results.items[j].displayLink == "www.makemytrip.com"  && ( re.test(link) || re1.test(link))){//makemytrip
              var mlink=[];
              var link=results.items[j].link;
              mlink.push(link);
             var chan="-"+loc+".html";
             var chan1="ibis_";
             var re = new RegExp(chan,"ig");
             var re1 = new RegExp(chan1,"ig");
            for(b=0;b<mlink.length;b++){
            var c=(mlink[b].split("/").length - 1);
            if(c == 4 &&  re.test(mlink[b]) && (!re1.test(mlink[b]))){

                  var link1 =[];
                     link1.push(mlink[b]);
                     $.each(link1, function(i, el){
                      if($.inArray(el,   $scope.data.makemytrip) === -1)   $scope.data.makemytrip.push(el);});

                }
              }
            }//end of makemytrip
                if(results.items[j].displayLink == "www.expedia.com"  && ( re.test(link) || re1.test(link))){
                   var exlink=[];
                    var elink=results.items[j].link;
                    exlink.push(elink);
                    var ex ="Hotel-Information";
                    var re = new RegExp(ex,"ig");
                     for(b=0;b<exlink.length;b++){
                      var c=(exlink[b].split("/").length - 1);
                      if(c == 3 ||  re.test(exlink[b] )){
                        var link2 =[];
                         link2.push(exlink[b]);
                         $.each(link2, function(i, el){
                          if($.inArray(el,   $scope.data.expedia) === -1)   $scope.data.expedia.push(el);});
                      }
                    }
                }//end of expedia
                if(results.items[j].displayLink == "www.tripadvisor.com"  && ( re.test(link) || re1.test(link))){
                   var tlink=[];
                    var trlink=results.items[j].link;
                    tlink.push(trlink);
                    var ex ="Hotel_Review";
                    var re = new RegExp(ex,"ig");
                     for(b=0;b<tlink.length;b++){
                      var c=(tlink[b].split("/").length - 1);
                      if(c == 3 &&  re.test(tlink[b] )){
                        var link3 =[];
                         link3.push(tlink[b]);
                         $.each(link3, function(i, el){
                          if($.inArray(el,   $scope.data.tripadvisor) === -1)   $scope.data.tripadvisor.push(el);});
                      }
                    }
                }//end of tripadvisor
                if(results.items[j].displayLink == "www.zomato.com"  && ( re.test(link) || re1.test(link))){
                   var zlink=[];
                    var zolink=results.items[j].link;
                    zlink.push(zolink);
                    var ex ="restaurants";
                    var re = new RegExp(ex,"ig");
                     for(b=0;b<zlink.length;b++){
                      var c=(zlink[b].split("/").length - 1);
                      if(c == 4 &&  (!re.test(zlink[b]) )){
                        var link4 =[];
                         link4.push(zlink[b]);
                         $.each(link4, function(i, el){
                          if($.inArray(el,   $scope.data.zomato) === -1)   $scope.data.zomato.push(el);});
                      }
                    }
                }//end of zomato
                if(results.items[j].displayLink == "www.booking.com"  && ( re.test(link) || re1.test(link))){
                   var blink=[];
                    var bolink=results.items[j].link;
                    blink.push(bolink);
                    var chan="-"+loc+".html";
                    var re = new RegExp(ex,"ig");
                     for(b=0;b<blink.length;b++){
                       console.log("bbb",blink)
                      var c=(blink[b].split("/").length - 1);
                      if(c == 5  && re.test(blink[b] )){
                        var link5 =[];
                         link5.push(blink[b]);
                         $.each(link5, function(i, el){
                          if($.inArray(el, $scope.data.booking) === -1)   $scope.data.booking.push(el);});
                      }
                    }
                }//end of booking
                if(results.items[j].displayLink == "www.holidayiq.com"  && ( re.test(link) || re1.test(link))){
                   var hlink=[];
                    var hrlink=results.items[j].link;
                    hlink.push(hrlink);
                    var chan="-"+loc+".html";
                    var re = new RegExp(ex,"ig");
                     for(b=0;b<hlink.length;b++){
                      var c=(hlink[b].split("/").length - 1);
                      if(c == 3){
                        var link6 =[];
                         link6.push(hlink[b]);
                         $.each(link6, function(i, el){
                          if($.inArray(el,   $scope.data.holidayiq) === -1)   $scope.data.holidayiq.push(el);});
                      }
                    }
                }//end of holidayiq



          }
         }

      };
         y(x);
    }//end of for loop
        }

  });//end of controller
  myapp.controller("mainctrl",function($scope,$http,$rootScope,dataShare){
           $scope.csv=[];
            $scope.h=[];

        $rootScope.$on("dddd",function(){
          $scope.channels = dataShare.getchain();
        $scope.data1=dataShare.get_data();

   });
        $scope.getRoles = function() {
        return $scope.csv;
        };
        $scope.check = function(channels,value,checked) {
        var idx = $scope.csv.indexOf(value);
        if ( !checked) {
        $scope.csv.splice(idx, 1);
        }
        if( checked){
        $scope.csv.push(channels+","+value);
        }
        };


        $scope.downloadCSV = function(args){
        var data, filename, link;
        var csv = 'channels'+","+"Link"+"\n"+"\n";
        for(p=0;p<$scope.channels.length;p++){
            var re = new RegExp($scope.channels[p],"ig");
            //console.log("re: ", re);
            for(j=0;j<$scope.csv.length;j++){
                if (re.test($scope.csv[j])){
                //  console.log("csv[j]: ", $scope.csv[j]);
                $scope.h.push($scope.csv[j])
              }

            }//end of j loop
        }//end of p loop


        $scope.h.forEach(function(row) {
        csv +=row.split(',')+"\n"+"\n";
        });
        if (csv == null) return;
        filename = args.filename || 'channels.csv';
        csv = 'data:text/csv;charset=utf-8,' + csv;
        data = encodeURI(csv);
        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
         }

  })//end of controller
