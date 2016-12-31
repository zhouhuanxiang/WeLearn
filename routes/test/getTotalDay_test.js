var getTotalDay = require('../student/getTotalDay');
require('should');

describe('getTotalDay.js test', function () {
    var days1, days2, days3;
    it('should return 31 in year 2016', function () {
        days1 = getTotalDay.getTotalDay(2016, 1, 31);
        days1.should.be.equal(31);
    });

    it('should return 28 in year 2016', function () {
        days2 = getTotalDay.getTotalDay(2016, 2, 28) - days1;
        days2.should.be.equal(28);
    });

    it('should return 30 in year 2016', function () {
        days3 = getTotalDay.getTotalDay(2016, 4, 30) - getTotalDay.getTotalDay(2016, 3, 31);
        days3.should.be.equal(30);
    });

    it('should return 29 in year 2000', function () {
        days2 = getTotalDay.getTotalDay(2016, 2, 29) - days1;
        days2.should.be.equal(29);
    });

    it('should return 61 in year 2000', function () {
        days3 = getTotalDay.getTotalDay(2000, 3, 1);
        days3.should.be.equal(61);
    });
});

getTotalDay.getTotalDay();