const { reqBodyValidator, reqQueryValidator } = require('../middleware/validation.middleware');

const validate = (schemas) => (handler) => {
	const thisReqQueryValidator = schemas.reqQuery ? reqQueryValidator(schemas.reqQuery) : null;
	const thisReqBodyValidator = schemas.reqBody ? reqBodyValidator(schemas.reqBody) : null;

	return async (req, res, next) => {
		if (thisReqQueryValidator) {
			const errOnQueryValidation = await new Promise(
				(resolve) => { thisReqQueryValidator(req, res, resolve); },
			).catch((error) => error);

			if (errOnQueryValidation instanceof Error) {
				next(errOnQueryValidation);
				return;
			}
		}

		if (thisReqBodyValidator) {
			const errOnBodyValidation = await new Promise(
				(resolve) => { thisReqBodyValidator(req, res, resolve); },
			).catch((error) => error);

			if (errOnBodyValidation instanceof Error) {
				next(errOnBodyValidation);
				return;
			}
		}

		const originSend = res.send;

		const newNext = (err) => {
			res.send = originSend;
			next(err);
		};

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(res).send = (responseBody) => {
			res.send = originSend;
			res.send(schemas.noSuccessWrap ? responseBody : { success: true, data: responseBody });
		};

		try {
			await handler(req, res, newNext);
		} finally {
			res.send = originSend;
		}
	};
};

module.exports = validate;