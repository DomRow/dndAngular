var myApp = angular.module('dropTests',['ngRoute','ngDragDrop','ngStorage', 'ngResource']);

/*--------Controllers-----------------------*/

function TestCtrl(){
  var self = this;

  self.start = function(){
    console.log("CLICKED MASSIVE");
  }
}
myApp.controller('TestCtrl', TestCtrl);

myApp.directive("goFor", function(){
  return function($scope, element, attrs){
    element.bind("click", function(){
      console.log("directive call");
      $scope.$apply('fun.start()')
    })
  }    
})



myApp.controller('ContentCtrl', ['$scope', function($scope){
  $scope.styleCh1 = false;
  $scope.classArray = {
    1:"default1",
     2 : "styleCh1"
   };
  $scope.default1 = true;
  $scope.toggleClass1 = function() {
    console.log($scope.$watchers);
    $scope.default1 = !$scope.default1;
    $scope.styleCh1 = !$scope.styleCh1;
    if($scope.styleCh2 == true || $scope.default2 == true){
      $scope.styleCh2 = false;
      $scope.default2 == false;
    }else{
      $scope.styleCh2 = true;
    }  
  }


    $scope.boolean1 = function(){
      console.log("boolean1");
      $scope.boolean1 = !$scope.boolean1;
    };

}])

myApp.controller('ContentCtrl2', ['$scope', function($scope){
  $scope.styleCh1 = false;
  $scope.default1 = true;
  $scope.toggleClassCtrl2 = function() {
    console.log("ContentCtrl2")  
  }

}])

myApp.controller('FormatCtrl', ['$scope', function($scope){
  $scope.button1 = false;
  $scope.toggleCss = function(){
    $scope.button1 = true;
    console.log("Css button1:" + $scope.button1);
  }
  
}]);


// myApp.directive('classTest', function(){
//   return{
//     restrict: 'E',
//     scope:{
//       value: "="
//     },
//     template:
//       '<div class=' +value[0] + '>Test</div>',
//     replace: true  
//   }
// });

myApp.directive('classRem', function(){
 return function(scope, element, attrs) {
  console.log(element);
  scope.$watch(attrs.classRem, function(newVal) {
    if (newVal) {
      element.removeClass(element[0].className);
      console.log(element[0]);
      //element.addClass("defaultClass2")
    } else {
      console.log("Nothing perfomred");
    }
  })
}
})

// myApp.controller('ListCtrl', ['$scope', '$resource','$window' ,'Page',function($scope, $resource, $window, Page){
//   // $scope.pages = Page.query(function(data){
//   //   console.log('pages retieved: ' );
//   //   console.log(data);
//   // });
//   $scope.pages = popupService.pages;}])

/*--------Directives-----------------------*/

myApp.directive("addPage", ['Page', 'popupService', function(popupService){
  return{
    restrict: "A",
    link: function (scope, element, attrs){
      element.bind("click", function() {
        console.log("addPage")
        popupService.addPage;
        //ADD NEW <li> to page list
      });
    }
  }
}]);

myApp.service('popupService',['$rootScope', function($rootScope){
  console.log("popupService Called ");
  var service = {

    pages:[
    {number: "5", content: "<li>Test</li>"},
    {number: "2", content: "<li>Test2</li>"}
    ],

    addPage: function (page){
      console.log("popupservice addpage")
      var page = "<li>Hi</li>";
      console.log(page);
      service.pages.push(page);
      console.log(service.pages);
      //$rootScope.$broadcast('pages.update');
    }
  }
  return service;
}])

/*----------------------------------------------*/


myApp.directive('myDraggable', ['$document', function($document) {
  return {
  	templateUrl: 'templates/temp1.html',
    link: function(scope, element, attr) {
      var startX = 0, startY = 0, x = 0, y = 0;

      element.css({
       position: 'relative',
       border: '1px solid red',
       backgroundColor: 'lightgrey',
       cursor: 'pointer'
     });

      element.on('mousedown', function(event) {
        // Prevent default dragging of selected content
        event.preventDefault();
        startX = event.pageX - x;
        startY = event.pageY - y;
        $document.on('mousemove', mousemove);
        $document.on('mouseup', mouseup);
      });

      function mousemove(event) {
        y = event.pageY - startY;
        x = event.pageX - startX;
        element.css({
          top: y + 'px',
          left:  x + 'px'
        });
      }

      function mouseup() {
        $document.off('mousemove', mousemove);
        $document.off('mouseup', mouseup);
      }
    }
  };
}]);



myApp.controller('addHtmlCtrl', ['$scope','$sce', function($scope){
  $scope.pageTemp = '<li>Page</li>';
  $scope.boundHtml = $sce.trustAsHtml(pageTemp);
}])



/*--------Services-----------------------*/

myApp.factory('Page', ['$resource',
  function($resource){
        //PUT/update is added here 'thingId' value in URL is set to id of instance
        return $resource('/pages/:pageId', { pageId: '@_id' }, {
          update: {method: 'PUT' }
        });
      }]);

