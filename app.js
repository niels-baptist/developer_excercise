/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
 
 
connect();

async function connect() {
    const urlQlikServer = "https://ewdg25ot2lurgg6.eu.qlikcloud.com";
    const urlLoggedIn = "/api/v1/audits";//Use GET request to see if you are authenticated
    const urlLogin = "/login";
    const webIntegrationId = 'oqmuZuCVsyZlV9FL2wcEMtA79uvVXYRO';        

    //Check to see if logged in
    return await fetch(`${urlQlikServer}${urlLoggedIn}`, {
        credentials: 'include',
        headers: {                  
            'Qlik-Web-Integration-ID':webIntegrationId
        }
    })
    .then(async function(response)
    {
        //check if user is authenticated; if not, redirect to login page
		if(response.status===401){
            const url = new URL(`${urlQlikServer}/login`);
            url.searchParams.append('returnto', 'http://localhost/bi/index.html');
            url.searchParams.append('qlik-web-integration-id', webIntegrationId);
            window.location.href = url;
        }	
    })
    .catch(function(error)
    {
        console.error(error);
    });	
}		
 
var config1 = {
    host: "ewdg25ot2lurgg6.eu.qlikcloud.com", //the address of your Qlik Engine Instance
    prefix: "/", //or the virtual proxy to be used. for example "/anonymous/"
    port: 443, //or the port to be used if different from the default port  
    isSecure: true, //should be true if connecting over HTTPS
    webIntegrationId: 'oqmuZuCVsyZlV9FL2wcEMtA79uvVXYRO' //only needed in SaaS editions and QSEoK
};

require.config( {
    baseUrl: (config1.isSecure ? "https://" : "http://" ) + config1.host + (config1.port ? ":" + config1.port : "") + config1.prefix + "resources",
    webIntegrationId: config1.webIntegrationId
} );	

require( ["js/qlik"], function ( qlik ) {
	
	qlik.on( "error", function ( error ) {
		$( '#popupText' ).append( error.message + "<br>" );
		$( '#popup' ).fadeIn( 1000 );
	} );
	$( "#closePopup" ).click( function () {
		$( '#popup' ).hide();
	} );
	
	//open apps -- inserted here --
	var app = qlik.openApp("3efcebb1-197e-43b6-8baf-f767cc21aedb", config1);
	
	//get objects -- inserted here --
	app.getObject('QV01', 'NyNEsWz');
	
	var Imgsettings = {format: 'png', height: 300, width: 800 };
	var settings = { documentSize: 'a4', aspectRatio: 2, orientation: "landscape" }
	
        app.visualization.get('NyNEsWz').then(function(vis){
		vis.exportImg(Imgsettings).then(function (result) {
		console.log('PDF download link: ', result);
		});
		});
		
	$("#ClearAll").click(function() {
	app.clearAll();
      });

} );
