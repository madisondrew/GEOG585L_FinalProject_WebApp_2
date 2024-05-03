window.onload = function() {
        // type="text/javascript"; src="us-states.js" // commented out by Dr. Yang
        type = "text/javascript";
        src = "pueblobonito_rooms_phase1_poly.js"; // added by Dr. Yang
        src = "phase_2_poly.js";
        src = "phase-3-4-poly.js";
        

        // const map = L.map("map").setView([37.8, -96], 4); // commented out by Sarigai
        const map = L.map("map").setView(
            [36.06052240396411, -107.96167091056132],
            18
        ); // edited by Sarigai // your geojson data will not be able to be shown on a small scale map, so need to zoom in more and center the certain lat, long

        const tiles = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
            maxZoom: 25,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(map);

        // console.log(roomData_phase1); // commented out by Sarigai

        // control that shows state info on hover
        const info = L.control();

        info.onAdd = function(map) {
            this._div = L.DomUtil.create("div", "info");
            this.update();
            return this._div;
        };

        info.update = function(props) {
            const contents = props // `<b>${props.name}</b><br />${props.density} people / mi<sup>2</sup>` // commented out by Sarigai
                ?
                `<b>room:${props.room_numbe}</b><br />count:${props.count} ` // edited by Sarigai // you need to update your hover over info based on your owen data, I have updated based on the geojson, but you need to check on to make sure is it correct
                : // "Hover over a state"; // commented out by Sarigai
                "Hover over a room"; // edited by Sarigai // same correction here
            // this._div.innerHTML = `<h4>US Population Density</h4>${contents}`; // suggestion by Dr. Yang: Madison remmber to added the text bettwen the h4 tag // commented out by Sarigai

            this._div.innerHTML = `<h4>Count</h4>${contents}`; // edited by Sarigai // same correction here
        };
        info.addTo(map);

        // get color depending on population density value
        function getColor(d) {
            return d > 1000 ?
                "#54278f" :
                d > 1000 ?
                "#756bb1" :
                d > 500 ?
                "#9e9ac8" :
                d > 100 ?
                "#bcbddc" :
                d > 20 ?
                "#dadaeb" :
                "#636363"; //suggestion by Dr. Yang: Madison, remember to adjust the color interval number based on your room object counts range in your own data.
        }

        function style(feature) {
            return {
                weight: 2,
                opacity: 1,
                color: "white",
                dashArray: "3",
                fillOpacity: 0.7,
                // fillColor: getColor(feature.properties.density) //commneted out by Dr. Yang
                fillColor: getColor(feature.properties.count), //added by Dr. Yang
            };
        }

        function highlightFeature(e) {
            const layer = e.target;

            layer.setStyle({
                weight: 5,
                color: "#666",
                dashArray: "",
                fillOpacity: 0.7,
            });

            layer.bringToFront();

            info.update(layer.feature.properties);
        }

        /* global statesData */
        // const geojson = L.geoJson(statesData, { //commented out by Dr. Yang

       {const geojson = L.geoJson(roomData_phase1, {
            style,
            onEachFeature,
        }).addTo(map);
       

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
            });
        }}

        {const geojson = L.geoJson(roomData_phase2, {
            style,
            onEachFeature,
        }).addTo(map);
       

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
            });
        }}

        {const geojson = L.geoJson(roomData_phase3_4, {
            style,
            onEachFeature,
        }).addTo(map);
       

        function resetHighlight(e) {
            geojson.resetStyle(e.target);
            info.update();
        }

        function zoomToFeature(e) {
            map.fitBounds(e.target.getBounds());
        }

        function onEachFeature(feature, layer) {
            layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                click: zoomToFeature,
            });
        }}
        
        
    

        // !!!!!the data source needs to be updated here //commented by Sarigai
        map.attributionControl.addAttribution(
            'Population data &copy; <a href="http://census.gov/">US Census Bureau</a>'
        );

        const legend = L.control({ position: "bottomleft" });

        legend.onAdd = function(map) {
                const div = L.DomUtil.create("div", "info legend");
                const grades = [0, 20, 100, 500, 1000];
                const labels = [];
                let from, to;

                for (let i = 0; i < grades.length; i++) {
                    from = grades[i];
                    to = grades[i + 1];

                    labels.push(
                            `<i style="background:${getColor(from + 1)}"></i> ${from}${
          to ? `&ndash;${to}` : "+"
        }`
      );
    }

    

    div.innerHTML = labels.join("<br>");
    return div;
  };

  legend.addTo(map);
};