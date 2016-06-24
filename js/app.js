var myApp = angular.module('dropTests',['ngRoute','ngDragDrop','ngStorage']);

/*--------Controllers-----------------------*/
myApp.controller('TestCtrl', ['$scope', function($scope){
	$scope.img = 'IMG';
  $scope.txt = 'TXT';}])

myApp.controller('TwoCtrl', ['$scope', function($scope){
  $scope.img = 'img';
  $scope.vid = 'VID';}])

myApp.controller('ListCtrl', ['$scope','$localStorage','Page', function($scope, Page, $localStorage){
  $scope.$on('pages.update', function(event){
    $scope.pages = Page.pages;
    console.log($scope.pages);
    $localStorage.pages = $scope.pages;
    console.log($localStorage.pages);
  });
  $scope.pages = Page.pages;
}]);

/*--------Directives-----------------------*/

myApp.directive("addPageButton", ['Page', function(Page){
  return{
    restrict: "A",
    link: function (scope, element, attrs){
      element.bind("click", function() {
        Page.addPage({number: "3", content: "img"});
      });
    }
  }
}]);


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




myApp.directive('imgDirective', function(){
  return {
    templateUrl: function(elem, attr){
     return 'templates/insert-'+attr.data+'.html';
   }
 };
});
// myApp.directive('panel', function () {
//     return {
//         restrict:'E',
//         transclude:true,
//         scope:{ title:'@title', add:'@add', edit:'@edit'},
//         template:'<div ng-mouseenter="active = true" ng-mouseleave="active = false">' +
//             '<h3>{{title}}<span >' +
//             '<a href="{{add}}" ng-show="active && add">Add</a>' +
//             '<a href="{{edit}}" ng-show="active && edit">Edit</a></span></h3>' +
//             '<div' +
//             '</div>',
//         replace:true
//     };
// });    




/*--------Services-----------------------*/

myApp.service('Page',['$rootScope', function($rootScope){
  var service = {
    pages:[
      {number: "1", content: "img"},
      {number: "2", content: "wav"}
      ],

    addPage: function (page){
      console.log("Service addPage called ");
      service.pages.push(page);
      $rootScope.$broadcast('pages.update');
    }
  }
  return service;
}])

// myApp.service('myService', function($http) { 
//     return {
//         getHTML: function() {
// 			return $http({
// 				method: 'GET',
// 				url: 'templates/temp2.html'
// 			}).success(function(data){
// 				console.log("success " + data);
// 				return data;
// 			});
//         }
//     };
// });



