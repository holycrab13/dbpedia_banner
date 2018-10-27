
$( document ).ready(function() {

  // PROTOTYPE CODE: Get json URL from DOM for ajax request
  var jsonURL = $("link[type='application/json']").attr("href");

  // Returns the value from a list of object with a specified lang property
  function getLanguageString(labels, lang) {

    if(labels == undefined) {
      return null;
    }

    for(var i = 0; i < labels.length; i++) {

      if(labels[i].lang == lang) {
        return labels[i].value;
      }
    }

    return null;
  };

  function createBannerItem(configItem, host, labelEn, urlString) {
    return {
      icon : host.icon,
      caption : host.caption.replace("{0}", labelEn),
      href : host.href.replace("{1}", encodeURI(urlString)),
      rank : (configItem.rank != undefined) ? configItem.rank : host.rank
    }
  }

  // Creates a banner DOM element from a banner item config object
  function createDOMElement(bannerItem) {

    return "<figure><img src='" + bannerItem.icon + "' height='72' width='auto'><figcaption><br><a target='_blank' href='" +
    bannerItem.href + "'>" + bannerItem.caption + "</a></figcaption></figure>";
  }

  function getHostName(urlString) {

    if(typeof URL === "function") {

      var url = new URL(urlString);
      return url.hostname;
    }

    return null;
  }

  // Get JSON asynchronously, this will be fetched from the DOM directly in a later version.
  $.getJSON( jsonURL, function( data ) {

    // Get the primary topic node
    var primaryTopicSelector = $("head link[rel='foaf:primarytopic']");

    if(primaryTopicSelector.length == 0) {
      console.warn("Unable to find link with 'foaf:primarytopic' in the DOM");
      return;
    }

    // Get the resource URI
    var resourceURI = primaryTopicSelector.attr("href");

    if(resourceURI == null) {
      console.warn("'href' attribute of 'foaf:primarytopic' link is not set");
      return;
    }

    var bannerItems = [];
    var bannerItemMap = {};

    var resourceObject = data[resourceURI];

    if(resourceObject == null) {
      console.warn("Resource information not found in JSON: owl:sameAs, rdf:label")
      return;
    }

    // Get the list of rdf labels from the JSON object
    var labels = resourceObject["http://www.w3.org/2000/01/rdf-schema#label"];

    // Get the english label
    var labelEn = getLanguageString(labels, "en");

    if(labelEn == null) {
      console.warn("Resource information not found in JSON: rdf:label")
      return;
    }

    // Get all context predicates from the config file
    var contextConfig = BANNER_CONFIG["context"];

    // Get a list of all the hosts set up for banner items
    var hosts = BANNER_CONFIG["hosts"];

    // Iterate over all predicates registered as context item
    for(predicate in contextConfig) {

      // Get the predicate config
      var contextPredicateConfig = contextConfig[predicate];

      // Get entities from the resource object
      var contextEntities = resourceObject[predicate];

      // Check whether there are any entities in the current document
      if(contextEntities != undefined) {

        // Iterate over the entitites
        for(var entity in contextEntities) {

          // Get the URL string, skip if not found
          var urlString = contextEntities[entity]["value"];

          if(urlString == null) {
            continue;
          }

          // Iterate over all entries of the current predicate config
          for(i in contextPredicateConfig) {

            // Get the key of the config item
            var key = contextPredicateConfig[i].key;

            // Check, whether there is already a banner item registered with this key
            if(bannerItemMap[key] != undefined) {
              continue;
            }

            // Get the hosts from the host config by key
            var host = hosts[key];

            // Check, whether the current entity starts with any of the hosts' prefixes
            if(urlString.startsWith(host.prefix)) {

              // Add banner item, add entry to map
              bannerItems.push(createBannerItem(contextPredicateConfig[i], host, labelEn, urlString));
              bannerItemMap[key] = 1;

            }
          }
        }
      }
    }

    var priorityConfig = BANNER_CONFIG["priority"];

    // Create priority banner items
    for(i in priorityConfig) {

      var key = priorityConfig[i].key;

      if(bannerItemMap[key] != undefined) {
        continue;
      }

      var host = hosts[key];

      bannerItems.push(createBannerItem(priorityConfig[i], hosts[key], labelEn, resourceURI));

      bannerItemMap[key] = 1;
    }

    // Sort banner items descending by rank
    bannerItems.sort(function(a, b) {
      return b.rank - a.rank;
    });


    // Create DOM elements and append to placeholder
    for(b in bannerItems) {
      $(".banner-slider").append(createDOMElement(bannerItems[b]));
    }

    // Create the tiny slider
    var slider = tns({
      "container": ".banner-slider",
      "items": 2,
      "slideBy": "page",
      "mouseDrag": true,
      "swipeAngle": false,
      "speed": 400,
      "nav": false,
      "controls": false,
      "gutter": 0,
      "autoplay": true,
      "autoplayButtonOutput": false,
      "autoplayButton": false,
      // container: '.my-slider',
      // items: 1,
      responsive: {
        640: {
          edgePadding: 20,
          gutter: 20,
          items: 2
        },
        700: {
          gutter: 30
        },
        900: {
          items: 4
        }
      }
    });


  }).fail(function() {
    console.log( "error" );
  });

});
