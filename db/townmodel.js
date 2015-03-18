var db = require('./db.js');
var BaseModel = db.BaseModel;

function TownModel() {
}

TownModel.prototype.getTownsNames = function(name,callback){
	BaseModel.query(callback,'select cod_ine as id, etiqueta as label from data.municipios where unaccent(LOWER(etiqueta) )like unaccent(LOWER($1)) order by etiqueta', ['%'+ name +'%']);
};

TownModel.prototype.getTowns = function(callback){
	BaseModel.query(callback,'select id, etiqueta, total from data.programas inner join data.municipios on cod_ine=id order by etiqueta');
};

TownModel.prototype.getTown = function(id,callback){
	BaseModel.query(callback, 'select total, etiqueta, descripcion, heraldica, lema, total_calidad_vida as totalcalidad, aguas_residuos as aguas, espacios_verdes_naturaleza as verde, energia_alumbrado as energia, plan_bomberos as bomberos, plan_cohesion_social as cohesion, plan_urgencia_municipal as urgencia, total_desarrollo_personal as totalpersonal, infraestructuras_deportivas as deportivas, planes_ciudadania as ciudadania, planes_juventud as juventud, planes_culturales as culturales, programas_planes_deportivos as deportivos, total_empleo as total_empleo, fondos_reintegrables as reintegrables, feder as feder, proempleo as proempleo, turismo as turismo, conoce_la_provincia as conoce, turismo_promocion_marketing as marketing, total_mejorando_municipio as total_mejorando_municipio, programas_provinciales_plurianuales as plurianuales, pfoea as pfoea, supera as supera, sevilla as sevilla from data.municipios inner join data.programas on cod_ine=id inner join data.planes p on cod_ine=p.id where cod_ine=$1', [id]);
};

TownModel.prototype.getPeoplePlanData = function(id,callback){

	BaseModel.query(callback, 'select aguas_residuos as "Agua y Residuos", espacios_verdes_naturaleza as "Espacios Verdes y Naturaleza", energia_alumbrado as "Energía y Alumbrado", plan_bomberos as "Plan de Bomberos", plan_cohesion_social as "Plan Provincial de Cohesión Territorial", plan_urgencia_municipal as "Plan de Urgencia Municipal 2011-2014", infraestructuras_deportivas as "Infraestructuras Deportivas", planes_ciudadania as "Planes de Ciudadanía", planes_juventud as "Planes de Juventud", planes_culturales as "Planes Culturales", programas_planes_deportivos as "Programas y Planes Deportivos" from data.planes where id=$1', [id]);
};

TownModel.prototype.getTownPlanData = function(id,callback){

	BaseModel.query(callback, 'select fondos_reintegrables as "Fondos Reintegrables", feder as "FEDER", proempleo as "ProEmpleo III y IV", turismo as "Turismo", conoce_la_provincia as "Conoce la Provincia", turismo_promocion_marketing as "Turismo Promoción y Marketing", programas_provinciales_plurianuales as "Programas Provinciales Plurianuales", pfoea as "Programa de Fomento de Empleo Agrario y Rural", supera as "Supera", sevilla as "Viviendas y Colegios (Sevilla Activa)" from data.planes where id=$1', [id]);
};

TownModel.prototype.getProgramsData = function(id,callback){

	BaseModel.query(callback, 'select total_calidad_vida as "Con la calidad de vida", total_desarrollo_personal as "Con el desarrollo personal", fondos_reintegrables as "Fondos Reintegrables", total_empleo as "Con el Empleo", total_mejorando_municipio as "Mejorando el Municipio" from data.planes where id=$1', [id]);
};


module.exports = TownModel;

