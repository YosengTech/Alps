"use strict";
var ReferenceRefresher = (function () {
    function ReferenceRefresher(ReadQueries) {
        this.ReadQueries = ReadQueries;
    }
    ReferenceRefresher.prototype.refresh = function (field, currentValue, search) {
        var _this = this;
        var referenceFields = {};
        referenceFields[field.name()] = field;
        var promise = this.ReadQueries.getAllReferencedData(referenceFields, search)
            .then(function (r) { return r[field.name()]; })
            .then(function (results) { return _this._transformRecords(field, results); });
        if (field.type() === 'reference_many' || field.type() === 'choices') {
            promise = promise.then(function (formattedResults) { return _this._removeDuplicates(formattedResults, currentValue); });
        }
        return promise;
    };
    ReferenceRefresher.prototype.getInitialChoices = function (field, values) {
        var _this = this;
        return this.ReadQueries.getRecordsByIds(field.targetEntity(), values)
            .then(function (results) { return _this._removeDuplicates(results, values); })
            .then(function (records) { return _this._transformRecords(field, records); });
    };
    ReferenceRefresher.prototype._removeDuplicates = function (results, currentValue) {
        // remove already assigned values: ui-select still return them if multiple
        if (!currentValue) {
            return results;
        }
        if (!Array.isArray(currentValue)) {
            currentValue = [currentValue];
        }
        return results.filter(function (fr) { return currentValue.indexOf(fr.value) === -1; });
    };
    ReferenceRefresher.prototype._transformRecords = function (field, records) {
        var valueFieldName = field.targetEntity().identifier().name();
        var labelFieldName = field.targetField().name();
        return records.map(function (r) {
            return {
                value: r[valueFieldName],
                label: field.getMappedValue(r[labelFieldName], r)
            };
        });
    };
    return ReferenceRefresher;
}());
ReferenceRefresher.$inject = ['ReadQueries'];
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ReferenceRefresher;
//# sourceMappingURL=ReferenceRefresher.js.map