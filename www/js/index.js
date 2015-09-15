var wlInitOptions = {
};

function wlCommonInit(){
    WL.Client.connect({
	    onSuccess: function() {
		console.log('Connected to MFP server');
	    },
	    onFailure: function() {
		console.log('Failed to connect to MFP server');
	    }
	});
}
