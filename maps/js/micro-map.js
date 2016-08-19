function checkSession( ServiceName, ERROR ) {
	var message;
	if( ERROR.find( "ACCESS_ERROR" ).length > 0 ) {
		message = "ACCESS_ERROR: " + ERROR.find( "ACCESS_ERROR" ).text().trim();
	} else if( ERROR.find( "LOGIN_ERROR" ).length > 0 ) {
		message = "LOGIN_ERROR: " + ERROR.find( "LOGIN_ERROR" ).text().trim();
	} else if( ERROR.find( "SESSION_ERROR" ).length > 0 ) {
		message = "SESSION_ERROR: " + ERROR.find( "SESSION_ERROR" ).text().trim();
	} else if( ERROR.find( "SESSION_TIMEOUT_ERROR" ).length > 0 ) {
		message = "SESSION_TIMEOUT_ERROR: " + ERROR.find( "SESSION_TIMEOUT_ERROR" ).text().trim();
	} else if( ERROR.find( "PROJECT_ERROR" ).length > 0 ) {
		message = "PROJECT_ERROR: " + ERROR.find( "PROJECT_ERROR" ).text().trim();
	} else if( ERROR.find( "API_ERROR" ).length > 0 ) {
		message = "API_ERROR: " + ERROR.find( "API_ERROR" ).text().trim();
	} else if( ERROR.find( "NO_RECORD" ).length > 0 ) {
		message = "NO_RECORD";
	} else {
		message = "";
	}

	return message;
}

function getMapUnitByProject( SessionId, ProjectId ) {
	$.ajax({
		type: "POST",
		url: Server + MicroMapService + "getMapUnitByProject",
		dataType: "xml",
		data: {
			SessionId: SessionId,
			ProjectId: ProjectId
		},
		success: function( xml ) {
			var message = checkSession( "MicroMapService\ngetMapUnitByProject", $( xml ) );
			if( message == "" ) {
				// parse
				var mapid = $( xml ).find( "mapid" );
				var mapname = $( xml ).find( "mapname" );
				var maptype = $( xml ).find( "maptype" );

				// ui
				if( mapid.length > 0 ) {
					var MapId, MapName, MapType;
					for( var i=0 ; i<mapid.length ; i++ ) {
						MapId = mapid.eq(i).text().trim();
						MapName = mapname.eq(i).text().trim();
						MapType = maptype.eq(i).text().trim();

						if( MapType == "0" ) {
							$( "#select_mapid" ).append(
								"<option value=\"" + MapId + "\">" + MapId + "</option>"
							);
						}
					}
					$( "#select_mapid" ).selectmenu({
						change: function( event, ui ) {
							// load micro-map img & info
							getMicroMap( SessionId, ui.item.value, "div_esound", "", "" );
						}
					});
				}
			}
		},
		error: function( xhr, ajaxOptions, thrownError ) {
			alert( "Error: " + xhr.status + "\n" + thrownError );
		}
	});
}

