const validate = require('./validate');

// const composeWrappers = (...wrappers) => {
//     return (handler) => {
//         return wrappers.reduceRight((result, wrapper) => wrapper(result), handler);
//     };
// };

// export interface BuildWrapperOptions {
//   catch?: boolean;
//   validate?: RequestSchemas;
//   authedOnly?: boolean;
//   adminOnly?: boolean;
// }

// const buildWrapper = (options) => {
//     return !options.validate ? null : validate(options.validate);
// };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const wrap = (handler, options) => {
    return (!options.validate ? null : validate(options.validate))(handler);
};

module.exports = {
    // composeWrappers,
    wrap,
    validate
}