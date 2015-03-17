var db = require('./db.js');
var BaseModel = db.BaseModel;

function ProgramModel() {
}

ProgramModel.prototype.getPeople = function(callback){
	BaseModel.query(callback,'select sum(total_calidad_vida) as totalcalidad, sum(aguas_residuos) as aguas, sum(espacios_verdes_naturaleza) as verde, sum(energia_alumbrado) as energia, sum(plan_bomberos) as bomberos, sum(plan_cohesion_social) as cohesion, sum(plan_urgencia_municipal) as urgencia, sum(total_desarrollo_personal) as totalpersonal, sum(infraestructuras_deportivas) as deportivas, sum(planes_ciudadania) as ciudadania, sum(planes_juventud) as juventud, sum(planes_culturales) as culturales, sum(programas_planes_deportivos) as deportivos from data.planes');
};

ProgramModel.prototype.getTowns = function(callback){
	BaseModel.query(callback,'select sum(total_empleo) as total_empleo, sum(fondos_reintegrables) as reintegrables, sum(feder) as feder, sum(proempleo) as proempleo, sum(turismo) as turismo, sum(conoce_la_provincia) as conoce, sum(turismo_promocion_marketing) as marketing, sum(total_mejorando_municipio) as total_mejorando_municipio, sum(programas_provinciales_plurianuales) as plurianuales, sum(pfoea) as pfoea, sum(supera) as supera, sum(sevilla) as sevilla from data.planes',callback);
};

module.exports = ProgramModel;

