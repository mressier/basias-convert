const { flattenObject } = require("../Flat/flattenObject");

function convertJSONtoFlatJSON(jsonContent) {
    var flattenJsonContent = [];
    for (let index = 0; index < jsonContent.length; index++) {
        const object = jsonContent[index];
        const flatten = flattenObject(object);
        const complete = completeObjectFromFlatObject(flatten)

        flattenJsonContent.push(complete);
    }

    return flattenJsonContent;
}

exports.convertJSONtoFlatJSON = convertJSONtoFlatJSON;

///
/// Private
///

function completeObjectFromFlatObject(element) {
    var obj = {}
    
    obj["identification.identifiant_site"] = element["identification.identifiant_site"]
    obj["identification.unite_gestionnaire"] = element["identification.unite_gestionnaire"]
    obj["identification.noms_usuels"] = element["identification.noms_usuels"]
    obj["identification.raison_sociale"] = element["identification.raison_sociale"]
    obj["identification.etat_connaissance"] = element["identification.etat_connaissance"]
    obj["identification.sous_surveillance"] = element["identification.sous_surveillance"]
    obj["localisation.code_insee"] = element["localisation.code_insee"]
    obj["localisation.commune_principale"] = element["localisation.commune_principale"]
    obj["localisation.zone_lambert_initiale"] = element["localisation.zone_lambert_initiale"]
    obj["localisation.coordonnees.L_zone_centroide"] = element["localisation.coordonnees.L_zone_centroide"]
    obj["localisation.coordonnees.L2e_centroide"] = element["localisation.coordonnees.L2e_centroide"]
    obj["localisation.coordonnees.L93_centroide"] = element["localisation.coordonnees.L93_centroide"]
    obj["localisation.coordonnees.L2e_adresse"] = element["localisation.coordonnees.L2e_adresse"]
    obj["localisation.cartes"] = element["localisation.cartes"]
    obj["localisation.altitude_m"] = element["localisation.altitude_m"]
    obj["localisation.precision_altitude_z"] = element["localisation.precision_altitude_z"]
    obj["localisation.carte_geologique"] = element["localisation.carte_geologique"]
    obj["proprietaires.proprietaires"] = element["proprietaires.proprietaires"]
    obj["proprietaires.nombre_proprietaires_actuels"] = element["proprietaires.nombre_proprietaires_actuels"]
    obj["activites.etat_occupation_site"] = element["activites.etat_occupation_site"]
    obj["activites.origine_date"] = element["activites.origine_date"]
    obj["activites.historique_activites"] = element["activites.historique_activites"]
    obj["activites.exploitants"] = element["activites.exploitants"]
    obj["sources_information.principale"] = element["sources_information.principale"]
    obj["synthese_historique"] = element["synthese_historique"]

    return obj
}