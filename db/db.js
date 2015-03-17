function init(callback){
    module.exports.BaseModel = new (require('./basemodel.js'));
    module.exports.ProgramModel = new (require('./programmodel.js'));
    module.exports.TownModel = new (require('./townmodel.js'));
    callback();
}

module.exports.init = init