function getMicroMap( SessionId, mapID, RootDivId, X, Y ) {
	var MicroMap = new HashTable();

	// ui
	$( "#" + RootDivId ).css( "display", "block" );
	$( "#" + RootDivId + "-loading" ).css( "display", "block" );
	$( "#" + RootDivId + "-zoom" ).css( "display", "none" );

	$.ajax({
		type: "POST",
		url: Server + MicroMapService + "getMicroMap",
		dataType: "xml",
		data: {
			SessionId: SessionId,
			mapID: mapID
		},
		success: function( xml ) {
			var message = checkSession( "MicroMapService\ngetMicroMap", $( xml ) );
			if( message == "" ) {
				// parse
				var mapid = $( xml ).find( "mapid" ).eq( 0 ).text().trim();
				var name = $( xml ).find( "name" ).eq( 0 ).text().trim();
				var ismothermap = $( xml ).find( "ismothermap" ).eq( 0 ).text().trim();
				var imgbase = $( xml ).find( "imgbase" ).eq( 0 ).text().trim();
				var imgwidth = $( xml ).find( "imgwidth" ).eq( 0 ).text().trim();
				var imgheight = $( xml ).find( "imgheight" ).eq( 0 ).text().trim();
				var refpoints = $( xml ).find( "refpoints" ).find( "refpoint" );
				var refpoint = [];
				var submapinfos = $( xml ).find( "submapinfos" ).find( "submapinfo" );
				var submapinfo = [];
				var subbuildinginfos = $( xml ).find( "subbuildinginfos" ).find( "subbuildinginfo" );
				var subbuildinginfo = [];

				if( name == "" ) {
					name = "未提供名稱";
				}

				refpoints.each( function() {
					refpoint.push({
						MapX: $( this ).find( "mapx" ).text().trim(),
						MapY: $( this ).find( "mapy" ).text().trim(),
						GpsX: $( this ).find( "gpsx" ).text().trim(),
						GpsY: $( this ).find( "gpsy" ).text().trim(),
						GpsZ: $( this ).find( "gpsz" ).text().trim(),
					});
				});

				submapinfos.each( function() {
					var ptloctopleft = {
						x: $( this ).find( "ptloctopleft" ).find( "x" ).text().trim(),
						y: $( this ).find( "ptloctopleft" ).find( "y" ).text().trim()
					};
					var ptlocbottomright = {
						x: $( this ).find( "ptlocbottomright" ).find( "x" ).text().trim(),
						y: $( this ).find( "ptlocbottomright" ).find( "y" ).text().trim()
					};

					submapinfo.push({
						MapType: $( this ).find( "maptype" ).text().trim(),
						MapId: $( this ).find( "mapid" ).text().trim(),
						MapName: $( this ).find( "mapname" ).text().trim(),
						Info:  $( this ).find( "info" ).text().trim(),
						PtLocTopLeft: ptloctopleft,
						PtLocBottomRight: ptlocbottomright
					});
				});

				subbuildinginfos.each( function() {
					var info = $( this ).find( "info" ).text().trim();
					if( info == "" ) {
						info = "未提供名稱";
					}

					subbuildinginfo.push({
						MapType: $( this ).find( "maptype" ).text().trim(),
						MapId: $( this ).find( "mapid" ).text().trim(),
						MapName: $( this ).find( "mapname" ).text().trim(),
						Info: info,
						MapX: $( this ).find( "mapx" ).text().trim(),
						MapY: $( this ).find( "mapy" ).text().trim(),
					});
				});

				var mmitem = {
					MapId: mapid,
					MapName: name,
					IsMotherMap: ismothermap,
					ImgBase: imgbase,
					ImgWidth: imgwidth,
					ImgHeight: imgheight,
					Refpoint: refpoint,
					Subbuildinginfo: subbuildinginfo
				};
				MicroMap.put( mapID, mmitem );

				// ui
				setMicroMap( MicroMap, mapID, RootDivId, 1.0, X, Y );
			} else {
			}
		},
		error: function( xhr, ajaxOptions, thrownError ) {
			alert( "Error: " + xhr.status + "\n" + thrownError );
		}
	});
}

