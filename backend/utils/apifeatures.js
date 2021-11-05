class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }
    search() {
        const keyword = this.queryStr.keyword ?
            {
                name: {
                    $regex: this.queryStr.keyword,
                    $options: "i",
                },
            }
            : {};
        console.log("keyword: " + keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        console.log(this.queryStr);
        const queryCopy = { ...this.queryStr };

        //fields removed 
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        // console.log(queryCopy);
        //filter for Pirce and Rating
        let queryStr = JSON.stringify(queryCopy);
        console.log(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        console.log("query string :" + queryStr);
        console.log(JSON.parse(queryStr, null, 2));
        this.query = this.query.find(JSON.parse(queryStr, null, 2));
        return this;
    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;

        const skip = resultPerPage * (currentPage - 1);

        this.query = this.query.limit(resultPerPage).skip(skip);

        return this;
    }
}

module.exports = ApiFeatures;