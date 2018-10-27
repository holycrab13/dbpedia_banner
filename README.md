# DBpedia Banner Slider
Javascript banner rendering for DBpedia HTML pages



## How to Use

Add to scripts

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.6/min/tiny-slider.js"></script>
<script src="js/dbpedia-banner-config.js"></script>
<script src="js/dbpedia-banner.js"></script>
```

Add to styles

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tiny-slider/2.8.6/tiny-slider.css">
<link rel="stylesheet" href="css/dbpedia-banner.css">
```

Add to DOM

```html
<div class="banner-slider"></div>
```



## Config

This is an example configuration. 
Hosts are defined with an icon, a caption, a link, a rank and a prefix. The placeholder **{0}** will be replaced with the resource label. The placeholder **{1}** will be replaced with the resource URI. All banner items will be sorted by rank.
The prefix is used to determine whether the host fits the context of the current page.

Banner items can be set up under "priority" and "context" to create the two types of banner items:

- **Priority Items** - Priority items can be displayed on all pages and do not need a specific context.
- **Contextual Items** - Only hosts offering data about this resource will be displayed. The context config contains a map of relation URI to list of banner items. In this particular case, "wikidata", "dnb" and "linkedgeodata" are shown in the banner, if there is a "http://www.w3.org/2002/07/owl#sameAs" relation from the current resource to a resource URI that starts with the respective host prefix.

The host rank can be overwritten by setting the rank field in the banner item.



```json
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

}
```



