var minPaymentApp = angular.module("MinPaymentApp", []);

minPaymentApp.controller("MinPaymentController",
	function($scope) {

		$scope.computeCost = function() {
			var balance = $scope.balance;
			var payment = $scope.payment;

			var data = [
				{
					"value": balance
				},
				{
					"value": payment
				}
			];

			update(data);
		}
});