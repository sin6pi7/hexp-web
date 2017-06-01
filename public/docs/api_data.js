define({ "api": [
  {
    "type": "delete",
    "url": "/movies/:id",
    "title": "Delete a movie",
    "name": "DeleteMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the movie to patch.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/movies.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/movies/:id",
    "title": "Request movie information",
    "name": "GetMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of requested movie.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        id: 51,\n        title: \"Iron Jawed Angels\",\n        description: \"American women's suffrage movement during the 1910s\",\n        release_date: \"2004-01-01T00:00:00.000Z\",\n        producer: \"\",\n        director: \"Katja von Garnier\",\n        cast: \"Hilary Swank, Anjelica Huston, Molly Parker, Margo Martindale, Frances O'Connor, Lois Smith, Vera Farmiga, Brooke Smith, Adilah Barnes, Laura Fraser, Julia Ormond, Patrick Dempsey, Joseph Adams, Bob Gunton, \",\n        country: null,\n        poster: \"http://image.tmdb.org/t/p/w185/q7OTC8AoUEsOj9fgRA1FYIExbhB.jpg\",\n        trailer: null,\n        tmdb_id: \"49007\",\n        createdAt: \"2017-06-01T12:10:21.273Z\",\n        updatedAt: \"2017-06-01T12:10:21.273Z\",\n        deletedAt: null,\n        tags: [\n          {\n          id: 58,\n          name: \"Women%27s suffrage in the United States\",\n          createdAt: \"2017-06-01T12:10:23.676Z\",\n          updatedAt: \"2017-06-01T12:10:23.676Z\",\n          movie_votable: {\n          id: 388,\n          movieId: 51,\n          votableType: \"tag\",\n          votableId: 58,\n          score: 1,\n          createdAt: \"2017-06-01T12:10:24.747Z\",\n          updatedAt: \"2017-06-01T12:10:24.747Z\"\n          }\n        ],\n        regions: [\n          {\n            id: 44,\n            code: \"CF\",\n            createdAt: \"2017-06-01T12:10:23.660Z\",\n            updatedAt: \"2017-06-01T12:10:23.660Z\",\n            movie_votable: {\n            id: 385,\n            movieId: 51,\n            votableType: \"region\",\n            votableId: 44,\n            score: 1,\n            createdAt: \"2017-06-01T12:10:24.746Z\",\n            updatedAt: \"2017-06-01T12:10:24.746Z\"\n          },\n        ],\n        periods: [\n          {\n            id: 7,\n            name: \"Films set in the early/mid 20th century\",\n            createdAt: \"2017-06-01T12:10:23.613Z\",\n            updatedAt: \"2017-06-01T12:10:23.613Z\",\n            movie_votable: {\n            id: 381,\n            movieId: 51,\n            votableType: \"period\",\n            votableId: 7,\n            score: 1,\n            createdAt: \"2017-06-01T12:10:24.742Z\",\n            updatedAt: \"2017-06-01T12:10:24.742Z\"\n          }\n        ],\n        movie_images: [\n          {\n            url: \"https://url.com/123\"\n          }\n        ]\n      }",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/movies.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/movies",
    "title": "Request movies list",
    "name": "GetMovies",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Filter movies by title.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number for pagination support.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of movies to return (max 100).</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "tag",
            "description": "<p>Filter movies by tag.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "periods",
            "description": "<p>Filter movies by periods.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "regions",
            "description": "<p>Filter movies by regions.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        rows: [\n          {\n            id: 6,\n            title: \"The Last Legion\",\n            description: \"connecting (in heavily fictionalized fashion) the deposition of the last Roman emperor Romulus Augustus by Odoacer with the Battle of Mount Badon\",\n            release_date: \"2007-01-01T00:00:00.000Z\",\n            producer: \"Tarak Ben Ammar, Raffaella De Laurentiis, Dino De Laurentiis, Martha De Laurentiis, \",\n            director: \"Doug Lefler\",\n            cast: \"Colin Firth, Ben Kingsley, Aishwarya Rai Bachchan, Peter Mullan, Kevin McKidd, John Hannah, Iain Glen, Thomas Brodie-Sangster, Rupert Friend, Nonso Anozie, Owen Teale, Alexander Siddig, Robert Pugh, James Cosmo, Harry Van Gorkum, Murray McArthur, \",\n            country: null,\n            poster: \"http://image.tmdb.org/t/p/w185/8K4WWwFew1CzCGVkgmKdamCA6kz.jpg\",\n            trailer: null,\n            tmdb_id: \"9703\",\n            createdAt: \"2017-06-01T12:10:21.256Z\",\n            updatedAt: \"2017-06-01T12:10:21.256Z\",\n            deletedAt: null,\n            regions: [\n              {\n                id: 11,\n                code: \"PT\",\n                createdAt: \"2017-06-01T12:10:22.129Z\",\n                updatedAt: \"2017-06-01T12:10:22.129Z\",\n                movie_votable: {\n                id: 26,\n                movieId: 6,\n                votableType: \"region\",\n                votableId: 11,\n                score: 1,\n                createdAt: \"2017-06-01T12:10:24.303Z\",\n                updatedAt: \"2017-06-01T12:10:24.303Z\"\n              }\n            ]\n          },\n        ],\n        count: 5,\n        pageSize: 100\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/movies.js",
    "groupTitle": "Movies"
  },
  {
    "type": "patch",
    "url": "/movies/:id",
    "title": "Update partial information about a movie",
    "name": "PatchMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the movie to patch.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "title",
            "description": "<p>Title of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "description",
            "description": "<p>Description of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "release_date",
            "description": "<p>Release date of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "producer",
            "description": "<p>Producer of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "director",
            "description": "<p>Director of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": true,
            "field": "cast",
            "description": "<p>Cast of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "country",
            "description": "<p>Country of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "poster",
            "description": "<p>URL of the poster of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "trailer",
            "description": "<p>URL of the trailer of the movie.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "SemanticallyWrongParams-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        },
        {
          "title": "ResourceNotFound-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/movies.js",
    "groupTitle": "Movies"
  },
  {
    "type": "post",
    "url": "/movies",
    "title": "Create a movie",
    "name": "PostMovie",
    "group": "Movies",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "title",
            "description": "<p>Title of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "description",
            "description": "<p>Description of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "release_date",
            "description": "<p>Release date of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "producer",
            "description": "<p>Producer of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "director",
            "description": "<p>Director of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String[]",
            "optional": false,
            "field": "cast",
            "description": "<p>Cast of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "country",
            "description": "<p>Country of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "poster",
            "description": "<p>URL of the poster of the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "trailer",
            "description": "<p>URL of the trailer of the movie.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/movies.js",
    "groupTitle": "Movies"
  },
  {
    "type": "get",
    "url": "/periods",
    "title": "Request periods list",
    "name": "GetPeriods",
    "group": "Periods",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter periods by name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number for pagination support.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of periods to return (max 100).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        rows: [\n          {\n            \"id\": 1,\n            \"name\": \"Films set in Antiquity (until the fall of the Roman Empire in the West)\",\n            \"createdAt\": \"2017-06-01T12:10:21.926Z\",\n            \"updatedAt\": \"2017-06-01T12:10:21.926Z\"\n          }\n        ],\n        count: 1,\n        pageSize: 100\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/periods.js",
    "groupTitle": "Periods"
  },
  {
    "type": "get",
    "url": "/regions",
    "title": "Request regions list",
    "name": "GetRegions",
    "group": "Regions",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "code",
            "description": "<p>Filter regions by code.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number for pagination support.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of regions to return (max 100).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        rows: [\n          {\n            \"id\": 1,\n            \"code\": \"PT\",\n            \"createdAt\": \"2017-06-01T12:10:21.926Z\",\n            \"updatedAt\": \"2017-06-01T12:10:21.926Z\"\n          }\n        ],\n        count: 1,\n        pageSize: 100\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/regions.js",
    "groupTitle": "Regions"
  },
  {
    "type": "delete",
    "url": "/tags/:id",
    "title": "Delete a tag",
    "name": "DeleteTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of the tag to delete.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 20o OK",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/tags/:id",
    "title": "Request tag information",
    "name": "GetTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": "<p>Id of requested tag.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n   \"id\": 1,\n        \"name\": \"Pharaoh Khufu\",\n        \"createdAt\": \"2017-06-01T12:10:21.941Z\",\n        \"updatedAt\": \"2017-06-01T12:10:21.941Z\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "get",
    "url": "/tags",
    "title": "Request tags list",
    "name": "GetTags",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "name",
            "description": "<p>Filter tags by name.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number for pagination support.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of tags to return (max 100).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        rows: [\n          {\n            \"id\": 1,\n            \"name\": \"Pharaoh Khufu\",\n            \"createdAt\": \"2017-06-01T12:10:21.926Z\",\n            \"updatedAt\": \"2017-06-01T12:10:21.926Z\"\n          }\n        ],\n        count: 1,\n        pageSize: 100\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "post",
    "url": "/tags",
    "title": "Create a tag",
    "name": "PostTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie the tag should be assign to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the tag.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "put",
    "url": "/tags/:id",
    "title": "Update a tag",
    "name": "PutTag",
    "group": "Tags",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie the tag should be assign to.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the tag.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/tags.js",
    "groupTitle": "Tags"
  },
  {
    "type": "delete",
    "url": "/votes",
    "title": "Delete a vote",
    "name": "DeleteVotes",
    "group": "Votes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie vote refers to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "votableId",
            "description": "<p>Id of the votable type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "votableType",
            "description": "<p>Type of votable resource (tag|period|region).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/votes.js",
    "groupTitle": "Votes"
  },
  {
    "type": "get",
    "url": "/votes",
    "title": "Request votes list",
    "name": "GetVotes",
    "group": "Votes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "movieId",
            "description": "<p>Id of the movie to find votes for.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "votableType",
            "description": "<p>Type of votable resource (tag|period|region).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "page",
            "description": "<p>Page number for pagination support.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": true,
            "field": "limit",
            "description": "<p>Number of votes to return (max 100).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n        rows: [\n          {\n            \"id\": 1,\n            \"movieId\": 1,\n            \"votableType\": \"period\",\n            \"votableId\": 1,\n            \"score\": 1,\n            \"createdAt\": \"2017-06-01T12:10:24.262Z\",\n            \"updatedAt\": \"2017-06-01T12:10:24.262Z\"\n          }\n        ],\n        count: 1,\n        pageSize: 100\n     }",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/votes.js",
    "groupTitle": "Votes"
  },
  {
    "type": "patch",
    "url": "/votes",
    "title": "Patch a vote",
    "name": "PatchVotes",
    "group": "Votes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "action",
            "description": "<p>Action to perform (upvote|downvote). Upvote adds 1 to the score, downvote subtracts 1 from the score.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie vote refers to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "votableId",
            "description": "<p>Id of the votable type.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "votableType",
            "description": "<p>Type of votable resource (tag|period|region).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/votes.js",
    "groupTitle": "Votes"
  },
  {
    "type": "post",
    "url": "/votes",
    "title": "Create a vote with default score",
    "name": "PostVotes",
    "group": "Votes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie to append votable to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "votableId",
            "description": "<p>Id of the votable type to append to the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "votableType",
            "description": "<p>Type of votable resource (tag|period|region).</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 422 Unprocessable Entity",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/votes.js",
    "groupTitle": "Votes"
  },
  {
    "type": "put",
    "url": "/votes",
    "title": "Update a vote",
    "name": "PutVotes",
    "group": "Votes",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "movieId",
            "description": "<p>Id of the movie to append votable to.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "votableId",
            "description": "<p>Id of the votable type to append to the movie.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "votableType",
            "description": "<p>Type of votable resource (tag|period|region).</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "score",
            "description": "<p>A number that should be assigned as score of this vote.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Bad Request",
          "type": "json"
        },
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 404 Not Found",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "lib/api/routes/votes.js",
    "groupTitle": "Votes"
  }
] });
