'use strict';

//returns a function & invoke it right away
var routes = require('next-routes')();

//':' means wildcard
routes.add('/timecapsules/new', '/timecapsules/new').add('/timecapsules/:address', '/timecapsules/show').add('/timecapsules/:address/letters', '/timecapsules/letters/index').add('/timecapsules/:address/letters/new', '/timecapsules/letters/new');

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBLElBQU0sU0FBUyxBQUFmOztBQUVBO0FBQ0EsT0FDSyxBQURMLElBQ1MsQUFEVCxxQkFDOEIsQUFEOUIscUJBRUssQUFGTCxJQUVTLEFBRlQsMEJBRW1DLEFBRm5DLHNCQUdLLEFBSEwsSUFHUyxBQUhULGtDQUcyQyxBQUgzQywrQkFJSyxBQUpMLElBSVMsQUFKVCxzQ0FJK0MsQUFKL0M7O0FBTUEsT0FBTyxBQUFQLFVBQWlCLEFBQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvanVsaWVjaGVuL1ZTQ29kZS9UaW1lQ2Fwc3VsZSJ9