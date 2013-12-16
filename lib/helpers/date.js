// date helper
var
    monthNames = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
    date = new Date(),
    month = date.getMonth(),
    day = date.getDate(),
    year = date.getFullYear();

// get current date
exports.getDate = function() {
    day = String(day).length < 2 ? '0' + day : day;
    return monthNames[month] + ' ' + day + ', ' + year;
};
