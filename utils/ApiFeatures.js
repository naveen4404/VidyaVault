class ApiFeatures {
  constructor(query, queryObj) {
    this.query = query;
    this.queryObj = queryObj;
  }
  filter() {
    const filterObject = { ...this.queryObj };
    const excludedFields = ["sort", "limit", "fields", "page"];
    excludedFields.forEach((el) => delete filterObject[el]);
    this.query.find(filterObject);
    return this;
  }
  sort() {
    if (this.queryObj.sort) {
      const sortStr = this.queryObj.sort.split(",").join(" ");
      this.query.sort(sortStr);
    } else {
      this.query.sort("uploadedAt");
    }
    return this;
  }
  fields() {
    if (this.queryObj.fields) {
      const fieldsStr = this.queryObj.fields.split(",").join(" ");
      this.query.select(fieldsStr);
    } else {
      this.query.select("-__v");
    }
    return this;
  }
}
module.exports = ApiFeatures;
