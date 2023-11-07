		$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		//set up markers 
		var myMarkers = {"markers": [
				{"latitude": "40.773998", "longitude":"-73.966003", "icon": "img/map-marker.png"}
			]
		};
		
		//set up map options
		$("#map_contact").mapmarker({
			zoom	: 14,
			center	: '11 5th Ave, New York, NY 10003',
			markers	: myMarkers
		});

});