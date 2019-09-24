"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
// Get a stack trace when warnings are emitted.
process.on('warning', e => console.warn(e.stack));
exports.server = express();
const port = process.env.PORT || 8080;
exports.server.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=index.js.map