function setMicroMap( MicroMap, mapID, RootDivId, MapRatio, X, Y ) {
	// ui
	$( "#" + RootDivId + "-poi" ).html( "" );
	$( "#" + RootDivId + "-micromap" ).html( "" );

	// micro-map img
	$( "#" + RootDivId + "-micromap" ).append(
		"<img" + 
		" MapId=\"" + MicroMap.get( mapID ).MapId + "\"" + 
		" MapRatio=\"" + MapRatio + "\"" + 
		" title=\"" + MicroMap.get( mapID ).MapName + "\"" + 
		" src=\"data:image/png;charset=utf-8;base64," + MicroMap.get( mapID ).ImgBase + "\"" + 
		"></img>"
	);

	// map-ratio
	var MapImg = $( "#" + RootDivId + "-micromap img" ).eq(0);
	var ImgWidth = MicroMap.get( mapID ).ImgWidth;
	var ImgHeight = MicroMap.get( mapID ).ImgHeight;
	var WinWidth = $( window ).width();
	var WinHeight = $( window ).height() - $( "#" + RootDivId + "-micromap" ).offset().top;
	for( var m = 10 ; m > 0 ; m-- ) {
		if( ( ImgWidth * m / 10 ) < WinWidth && ( ImgHeight * m / 10 ) < WinHeight ) {
			MapRatio = ( m / 10 );
			break;
		}
	}
	MapImg.attr( "width", ImgWidth * Math.round( MapRatio * 10 ) / 10 );
	MapImg.attr( "MapRatio", MapRatio );

	// set beacons
	if( X != "" && X != null && Y != "" && Y != null && X.length == Y.length ) {
		var x, y;
		for( var i=0 ; i<X.length ; i++ ) {
			x = parseInt( X[i] * MapRatio );
			y = parseInt( Y[i] * MapRatio );
			$( "#" + RootDivId + "-poi" ).append(
				"<img" + 
				" BeaconId=\"\"" + 
				" MapId=\"" + mapID + "\"" + 
				" MapX=\"" + X[i] + "\"" + 
				" MapY=\"" + Y[i] + "\"" + 
				" src=\"img/beacon.png\"" + 
				" width=\"25\"" + 
				" style=\"position: absolute; left: " + x + "px; top: " + y + "px; cursor: pointer;\"></img>"
			);
		}
	}

	// zoom function
	$( "#" + RootDivId + "-zoomin" ).click( function( event ) {
		if( MapRatio < 1.0 ) {
			var ImgWidth = MicroMap.get( mapID ).ImgWidth;
			MapRatio = Math.round( MapRatio * 10 + 1 ) / 10;
			MapImg.width( ImgWidth * MapRatio );
			MapImg.attr( "MapRatio", MapRatio );
			$( "#" + RootDivId + "-poi img" ).each( function(){
				var x = parseInt( $( this ).attr( "MapX" ) * MapRatio );
				var y = parseInt( $( this ).attr( "MapY" ) * MapRatio );
				$( this ).css( "left", x );
				$( this ).css( "top", y );
				$( "#" + RootDivId + "-poi-menu" ).css( "left", ( x + 60 ) + "px" );
				$( "#" + RootDivId + "-poi-menu" ).css( "top", y + "px" );
			});
		}
	});
	$( "#" + RootDivId + "-zoomout" ).click( function( event ) {
		if( MapRatio > 0.1 ) {
			var ImgWidth = MicroMap.get( mapID ).ImgWidth;
			MapRatio = Math.round( MapRatio * 10 - 1 ) / 10;
			MapImg.width( ImgWidth * MapRatio );
			MapImg.attr( "MapRatio", MapRatio );
			$( "#" + RootDivId + "-poi img" ).each( function(){
				var x = parseInt( $( this ).attr( "MapX" ) * MapRatio );
				var y = parseInt( $( this ).attr( "MapY" ) * MapRatio );
				$( this ).css( "left", x );
				$( this ).css( "top", y );
				$( "#" + RootDivId + "-poi-menu" ).css( "left", ( x + 60 ) + "px" );
				$( "#" + RootDivId + "-poi-menu" ).css( "top", y + "px" );
			});
		}
	});

	// click micro-map img
	$( "#" + RootDivId + "-micromap" ).unbind();
	$( "#" + RootDivId + "-micromap" ).click( function( event ) {
		if( $( "#" + RootDivId + "-poi img" ).last().attr( "BeaconId" ) == "new-beacon" ) {
			// cancel adding the new-beacon
			$( "#" + RootDivId + "-poi img" ).last().remove();
		} else {
			// add a new-beacon on micro-map img
			var MapRatio = parseInt( parseFloat( $( "#" + RootDivId + "-micromap img" ).eq(0).attr( "MapRatio" ) ) * 10 );
			var x = event.pageX - parseInt( $( "#" + RootDivId + "-micromap" ).offset().left );
			var y = event.pageY - parseInt( $( "#" + RootDivId + "-micromap" ).offset().top );
			var MapX = parseInt( ( x * 10 ) / MapRatio );
			var MapY = parseInt( ( y * 10 ) / MapRatio );

			$( "#" + RootDivId + "-poi" ).append(
				"<img" + 
				" BeaconId=\"new-beacon\"" + 
				" MapId=\"" + $( "#" + RootDivId + "-micromap img" ).first().attr( "MapId" ) + "\"" + 
				" MapX=\"" + MapX + "\"" + 
				" MapY=\"" + MapY + "\"" + 
				" src=\"img/beacon.png\"" + 
				" width=\"25\"" + 
				" style=\"position: absolute; left: " + x + "px; top: " + y + "px; cursor: pointer;\"></img>"
			);

			console.log( mapID + ": ( " + MapX + ", " + MapY + " )" );

			// drag the new-beacon micro-map img
			$( "#" + RootDivId + "-poi img[BeaconId=new-beacon]" ).draggable({
				drag: function( event, ui ) {
					var MapRatio = $( "#" + RootDivId + "-micromap img" ).eq(0).attr( "MapRatio" );
					var ImgWidth = MicroMap.get( mapID ).ImgWidth * MapRatio;
					var ImgHeight = MicroMap.get( mapID ).ImgHeight * MapRatio;

					if( ui.position.left < 0 ) {
						ui.position.left = 0;
					}
					if( ui.position.left > ImgWidth ) {
						ui.position.left = ImgWidth;
					}
					if( ui.position.top < 0 ) {
						ui.position.top = 0;
					}
					if( ui.position.top > ImgHeight ) {
						ui.position.top = ImgHeight;
					}
				},
				stop: function( event, ui ) {
					var MapRatio = $( "#" + RootDivId + "-micromap img" ).eq(0).attr( "MapRatio" );
					var MapX = parseInt( ( ui.position.left * 10 ) / ( MapRatio * 10 ) );
					var MapY = parseInt( ( ui.position.top * 10 ) / ( MapRatio * 10 ) );

					$( this ).attr( "MapX", MapX );
					$( this ).attr( "MapY", MapY );

					console.log( mapID + ": ( " + MapX + ", " + MapY + " )" );
				}
			});
		}
	});

	// ui
	$( "#" + RootDivId + "-loading" ).css( "display", "none" );
	$( "#" + RootDivId + "-zoom" ).css( "display", "block" );
}

// X and Y are int array
function setBeaconOnMicroMap( SessionId, mapID, RootDivId, X, Y ) {
	getMicroMap( SessionId, mapID, "div_micro_map", X, Y );
}
