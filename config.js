exports.serverPort = 3030; //Server listen port
exports.useAccessControl = false;
exports.serverString = "serverString";
exports.sessionIdentifier = "medici-session";
exports.browseDir = "C:\\Users\\ecalderara\\Downloads\\ToHome"; //Media Directory to serve
exports.staticFiles = "www"; //Static files dir
exports.users = //List of allowed users
{
	"admin": {
		"hash": "3ed8dc676aa48a46bc0b1a31c4a045c3"
	},
	"stoffer": {
		"hash": "3f17e0e8c3939da8529695838963bab6"
	}
};
exports.metadataPlugin = "metadata-mp4box"; // The metadata plugin to use
exports.mp4box = {
	"path": "" //Path to the mp4box (so we can avoid put it in the PATH enviroment variable in windows. Sorry linux =( )
};
exports.tmbdapi = {
	"key": "" //The api key to use
};