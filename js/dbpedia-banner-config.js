var BANNER_CONFIG =
{
    "priority" : [
      { "key" : "aylien", "rank" : 200 },

    ],

    "context" : {
        "http://www.w3.org/2002/07/owl#sameAs" :
        [
            { "key" : "wikidata", "rank" : 160 },
            { "key" : "dnb", "rank" : 100 },
            { "key" : "linkedgeodata" },
        ],
    },

    "hosts" :
    {
      "aylien" :  {
          "prefix" : "https://newsapi.aylien.com",
          "icon" : "https://news-api-demo.s3.amazonaws.com/images/logo-header.png",
          "caption" : "Find latest news about {0}",
          "href" : "https://newsapi.aylien.com/demo#!/?published_at.start=NOW-30DAYS%2FDAY&amp;published_at.end=NOW&amp;entities.body.links.dbpedia%5B%5D={1}&amp;sort_by=recency&amp;ref=dbpedia",
          "rank" : 200
      },
      "wikidata": {
          "prefix" : "http://www.wikidata.org/",
          "icon" : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wikidata-logo-en.svg/320px-Wikidata-logo-en.svg.png",
          "caption" : "Edit {0} on Wikidata",
          "href" : "{1}?ref=dbpedia",
          "rank" : 150
      },
      "dnb" :  {
          "prefix" : "http://d-nb.info/",
          "icon" : "http://www.dnb.de/SiteGlobals/StyleBundles/Bilder/DNB/logo-1.gif?__blob=normal&v=1",
          "caption" : "Search the DNB for {0}",
          "href" : "{1}?ref=dbpedia",
          "rank" : 99
      },
      "linkedgeodata" : {
          "prefix" : "http://linkedgeodata.org/",
          "icon" : "http://linkedgeodata.org/files/lgdlogo.png",
          "caption" : "Find {0} on LinkedGeoData",
          "href" : "{1}?ref=dbpedia",
          "rank" : 10
      },
    },

};
