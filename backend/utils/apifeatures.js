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
                    $options: "i"
                }
            }
            : {};
        console.log(keyword);
        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryStr };

        //fields removed 
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryCopy[key]);
        console.log(queryCopy);
        //filter for Pirce and Rating
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        return this
    }

    pagination(reslutPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skipNumberofRecords = reslutPerPage * (currentPage - 1);
        this.query = this.query.limit(reslutPerPage).skip(skipNumberofRecords)
        return this;
    }
}

module.exports = ApiFeatures