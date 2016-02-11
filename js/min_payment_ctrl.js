var minPaymentApp = angular.module("MinPaymentApp", []);

minPaymentApp.controller("MinPaymentController",
	function($scope) {

		$scope.updateVizu = function() {
			var balance = $scope.balance;
			var minPay = $scope.minPay;
			var apr = $scope.apr;
			var extraPay = $scope.extraPay;

			var minPayTotalPaid = 0;
			var extraPayTotalPaid = 0;
			var totalInterestSaved = 0;
			var extraPayPercentage = 0;
			var interestSavedPercentage = 0;

			var minPayInterest = 0;
			var extraPayInterest = 0;
			var extraPayInterestPercentage;

			minPayTotalPaid = $scope.calculateTotalPaid(balance, minPay, apr, 0);
			extraPayTotalPaid = $scope.calculateTotalPaid(balance, minPay, apr, extraPay);
			totalInterestSaved = minPayTotalPaid - extraPayTotalPaid;
			extraPayPercentage = (extraPayTotalPaid / minPayTotalPaid) * 100;
			interestSavedPercentage = 100 - extraPayPercentage;

			minPayInterest = minPayTotalPaid - balance;
			extraPayInterest = extraPayTotalPaid - balance;
			extraPayInterestPercentage = (extraPayInterest / minPayInterest) * 100;
			interestSavedPercentage = 100 - extraPayInterestPercentage;

			// Testing
			// console.log("minPayInterest: " + minPayInterest);
			// console.log("extraPayInterest: " + extraPayInterest);
			// console.log("extraPayInterestPercentage: " + extraPayInterestPercentage);
			// console.log("interestSavedPercentage: " + interestSavedPercentage);

			// console.log("minPayTotalPaid: " + minPayTotalPaid);
			// console.log("extraPayTotalPaid: " + extraPayTotalPaid);
			// console.log("totalInterestSaved: " + totalInterestSaved);
			// console.log("extraPayPercentage: " + extraPayPercentage);

			var data = [
				{
					"value": extraPayInterestPercentage
				},
				{
					"value": interestSavedPercentage
				}
			];

			update(data);
		}

		$scope.calculateTotalPaid = function (balance,minPay,apr,extraPay) {
      var remainingBalance = balance;
      var monthlyPayment = minPay + extraPay;
      var amountPaid = 0.00;
      var mRate = (apr / 100) / 12;
      while (remainingBalance > 0) {
        if(monthlyPayment > remainingBalance * (1+mRate)){
          monthlyPayment = remainingBalance * (1+mRate);
        }
        remainingBalance = remainingBalance * (1 + mRate) - monthlyPayment;
        amountPaid = amountPaid + monthlyPayment;
      }
      
      return amountPaid.toFixed(2);
    };

});