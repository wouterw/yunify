/*!
 * Mongoose Schema Plugin
 * Provides last-modified functionality
 */

module.exports = function lastModifiedPlugin (schema, options) {
	schema.add({ updated_at: Date });
	schema.pre('save', function (next) {
		this.updated_at = new Date();
		next();
	});
	if (options && options.index) {
		schema.path('updated_at').index(options.index);
	}
};
