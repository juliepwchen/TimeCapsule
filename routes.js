//returns a function & invoke it right away
const routes = require('next-routes')();

//':' means wildcard
routes
    .add('/timecapsules/new', '/timecapsules/new')
    .add('/timecapsules/:address', '/timecapsules/show')
    .add('/timecapsules/:address/letters', '/timecapsules/letters/index')
    .add('/timecapsules/:address/letters/new', '/timecapsules/letters/new');

module.exports = routes;