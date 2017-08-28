"use strict";
var express = require("express");
var server;
(function (server) {
    var app = express();
    app.use(express.static('../client'));
    app.listen(8080);
})(server || (server = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsSUFBWSxPQUFPLFdBQU0sU0FBUyxDQUFDLENBQUE7QUFFbkMsSUFBVSxNQUFNLENBTWY7QUFORCxXQUFVLE1BQU0sRUFBQyxDQUFDO0lBQ2QsSUFBTSxHQUFHLEdBQUcsT0FBTyxFQUFFLENBQUM7SUFFdEIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7SUFFckMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNyQixDQUFDLEVBTlMsTUFBTSxLQUFOLE1BQU0sUUFNZiJ9