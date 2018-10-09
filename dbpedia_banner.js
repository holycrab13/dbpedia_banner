
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

    // Creates a banner DOM element from a banner item config object
    function createBannerItem(itemConfig) {

        return "<figure><img src='" + itemConfig.icon + "' height='72' width='auto'><figcaption><br><a target='_blank' href='" + 
            itemConfig.href + "'>" + itemConfig.caption + "</a></figcaption></figure>";
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

        // Get the sameAs relations for contextual banner items
        var sameAsList = resourceObject["http://www.w3.org/2002/07/owl#sameAs"];
 
        // sameAs relations found and URL object is supported by the browser (not supported by IE11)
        if(sameAsList != null) {

            // Create contextual banner items
            for(var same in sameAsList) {

                // Get the URL string, skip if not found
                var urlString = sameAsList[same]["value"];

                if(urlString == null) {
                    continue;
                }

                // Get the host name
                var hostName = getHostName(urlString);

                if(BANNER_CONFIG["context"][hostName] != null) {

                    var bannerItem = BANNER_CONFIG["context"][hostName];
                    bannerItem.href = bannerItem.href.replace("{0}", encodeURI(urlString));
                    bannerItem.caption = bannerItem.caption.replace("{0}", labelEn);

                    bannerItems.push(bannerItem);
                }
            }
        }

        // Create priority banner items
        for(p in BANNER_CONFIG["priority"]) {
            
            var bannerItem = BANNER_CONFIG["priority"][p];
            bannerItem.href = bannerItem.href.replace("{0}", encodeURI(resourceURI));
            bannerItem.caption = bannerItem.caption.replace("{0}", labelEn);

            bannerItems.push(bannerItem);
        }

        // Sort banner items descending by rank
        bannerItems.sort(function(a, b) {
            return b.rank - a.rank;
        });


        // Create DOM elements and append to placeholder
        for(b in bannerItems) {
            $(".banner-slider").append(createBannerItem(bannerItems[b]));
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

