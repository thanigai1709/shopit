class APIFeatures {
	constructor(query, queryStr) {
		this.query = query;
		this.queryStr = queryStr;
	}

	search() {
		const keyword = this.queryStr.keyword
			? {
					name: {
						$regex: this.queryStr.keyword,
						$options: "i",
					},
			  }
			: {};

		this.query = this.query.find({ ...keyword });
		return this;
	}
	filter() {
		const queryClone = { ...this.queryStr };
		// removing fields
		const removeFields = ["keyword", "limit", "page"];
		removeFields.forEach((el) => delete queryClone[el]);
		// filter by price , ratings
		let queryStr = JSON.stringify(queryClone);
		queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);
		console.log(queryStr);
		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}
	pagination(perPage) {
		const currentPage = Number(this.queryStr.page) || 1;
		const skip = perPage * (currentPage - 1);
		this.query = this.query.limit(perPage).skip(skip);
		return this;
	}
}

module.exports = APIFeatures;
