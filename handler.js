class mysqlHandler {
    constructor(pool) {
        this.pool = pool;
    }

    executeMethod(query) {
        let self = this;
        return new Promise((resolve, reject) => {
            self.pool.query(query, (error, result, fields) => {
                if(error) {
                    return reject(error);
                }
                resolve(result);
            })
        })
    }
}

module.exports = mysqlHandler;