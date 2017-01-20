const endpointUrl = 'http://localhost:3030/test/query'

/* tslint:disable */
const IC1 = {
    constraintClass: "SparqlConstraint",
    constraintResolver: "SparqlAskResolver",
    constraintParameter: {description: "Every qb:Observation has exactly one associated qb:DataSet.", name: "IC-1. Unique DataSet", endpointUrl , sparqlQuery: "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX qb: <http://purl.org/linked-data/cube#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX owl: <http://www.w3.org/2002/07/owl#> ASK { { ?obs a qb:Observation . FILTER NOT EXISTS { ?obs qb:dataSet ?dataset1 . } } UNION { ?obs a qb:Observation ; qb:dataSet ?dataset1, ?dataset2 . FILTER (?dataset1 != ?dataset2) } } "}
};

const  IC2 = {
  constraintClass: "SparqlConstraint",
  constraintResolver: "SparqlAskResolver",
  constraintParameter: {description: "Every qb:Observation has exactly one associated qb:DataSet.", name: "IC-1. Unique DataSet", endpointUrl , sparqlQuery: "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX qb: <http://purl.org/linked-data/cube#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX owl: <http://www.w3.org/2002/07/owl#> ASK { { ?dataset a qb:DataSet . FILTER NOT EXISTS { ?dataset qb:structure ?dsd . } } UNION { ?dataset a qb:DataSet ; qb:structure ?dsd1, ?dsd2 . FILTER (?dsd1 != ?dsd2) } }"}
}

/* tslint:enable */

export default [IC1]
