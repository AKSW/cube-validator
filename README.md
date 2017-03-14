Cube Validator
==============

The project aims to make validation of data cubes more easier. It is written for Node.js in TypeScript and compiles down to JavaScript. The application takes several constraints which are user or predefined and tries to resolve them. At the end the user gets a JSON result.  
Our predefined constraints are taken from the [W3C well-formed cubes note](https://www.w3.org/TR/vocab-data-cube/).

Usage
-----

### In Browser

Build a bundled JavaScript file with `npm run build:browser` and use this file in your HTML code.

```
<script src="dist/cubeValidation.js"></script>
<script>

  var constraints = [/* Your json constraints */]

  var validator = new CubeValidation.CubeValidator(constraints);
  validator.validate().then(results => {
    console.log(results);
  });

</script>
```

### In Code

```
import CubeValidator from 'cube-validator.js';

const config = [/*Your config file*/];
const validator = new CubeValidator(config);

validator.validate(results => {
  console.log(results)
});
```

### Docker

You can run the hole validation progress with Docker. Simply clone this repository and edit the `docker-compose.yml` file to your needs. You have to define a volume where your `config.json` is located. After that go to the docker folder and start the process. So the complete progress will look like this:

```
git clone https://github.com/AKSW/cube-validator.git
cd ./cube-validator/docker
docker-compose up
```

You'll get a `results.json` file in the specified folder.

Features
--------

### Results despite errors

Imagine you want to check 50 constraints which are not just create by yourself but also from others, so you can expect errors. Cube Validator tries to resolve all constraints and in case of an exception it still resolves the remaining constraints. So that you get as much results as possible.

### Create constraints with configs

Constraints can be defined within a config file or in code. The config file is just a plain JSON array where you specify the constraint and resolver classes to be used.  
Currently there are a `SparqlConstraint`class which sends queries to an endpoint and a `SparqlAskResolver` class which resolves a response from a SPARQL ASK query.

Config example:

```
[  
   {  
      "constraintClass":"SparqlConstraint",
      "constraintResolver":"SparqlAskResolver",
      "constraintParameter":{  
         "description":"Every qb:Observation has exactly one associated qb:DataSet.",
         "name":"IC-1. Unique DataSet",
         "endpointUrl":"http://localhost:3030/datacube/query",
         "sparqlQuery":"PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#> PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> PREFIX skos: <http://www.w3.org/2004/02/skos/core#> PREFIX qb: <http://purl.org/linked-data/cube#> PREFIX xsd: <http://www.w3.org/2001/XMLSchema#> PREFIX owl: <http://www.w3.org/2002/07/owl#> ASK { { ?obs a qb:Observation . FILTER NOT EXISTS { ?obs qb:dataSet ?dataset1 . } } UNION { ?obs a qb:Observation ; qb:dataSet ?dataset1, ?dataset2 . FILTER (?dataset1 != ?dataset2) } } "
      }
   },
   {  
      "constraintClass":"SparqlConstraint",
      "constraintResolver":"SparqlAskResolver",
      "constraintParameter":{  
         "description":"Every qb:DataSet has exactly one associated qb:DataStructureDefinition.",
         "name":"IC-2. Unique DSD",
         "endpointUrl":"http://localhost:3030/datacube/query",
         "sparqlQuery":  "..."
      }
   }
]
```

### Create your own constraints

Of course you can create custom constraint and resolver classes.  
With TypeScript just implement the `IConstraint` or `IRsolve` interface or extend some existing classes. With JavaScript it is also important that you implement the Interface methods.

For example create a new MyResolver class:

```
import CubeValidator, {SparqlAskResolver} from 'cube-validator.js'

class MyResolver extends SparqlAskResolver {
  // this is the interface method
  resolve(response) {
    return False;
  }
}
```

After that you can introduce the new class to the Cube Validator:

```
import CubeValidator from 'cube-validator.js'
import MyResolver from 'where-every-want'

const validator = new CubeValidator();

// add the new classes
validator.addClasses([NoResolver])

// create the new constrains from your config file which contains now your custom classes
const constraints = validator.createConstraints(config)

// set the new constrains
validator.setConstraints(constraints)

// and validate
validator.validate(results => {
  console.log(results)
});
```

The corresponding config file looks like this:

```

[  
   {  
      "constraintClass":"SparqlConstraint",
      "constraintResolver":"NoResolver",
      "constraintParameter":{  
         "description":"...",
         "name":"...",
         "endpointUrl":"http://localhost:3030/datacube/query",
         "sparqlQuery":"..."
      }
   }
]
```

Just set the new class name `NoResolver` to the `constraintResolver` property. If you need to define custom parameters for constraint classes you can provide them in the `constraintParameter` object. `description` and `name` are mandatory for every constraint but `endpointUrl` and `sparqlQuery` are just custom parameters for the `SparqlConstraint` class.

For more understanding please look into the implementation and test cases. A documentation will be provided soon.
