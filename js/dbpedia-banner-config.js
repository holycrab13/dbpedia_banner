var BANNER_CONFIG = 
{
    "priority" : {
        "newsapi.aylien.com" :  {
            "icon" : "https://news-api-demo.s3.amazonaws.com/images/logo-header.png",
            "caption" : "Find latest news about {0}",
            "href" : "https://newsapi.aylien.com/demo#!/?published_at.start=NOW-30DAYS%2FDAY&amp;published_at.end=NOW&amp;entities.body.links.dbpedia%5B%5D={1}&amp;sort_by=recency&amp;ref=dbpedia",
            "rank" : 200
        }
    },

    "context" : {
        "www.wikidata.org": {
            "icon" : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Wikidata-logo-en.svg/320px-Wikidata-logo-en.svg.png",
            "caption" : "Edit {0} on Wikidata",
            "href" : "{1}?ref=dbpedia",
            "rank" : 150
        },
        "d-nb.info" :  {
            "icon" : "http://www.dnb.de/SiteGlobals/StyleBundles/Bilder/DNB/logo-1.gif?__blob=normal&v=1",
            "caption" : "DNB entry about {0}",
            "href" : "{1}?ref=dbpedia",
            "rank" : 99
        },
        "linkedgeodata.org" : {
            "icon" : "http://linkedgeodata.org/files/lgdlogo.png",
            "caption" : "{0} on LinkedGeoData",
            "href" : "{1}?ref=dbpedia",
            "rank" : 10
        }
    }
};
