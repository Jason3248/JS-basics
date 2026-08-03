export function buildPagination(query, sortableFields, defaultSort = 'id'){
    const page = Math.max(1, Number(query.page) || 1);
    const limit = Math.min(20, Math.max(1, Number(query.limit) || 10));
    const offset = (page - 1) * limit;
    const sortBy = sortableFields.includes(query.sortBy) ? query.sortBy : defaultSort;
    const order = query.order?.toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
    return {limit, offset, order: [[sortBy, order]], page};
}

export function buildWhere(query, config){
    const where = {};
    for(const [param, rules] of Object.entries(config)){
        if(query[param] === undefined || query[param] === '') continue;
        const field = rules.field || param;
        const value = rules.transform ? rules.transform(query[param]) : query[param];
        where[field] = {...(where[field] || {}), [rules.op]: value}
    }
    return where;
}
